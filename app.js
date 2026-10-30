// OFFICIAL BMT HUB — Reply Deck
// Change ACCESS_CODE below before publishing. This front-end code gate is a convenience lock,
// NOT secure authentication: anyone who can inspect the public source can find the code.
const ACCESS_CODE = "BMT2026";
const $ = (id) => document.getElementById(id);

const splash = $("splash");
const loginScreen = $("loginScreen");
const appScreen = $("appScreen");
const loginForm = $("loginForm");
const accessCode = $("accessCode");
const loginError = $("loginError");
const toggleCode = $("toggleCode");
const commentInput = $("comment");
const styleInput = $("style");
const toneInput = $("tone");
const resultPanel = $("resultPanel");
const resultText = $("result");
const statusLine = $("status");

let lastReplies = [];
let lastReplyIndex = -1;
let lastCategory = "general";

window.addEventListener("load", () => {
  setTimeout(() => {
    splash.classList.add("hidden");
    loginScreen.classList.remove("hidden");
  }, 1450);
});

toggleCode.addEventListener("click", () => {
  const showing = accessCode.type === "text";
  accessCode.type = showing ? "password" : "text";
  toggleCode.textContent = showing ? "SHOW" : "HIDE";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (accessCode.value.trim() === ACCESS_CODE) {
    loginError.classList.add("hidden");
    loginScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");
    accessCode.value = "";
    statusLine.textContent = "";
  } else {
    loginError.classList.remove("hidden");
    accessCode.focus();
  }
});

$("lockBtn").addEventListener("click", () => {
  appScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  accessCode.value = "";
  loginError.classList.add("hidden");
});

function detectCategory(text) {
  const t = text.toLowerCase();
  if (/[😂🤣😭😅😆😁😹]/u.test(text) || /\b(lol|lmao|haha|hahaha|😂|🤣)\b/i.test(t)) return "joke";
  if (/\b(what|how|why|when|where|who|which|can you|could you|is it|are you|do you|does it)\b/i.test(t) || /\?/.test(t)) return "question";
  if (/\b(thank you|thanks|appreciate|helpful|great advice|well said|nice one)\b/i.test(t)) return "thanks";
  if (/\b(beautiful|handsome|amazing|awesome|love this|great post|nice|cool|perfect|excellent)\b/i.test(t)) return "compliment";
  if (/\b(disagree|wrong|fake|lie|lying|not true|nonsense|scam|cap)\b/i.test(t)) return "disagreement";
  if (/\b(sad|sorry|pain|difficult|struggle|hard time|lost|hurt|praying|pray)\b/i.test(t)) return "sensitive";
  if (/\b(follow|dm me|message me|contact|connect|friend|hello|hi|hey)\b/i.test(t)) return "connection";
  return "general";
}

