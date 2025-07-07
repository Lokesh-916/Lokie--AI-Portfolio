import { ConversationMessage } from './email';

// Track if email has been sent for this session
let emailSent = false;
let emailSending = false; // Prevent concurrent sends
let sessionId = Date.now().toString(); // Unique session identifier

// Function to check if conversation should trigger email
export function shouldSendEmail(messages: ConversationMessage[]): boolean {
  // Only send if we haven't sent one yet, not currently sending, and there are messages
  return !emailSent && !emailSending && messages.length > 0;
}

// Function to send conversation email
export async function sendConversationEmailIfNeeded(messages: ConversationMessage[]): Promise<void> {
  try {
    if (!shouldSendEmail(messages)) {
      console.log('Email already sent or currently sending, skipping...');
      return;
    }

    // Mark as sending to prevent concurrent requests
    emailSending = true;
    console.log('Attempting to send email with', messages.length, 'messages');

    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        messages,
        sessionId // Include session ID to prevent duplicates
      }),
    });

    console.log('Email API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send conversation email. Status:', response.status, 'Error:', errorText);
      emailSending = false; // Reset on error so it can retry
    } else {
      const result = await response.json();
      console.log('Conversation email sent successfully:', result);
      emailSent = true; // Mark as sent to prevent duplicates
      emailSending = false; // Reset sending flag
    }
  } catch (error) {
    console.error('Error sending conversation email:', error);
    emailSending = false; // Reset on error
  }
}

// Function to reset email sent flag (for new sessions)
export function resetEmailSentFlag(): void {
  emailSent = false;
  emailSending = false;
  sessionId = Date.now().toString(); // Generate new session ID
} 