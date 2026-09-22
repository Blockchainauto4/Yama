/**
 * Safe clipboard copy utility that handles unfocused iframes,
 * permission denials, and falls back to execCommand gracefully.
 * Never throws unhandled promise rejections.
 */
export async function safeCopyText(text: string): Promise<boolean> {
  // 1. Try modern navigator.clipboard if document is focused
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Continue to fallback
  }

  // 2. Fallback to hidden textarea with execCommand
  try {
    if (typeof document !== "undefined") {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch {
    // Silently handle if clipboard is unavailable
  }

  return false;
}
