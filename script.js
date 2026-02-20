// Gemini APIキー
const GEMINI_API_KEY = 'AIzaSyAN7L-CpAJnaauoHrTm1XeP9XtO_gIqW3k';

// DOM要素
const wordChain     = document.getElementById('word-chain');
const wordInput     = document.getElementById('word-input');
const submitBtn     = document.getElementById('submit-btn');
const messageEl     = document.getElementById('message');
const turnIndicator = document.getElementById('turn-indicator');
const resultModal   = document.getElementById('result-modal');
const resultTitle   = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const restartBtn    = document.getElementById('restart-btn');

// ゲーム状態
let usedWords         = new Set();
let lastChar          = '';
let isPlayerTurn      = true;
let gameOver          = false;
let consecutiveErrors = 0;
const MAX_ERRORS = 3;

// --- Gemini API ---
async function askGemini(prompt) {
  const apiKey = GEMINI_API_KEY;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 30, temperature: 1.0 }
      })
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? 'パス';
}

function buildPrompt() {
  const usedList = [...usedWords].join('、') || 'なし';
  return `あなたはしりとりの相手です。
【条件】
- 「${lastChar}」で始まる日本語の単語を1つだけ答えてください。
- 「ん」で終わる単語は禁止です。
- 次に挙げた単語は既に使われているので使わないでください：[${usedList}]
【回答ルール】
- 条件を満たす単語を1つだけ、ひらがなで答えてください。説明や余計な文字は付けないでください。
- 条件を満たす単語が思いつかない場合は「パス」とだけ答えてください。`;
}

// --- しりとりロジック ---
function getLastChar(word) {
  const last = word.slice(-1);
  const smallKana = 'ゃゅょぁぃぅぇぉっ';
  if (smallKana.includes(last) && word.length >= 2) {
    return word.slice(-2, -1);
  }
  return last;
}

function isHiraganaOnly(str) {
  return /^[\u3040-\u309f\u30fc]+$/.test(str);
}

function validateWord(word) {
  if (word.length < 2) {
    return { ok: false, message: '2文字以上の言葉を入力してください' };
  }
  if (!isHiraganaOnly(word)) {
    return { ok: false, message: 'ひらがなで入力してください' };
  }
  if (lastChar && word[0] !== lastChar) {
    return { ok: false, message: `「${lastChar}」で始まる言葉を入力してください` };
  }
  if (word.endsWith('ん')) {
    return { ok: false, message: '「ん」で終わる言葉を言ってしまいました！', isLose: true };
  }
  if (usedWords.has(word)) {
    return { ok: false, message: 'その言葉はすでに使われています' };
  }
  return { ok: true };
}

function addToChain(word, isAI = false) {
  const span = document.createElement('span');
  span.className = 'word' + (isAI ? ' ai' : '');
  span.textContent = word;
  wordChain.appendChild(span);
  wordChain.scrollLeft = wordChain.scrollWidth;
}

function showMessage(text, isError = true) {
  messageEl.textContent = text;
  messageEl.className = 'message' + (isError ? '' : ' success');
}

function showResult(type, title, msg) {
  resultTitle.textContent = title;
  resultMessage.textContent = msg;
  resultModal.classList.remove('hidden');
  const content = resultModal.querySelector('.result-content');
  content.classList.remove('win', 'lose');
  content.classList.add(type);
}

async function aiTurn() {
  turnIndicator.textContent = 'AIの番です...';
  turnIndicator.classList.add('ai-turn');
  submitBtn.disabled = true;
  wordInput.disabled = true;
  showMessage('', false);

  try {
    const aiWord = await askGemini(buildPrompt());

    if (!aiWord || aiWord === 'パス') {
      gameOver = true;
      showResult('win', 'あなたの勝ち！🎉', 'AIが続けられる言葉を思いつきませんでした。お見事！');
      return;
    }

    if (aiWord.endsWith('ん')) {
      gameOver = true;
      showResult('win', 'あなたの勝ち！🎉', `AIが「${aiWord}」と言いました。「ん」で終わったのでAIの負けです！`);
      return;
    }

    usedWords.add(aiWord);
    addToChain(aiWord, true);
    lastChar = getLastChar(aiWord);

    isPlayerTurn = true;
    turnIndicator.textContent = 'あなたの番です';
    turnIndicator.classList.remove('ai-turn');
    submitBtn.disabled = false;
    wordInput.disabled = false;
    wordInput.focus();
    showMessage(`「${lastChar}」で始まる言葉を入力してください`, false);

  } catch (e) {
    showMessage(`AI接続エラー: ${e.message}`, true);
    isPlayerTurn = true;
    turnIndicator.textContent = 'あなたの番です';
    turnIndicator.classList.remove('ai-turn');
    submitBtn.disabled = false;
    wordInput.disabled = false;
  }
}

function handleSubmit() {
  if (gameOver || !isPlayerTurn) return;

  const word = wordInput.value.trim();
  const result = validateWord(word);

  if (!result.ok) {
    if (result.isLose) {
      gameOver = true;
      showMessage(result.message);
      setTimeout(() => showResult('lose', 'あなたの負け...😢', `「${word}」は「ん」で終わっています。`), 400);
      return;
    }
    consecutiveErrors++;
    const remaining = MAX_ERRORS - consecutiveErrors;
    if (remaining > 0) {
      showMessage(`${result.message}（あと${remaining}回ミスで負け）`);
    } else {
      gameOver = true;
      showMessage(result.message);
      setTimeout(() => showResult('lose', 'あなたの負け...😢', `${MAX_ERRORS}回連続でミスをしました。`), 400);
    }
    return;
  }

  consecutiveErrors = 0;
  usedWords.add(word);
  addToChain(word, false);
  lastChar = getLastChar(word);
  wordInput.value = '';
  showMessage('', false);

  isPlayerTurn = false;
  aiTurn();
}

function resetGame() {
  usedWords.clear();
  lastChar          = '';
  isPlayerTurn      = true;
  gameOver          = false;
  consecutiveErrors = 0;
  wordChain.innerHTML = '';
  wordInput.value     = '';
  turnIndicator.textContent = 'あなたの番です';
  turnIndicator.classList.remove('ai-turn');
  submitBtn.disabled  = false;
  wordInput.disabled  = false;
  resultModal.classList.add('hidden');
  wordInput.focus();
  showMessage('最初の言葉を自由に入力してください（ひらがな2文字以上）', false);
}

// イベントリスナー
submitBtn.addEventListener('click', handleSubmit);

let isComposing = false;
wordInput.addEventListener('compositionstart', () => { isComposing = true; });
wordInput.addEventListener('compositionend',   () => { isComposing = false; });
wordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !isComposing) handleSubmit();
});
restartBtn.addEventListener('click', resetGame);

// 初期化
resetGame();
