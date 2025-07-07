import { NextRequest, NextResponse } from 'next/server';
import { sendConversationEmail, ConversationEmailData } from '@/lib/email';

// Track sent emails to prevent duplicates (in-memory cache)
const sentEmails = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    console.log('Email API called');
    
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
    const { messages, userInfo, sessionId }: ConversationEmailData & { sessionId?: string } = body;

    console.log('Received messages:', messages.length, 'Session ID:', sessionId);

    // Validate required data
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and cannot be empty' },
        { status: 400 }
      );
    }

    // Check if we've already sent an email for this session
    if (sessionId && sentEmails.has(sessionId)) {
      console.log('Email already sent for session:', sessionId);
      return NextResponse.json(
        { success: true, message: 'Email already sent for this session' },
        { status: 200 }
      );
    }

    // Add timestamp if not provided
    const messagesWithTimestamps = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp || new Date().toISOString()
    }));

    // Get user info from request headers
    const clientUserInfo = {
      ip: req.headers.get('x-forwarded-for') || 'Unknown',
      userAgent: req.headers.get('user-agent') || 'Unknown',
      timestamp: new Date().toISOString()
    };

    // Send email
    const result = await sendConversationEmail({
      messages: messagesWithTimestamps,
      userInfo: clientUserInfo
    });

    if (result.success) {
      // Mark this session as sent
      if (sessionId) {
        sentEmails.add(sessionId);
        console.log('Marked session as sent:', sessionId);
      }
      
      return NextResponse.json(
        { success: true, message: 'Email sent successfully', id: result.id },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 