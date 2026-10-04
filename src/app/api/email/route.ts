import { NextRequest, NextResponse } from 'next/server';
import { sendConversationEmail, ConversationMessage } from '@/lib/email';

const MAX_MESSAGES = 50;
const MAX_MESSAGE_CHARS = 2000;

// Only accept requests sent by the portfolio's own pages
function isSameOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Keep only well-formed user/assistant messages and cap their size
function parseMessages(input: unknown): ConversationMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_MESSAGES) {
    return null;
  }

  const messages: ConversationMessage[] = [];
  for (const msg of input) {
    if (
      !msg ||
      (msg.role !== 'user' && msg.role !== 'assistant') ||
      typeof msg.content !== 'string'
    ) {
      return null;
    }
    messages.push({
      role: msg.role,
      content: msg.content.slice(0, MAX_MESSAGE_CHARS),
      timestamp: new Date().toISOString(),
    });
  }
  return messages;
}

export async function POST(req: NextRequest) {
  try {
    if (!isSameOrigin(req)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    if (!process.env.YOUR_EMAIL) {
      console.error('YOUR_EMAIL is not configured');
      return NextResponse.json(
        { error: 'Recipient email not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const messages = parseMessages(body?.messages);
    if (!messages) {
      return NextResponse.json(
        { error: `Messages must be a non-empty array of up to ${MAX_MESSAGES} user/assistant messages` },
        { status: 400 }
      );
    }

    // Get user info from request headers
    const clientUserInfo = {
      ip: req.headers.get('x-forwarded-for') || 'Unknown',
      userAgent: req.headers.get('user-agent') || 'Unknown',
      timestamp: new Date().toISOString()
    };

    const result = await sendConversationEmail({
      messages,
      userInfo: clientUserInfo
    });

    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    }

    console.error('Failed to send conversation email:', result.error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