const bank = {
  question: {
    app: ["Good question. The best answer depends on the details — what part would you like me to explain first?", "I’m glad you asked. There’s a little more to it than one quick answer. Which part are you curious about?", "Fair question! Let’s make it clearer: what specific part do you want to know more about?"],
    friendship: ["That’s a good question 😄 I like hearing how other people see things too. What’s your take on it?", "Good one! Always nice meeting people who are curious. Have you come across this before?", "I was wondering if someone would ask that 😂 What made you curious about it?"],
    soft: ["That’s a fair question. I’d rather give you a thoughtful answer than rush it — which detail matters most to you?", "I understand why you’d ask. There are a few sides to it; what would you like me to clarify?", "Good point to ask about. I’m happy to talk it through if you tell me which part feels unclear."],
    invite: ["Good question! What’s your own experience with it so far?", "I can share more. What part caught your attention most?", "Let’s talk about it — what would you like to understand first?"]
  },
  joke: {
    app: ["😂 You caught that! I’ll take the joke, but there’s a little truth in it too.", "Not you making me laugh in the comments 😭😂 Fair enough!", "😂 I knew somebody would come with this one. What made you think of that?"],
    friendship: ["Omo 😂 you seem like you’d be fun to talk to. Is this your normal level of mischief?", "😂😂 I like your energy already. You always come with replies like this?", "You just made this comment section better 😂 What else you got?"],
    soft: ["😂 I see the humour in it. You definitely added a little fun to the conversation.", "Haha, fair enough 😄 I can’t even argue with that one.", "😂 That made me smile, I won’t lie. You have a point there."],
    invite: ["😂 Okay, you got me! What’s the funniest version of this you’ve seen?", "I’m laughing 😭😂 Your turn — add the next line!", "😂 This deserves a part two. What would you say next?"]
  },
  thanks: {
    app: ["You’re very welcome! Glad it was useful.", "Anytime — happy it helped.", "You’re welcome. Appreciate you taking a moment to say that."],
    friendship: ["You’re welcome 😊 Always good connecting with kind people. How’s your day going?", "Anytime! Appreciate your good energy. What kind of posts do you enjoy seeing here?", "Glad I could help 🤝 Nice connecting with you. What else are you interested in?"],
    soft: ["You’re very welcome. I’m genuinely glad it helped in some way.", "It’s no trouble at all. Thanks for the kind words too.", "You’re welcome — wishing you more good things ahead."],
    invite: ["You’re welcome! What would you like to see discussed next?", "Glad it helped. Is there another part you’d like me to cover?", "Anytime 😊 Feel free to share what you’d like to talk about next."]
  },
  compliment: {
    app: ["Thank you! I appreciate you taking the time to say that.", "That’s kind of you — glad it caught your attention.", "Appreciate it! Thanks for adding some positivity here."],
    friendship: ["That’s kind of you 😊 You seem cool too. What kind of things are you into?", "Thank you! Good energy deserves good energy back. How’s your week going?", "I appreciate that 😄 Nice to meet someone spreading positive vibes. What brings you here?"],
    soft: ["Thank you, that’s genuinely thoughtful of you.", "I appreciate your kind words. Hope your day is going well too.", "That means a lot — thanks for being so encouraging."],
    invite: ["Thank you! What was the part that stood out to you most?", "Appreciate that 🙌 What kind of content would you like to see more of?", "Thanks for the love! What caught your eye first?"]
  },
  disagreement: {
    app: ["I hear you. I’m open to another perspective — what part do you see differently?", "Fair enough; we may be looking at it from different angles. What’s your reasoning?", "I respect that you see it differently. Which point would you challenge first?"],
    friendship: ["That’s fair — we don’t have to see everything the same way 😄 What’s your perspective?", "I hear you. A good conversation can handle different opinions. What led you to that view?", "No worries, different viewpoints make discussions interesting. How do you see it?"],
    soft: ["I understand your concern. I’m not here to argue; I’m happy to understand your point of view.", "Thanks for being honest. We might disagree, but I’m open to hearing your reasoning.", "I hear where you’re coming from. Could you explain a little more about what concerns you?"],
    invite: ["Let’s unpack it respectfully — what information shaped your opinion?", "I’m open to learning something I may have missed. What would you add?", "We can disagree and still have a good conversation. What’s your main point?"]
  },
  sensitive: {
    app: ["I’m sorry you’re dealing with that. I hope things get a little easier for you.", "That sounds difficult. Thank you for sharing something so personal.", "I hear you. Sending you strength as you work through it."],
    friendship: ["I’m sorry you’re going through that ❤️ I hope you have someone supportive around you.", "That can’t be easy. Thanks for trusting the conversation enough to share.", "Sending you kindness. How are you holding up today, if you feel comfortable sharing?"],
    soft: ["I’m sorry this has been heavy for you. Please be gentle with yourself.", "Thank you for sharing that. I hope you find support and some peace through it.", "That sounds like a lot to carry. I’m wishing you strength and better days."],
    invite: ["I’m sorry you’re facing that. If you feel comfortable, what kind of support would help right now?", "Sending care your way ❤️ Would you like to talk more about it?", "I hear you. You don’t have to share more than you want to, but I’m here to listen."]
  },
  connection: {
    app: ["Thanks for reaching out! What would you like to connect about?", "I appreciate the message. What topic brought you into the conversation?", "Good to hear from you. What would you like to know more about?"],
    friendship: ["Hey, nice to connect with you 😊 How’s your day going?", "Hi there! You seem friendly — what do you usually enjoy talking about?", "Hey! Always nice meeting new people. What part of the post caught your attention?"],
    soft: ["Thanks for reaching out. I hope your day has been treating you kindly.", "Nice hearing from you. What would you like to chat about?", "I appreciate you saying hello. Hope all is well on your side."],
    invite: ["Let’s connect 😊 What’s one thing you’re interested in these days?", "I’m open to a good conversation. What topic should we start with?", "Glad you reached out. What would you like to discuss first?"]
  },
  general: {
    app: ["That’s an interesting point. What made you look at it that way?", "I can see what you mean. Is there a specific part you’d like to explore?", "Thanks for sharing your thoughts. What would you add to the discussion?"],
    friendship: ["I like hearing different perspectives 😊 What do you usually think about this topic?", "That’s an interesting take. You seem easy to talk to — how’s your day going?", "Good point! Always nice to meet people who join the conversation. What’s your view?"],
    soft: ["Thanks for sharing your thoughts. I appreciate the perspective.", "I see where you’re coming from. There may be more than one way to look at it.", "That’s worth thinking about. Thanks for adding your voice to the discussion."],
    invite: ["I’d like to hear more about your perspective — what made you say that?", "What’s your experience been like with this?", "Let’s keep the conversation going. What would you add?"]
  }
};



