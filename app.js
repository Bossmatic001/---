const $ = (id) => document.getElementById(id);
const templates = {
  app: [
    (name, comment) => `Thanks for sharing that${name ? `, ${name}` : ''}. ${comment ? "I appreciate your perspective—what made you think of it?" : "I'd love to hear a little more about your perspective."}`,
    (name) => `That's an interesting point${name ? `, ${name}` : ''}. What has your experience with it been like?`,
    (name) => `I hear you${name ? `, ${name}` : ''}. Thanks for adding your thoughts to the conversation.`
  ],
  friendship: [
    (name) => `Good people are worth keeping around${name ? `, ${name}` : ''}. Always nice connecting with someone who shares their thoughts.`,
    (name) => `Life is better with good friends${name ? `, ${name}` : ''}. Hope we get to know each other a little better.`,
    (name) => `I appreciate your comment${name ? `, ${name}` : ''}. Genuine conversations can be the start of a good friendship.`
  ],
  soft: [
    (name) => `That makes sense${name ? `, ${name}` : ''}. Well, who knows—we could be friends someday.`,
    (name) => `Thanks for sharing that. I'd be happy to keep the conversation going whenever it feels right.`,
    (name) => `I enjoyed hearing your thoughts${name ? `, ${name}` : ''}. Maybe we'll cross paths in another conversation.`
  ],
  invite: [
    (name) => `I enjoyed this little chat${name ? `, ${name}` : ''}. Whenever you're free, feel welcome to message me sometime.`,
    (name) => `Thanks for the conversation. If you'd like to chat more another time, feel free to reach out.`,
    (name) => `Always glad to meet thoughtful people${name ? `, ${name}` : ''}. Message me whenever it's convenient for you.`
  ]
};
let lastIndex = -1;

function generate() {
  const name = $('person').value.trim().replace(/[<>]/g, '');
  const comment = $('comment').value.trim();
  const style = $('style').value;
  if (!comment) {
    $('status').textContent = 'Paste a comment first.';
    $('comment').focus();
    return;
  }
  const options = templates[style];
  let index = Math.floor(Math.random() * options.length);
  if (options.length > 1 && index === lastIndex) index = (index + 1) % options.length;
  lastIndex = index;
  $('result').value = options[index](name, comment);
  $('status').textContent = 'Ready to use';
}
$('generate').addEventListener('click', generate);
$('regenerate').addEventListener('click', generate);
$('copy').addEventListener('click', async () => {
  const text = $('result').value;
  if (!text) { $('status').textContent = 'Generate a reply first.'; return; }
  try {
    await navigator.clipboard.writeText(text);
    $('status').textContent = 'Copied!';
  } catch {
    $('result').focus();
    $('result').select();
    $('status').textContent = 'Select the text and choose Copy.';
  }
});
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
