# Email Setup Guide for Chat Conversations

This guide will help you set up automatic email notifications when someone chats with your AI portfolio.

## Prerequisites

1. A Resend account (free tier available)
2. Your email address where you want to receive conversation emails

## Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. In your Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Give it a name like "Portfolio Chat"
4. Copy the API key (starts with `re_`)

## Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root and add:

```env
# Your existing Groq API key
GROQ_API_KEY=your_groq_api_key_here

# Resend API Key (new)
RESEND_API_KEY=re_your_resend_api_key_here

# Your email address (where you want to receive conversations)
YOUR_EMAIL=your-email@gmail.com
```

## Step 4: Configure Sending Domain (Optional but Recommended)

### Option A: Use Resend's Test Domain (Quick Setup)
1. In Resend dashboard, go to "Domains"
2. Use the default test domain (e.g., `onboarding@resend.dev`)
3. Update the email service file:

```typescript
// In src/lib/email.ts, change line 25:
from: 'onboarding@resend.dev', // Use Resend's test domain
```

### Option B: Use Your Own Domain (Professional Setup)
1. In Resend dashboard, click "Add Domain"
2. Follow the DNS setup instructions
3. Update the email service file:

```typescript
// In src/lib/email.ts, change line 25:
from: 'noreply@yourdomain.com', // Use your verified domain
```

## Step 5: Test the Setup

1. Start your development server: `pnpm dev`
2. Go to your portfolio and start a chat
3. Have a conversation (any number of messages)
4. **Leave the chat page** (close tab, switch tabs, or navigate away)
5. Check your email for the conversation summary

## How It Works

The email system will automatically send you an email when the user leaves the chat page:

1. **Page Leave**: When user closes the browser tab/window
2. **Tab Switch**: When user switches to another tab or minimizes browser
3. **Navigation**: When user navigates away from the chat page
4. **Session End**: When the chat component unmounts

**Note**: Email is only sent once per session, even if the user leaves multiple times.

## Email Content

Each email includes:
- Complete conversation history
- Timestamps for each message
- User's IP address (for tracking)
- User agent (browser/device info)
- Professional HTML formatting

## Customization

### Change Email Triggers
Edit `src/lib/chat-utils.ts` to modify when emails are sent:

```typescript
export function shouldSendEmail(messages: ConversationMessage[]): boolean {
  // Only send if we haven't sent one yet and there are messages
  return !emailSent && messages.length > 0;
  
  // Alternative: Only send if conversation has minimum messages
  // return !emailSent && messages.length >= 2; // Minimum 2 messages
}
```

### Customize Email Template
Edit `src/lib/email.ts` to change the email appearance and content.

### Disable Email Feature
To disable email sending, comment out the email call in `src/components/chat/chat.tsx`:

```typescript
// Comment out this line:
// sendConversationEmailIfNeeded(updatedMessages);
```

## Troubleshooting

### Email Not Sending
1. Check your `.env.local` file has the correct API key
2. Verify your Resend account is active
3. Check browser console for errors
4. Ensure your domain is verified in Resend

### Email Going to Spam
1. Use a verified domain instead of test domain
2. Set up proper SPF/DKIM records
3. Add your sending email to your contacts

### API Key Issues
1. Make sure the API key starts with `re_`
2. Check if the key has proper permissions
3. Verify the key is not expired

## Privacy Considerations

- IP addresses are collected for basic tracking
- User agents are logged for debugging
- Consider adding a privacy notice about data collection
- You can remove IP/user agent collection by editing the email API

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Test with Resend's dashboard to ensure emails are being sent
4. Check your spam folder for test emails 