// Reply quality rules: match the commenter's emotion, add a relevant observation,
// invite a natural response, avoid robotic praise/automatic thanks, and speak as
// an engaged observer—not the original poster or the person in the story.
const proReplyBank = {
  question: {
    app: ["That’s worth asking, because the details can change the answer. Which part are you most curious about?", "There may be more than one side to this. What detail do you think matters most?", "Good question to raise in this discussion. What made you wonder about it?"],
    friendship: ["I was curious about that too 😄 Have you seen a situation like this before?", "That question opens up an interesting angle. What’s your own take on it?", "Now I’m curious what got you thinking about this—something you’ve experienced?"],
    soft: ["That’s a fair thing to ask. It might depend on the circumstances—what part feels unclear to you?", "There’s a bit of nuance here, so I can see why you’d ask. What would you want to understand first?", "That question makes sense. What detail do you think deserves a closer look?"],
    invite: ["Interesting question. What answer would make the most sense to you?", "That’s something people may see differently. How would you approach it?", "Let’s look at it from another angle—what do you think is behind it?"]
  },
  joke: {
    app: ["😂 That’s one way to put it. There’s a little truth hiding in the joke too—do you think so?", "The comments took a funny turn with that one 😂 What made you think of it?", "😂 That joke says a lot in just a few words. Is there a serious point behind it too?"],
    friendship: ["😂 You’ve added some life to this comment section. Is this how you normally see things?", "That caught me off guard 😂 What would the next line be?", "😭😂 The way you put that! Have you got another take on it?"],
    soft: ["😂 I can see the humour in that. Sometimes jokes point at something real, don’t they?", "That gave the conversation a lighter turn 😄 What inspired that one?", "Fair enough 😂 I wonder how many people quietly agree with you."],
    invite: ["😂 Okay, now the real question is: what happens next?", "That could start a whole thread 😂 How would you finish the story?", "😂 I’m curious—are you joking, or is there a little truth in that?" ]
  },
  thanks: {
    app: ["Glad the discussion has been useful. Which point stood out to you most?", "That’s good to hear. Was there a particular part that helped?", "Nice when a conversation gives people something useful to take away. What else would you add?"],
    friendship: ["Love when a comment section actually helps someone 😊 What part connected with you?", "That’s good to hear. Have you come across a similar discussion before?", "Glad it landed with you 🤝 What topic would you like to see people discuss more?"],
    soft: ["It’s good that you found something helpful in it. I hope the useful part stays with you.", "That’s encouraging to hear. Was there one idea that resonated more than the others?", "Glad something here was useful. What would you say is the main takeaway?"],
    invite: ["Which part do you think more people should pay attention to?", "What would you add for someone reading this conversation later?", "What related question do you think deserves its own discussion?"]
  },
  compliment: {
    app: ["That part clearly stood out to you. What specifically caught your attention?", "Interesting that you picked up on that detail. What do you like most about it?", "That’s a positive take. Was it the idea, the delivery, or something else that stood out?"],
    friendship: ["You noticed that too 😄 What kind of content usually catches your eye?", "That’s a good detail to pick out. What made it stand out for you?", "I like hearing what people notice first—what was the best part for you?"],
    soft: ["That’s a thoughtful observation. What detail made the strongest impression on you?", "I can see why that stood out. Was there another part you found meaningful?", "That’s a kind perspective to share. What do you think made it work so well?"],
    invite: ["What do you think made that part work so well?", "If you could build on that idea, what would you add?", "What would you like to see explored further from here?"]
  },
  disagreement: {
    app: ["That’s a different perspective, and it’s worth hearing the reasoning behind it. Which part do you disagree with most?", "People can read the same situation differently. What detail leads you to that conclusion?", "I can see this is a point people may debate. What evidence or experience shapes your view?"],
    friendship: ["Fair enough—we don’t have to see it the same way 😄 What made you land on that view?", "That’s a strong take. I’m curious what experience shaped it?", "Different viewpoints can make a good discussion. What do you think others are missing?"],
    soft: ["I hear the concern in your comment. What part do you think needs a closer look?", "It’s okay to see it differently. If you’re comfortable sharing, what led you to that conclusion?", "There may be context people are missing. What would you want others to understand?"],
    invite: ["Let’s keep it respectful—what’s the main point you think people should reconsider?", "What information would help someone understand your side of this?", "What’s one detail that might change how people see this situation?"]
  },
  sensitive: {
    app: ["That sounds like a lot to carry. I hope you have support around you—what do you think would help most right now?", "There’s a lot of feeling behind that comment. I hope things get gentler for you. Only share more if you feel comfortable.", "That sounds difficult, and it deserves a little care rather than quick advice. What kind of support would feel useful?"],
    friendship: ["I’m sorry this sounds so heavy ❤️ I hope you’re not having to handle it all alone. How are you holding up?", "That can be a lot for one person. If you feel okay sharing, what’s been helping you get through it?", "Sending you kindness ❤️ No pressure to explain more, but I hope you have someone in your corner."],
    soft: ["That sounds genuinely difficult. Please take it at your own pace, and reach out to someone you trust if you need support.", "I can understand why that would feel heavy. I hope you get some breathing room and support around you.", "Thank you for trusting the conversation with that. You don’t have to share more than feels right."],
    invite: ["If you feel comfortable answering, what kind of support would make a difference right now?", "I hope things ease up for you. Is there anything you wish people understood better about this?", "No pressure to share details, but what would you want someone in a similar situation to hear?"]
  },
  connection: {
    app: ["Good to see people joining the conversation. What topic brought you here?", "A conversation is better when more perspectives join in. What are you most interested in discussing?", "Nice to see you in the comments. What part of the discussion caught your attention?"],
    friendship: ["Hey 😊 what kind of conversations do you enjoy getting into?", "Nice to meet another person joining the discussion. How’s your day going so far?", "Hey there! What’s a topic you can talk about for hours?"],
    soft: ["Good to connect here. I hope your day is going well—what would you like to talk about?", "Welcome to the conversation. What part would you like to explore more?", "Nice seeing another perspective here. What topics are you interested in lately?"],
    invite: ["Let’s start with something interesting—what topic has your attention lately?", "What kind of discussion do you wish more people had openly?", "What brought you into this conversation, and what’s your take on it?"]
  },
  general: {
    app: ["That’s an interesting observation. What detail led you to see it that way?", "There’s another angle worth considering here. What would you add to the discussion?", "That gives people something to think about. Which part matters most to you?"],
    
    friendship: ["I’m curious how you arrived at that take 😄 Have you seen something similar happen before?", "That’s an interesting way to look at it. What do you think people usually overlook?", "You’ve opened up another angle here. What do you think people usually overlook?"],

    soft: ["That’s worth thinking about. What part of the situation feels most important to you?", "I can see there’s more than one way to read this. What context do you think matters?", "That’s a thoughtful point. Is there something you wish more people understood about it?"],
    invite: ["What’s one detail you think people might be overlooking?", "If you could add one thing to this conversation, what would it be?", "What do you think happens next, based on what we know so far?"]
  }
};

