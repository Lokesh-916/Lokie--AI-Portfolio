// Sent mid-stream by /api/chat when a reply has to be withdrawn (e.g. it started a code block).
// Everything after this marker replaces what the client has rendered so far.
export const REPLACE_MARKER = '\u0000';
