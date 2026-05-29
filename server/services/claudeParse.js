// Parses JSON from Claude responses with safe error handling.
export function parseClaudeJson(text) {
  try {
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
    return { data: JSON.parse(cleaned), error: null };
  } catch {
    return { data: null, error: 'AI returned an invalid response. Please try again.' };
  }
}