function applyTone(text, tone) {
  if (tone === "professional") return text.replace(/😂|😭/g, "").replace(/😊|🙌|❤️|🤝/g, "").trim();
  if (tone === "playful" && !/[😂😄😭]/u.test(text)) return text + " 😄";
  if (tone === "warm" && !/[❤️😊]/u.test(text)) return text + " 😊";
  return text;
}

function chooseReplies() {
  const original = commentInput.value.trim();
  if (!original) {
    statusLine.textContent = "Paste a comment first, then I’ll build your reply.";
    commentInput.focus();
    return;
  }
  lastCategory = detectCategory(original);
  lastReplies = proReplyBank[lastCategory][styleInput.value] || proReplyBank.general[styleInput.value];
  lastReplyIndex = (lastReplyIndex + 1) % lastReplies.length;
  resultText.textContent = applyTone(lastReplies[lastReplyIndex], toneInput.value);
  resultPanel.classList.remove("hidden");
  statusLine.textContent = `Reply prepared · ${lastCategory.replace("-", " ")} · Natural observer tone · Edit before posting.`;
}

$("generate").addEventListener("click", () => {
  lastReplyIndex = -1;
  chooseReplies();
});
$("regenerate").addEventListener("click", chooseReplies);
$("copy").addEventListener("click", async () => {
  if (!resultText.textContent) return;
  try {
    await navigator.clipboard.writeText(resultText.textContent);
    statusLine.textContent = "Copied — ready to paste.";
  } catch {
    const range = document.createRange();
    range.selectNodeContents(resultText);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    statusLine.textContent = "Select the highlighted text and copy it.";
  }
});
