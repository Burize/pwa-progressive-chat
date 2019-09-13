export default function scrollToBottom(elementId: string) {
  const el = document.getElementById(elementId);
  if (!el) {
    return;
  }
  el.scrollTop = el.scrollHeight;
}
