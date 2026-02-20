// しりとり用の語彙（頭文字ごと、「ん」で終わらない言葉のみ）
// ※ 重複キー禁止・「ん」終わり禁止
const WORD_LIST = {
  'あ': ['あめ', 'あひる', 'あり', 'あさ', 'あき', 'あじ', 'あか', 'あお', 'あたま'],
  'い': ['いぬ', 'いちご', 'いす', 'いと', 'いか', 'いけ', 'いわ', 'いのしし'],
  'う': ['うさぎ', 'うし', 'うみ', 'うた', 'うで', 'うき', 'うわさ'],
  'え': ['えび', 'えだ', 'えさ', 'えのぐ', 'えがお'],
  'お': ['おに', 'おかし', 'おまめ', 'おちゃ', 'おりがみ', 'おと', 'おか', 'おはし'],
  'か': ['かめ', 'かば', 'かき', 'かぜ', 'かみ', 'かえる', 'かさ', 'からす', 'かわ', 'かに'],
  'き': ['きつね', 'きいろ', 'きのこ', 'きり', 'きで', 'きて'],
  'く': ['くま', 'くつ', 'くち', 'くも', 'くだもの', 'くすり', 'くり', 'くわ'],
  'け': ['けむし', 'けしき', 'けいたい', 'けいと'],
  'こ': ['こま', 'こい', 'こめ', 'こねこ', 'ことり', 'こけ'],
  'さ': ['さくら', 'さる', 'さかな', 'さいふ', 'さとう', 'さつまいも'],
  'し': ['しか', 'しお', 'しかく', 'しろ', 'しいたけ', 'しごと'],
  'す': ['すいか', 'すずめ', 'すし', 'すな', 'すもも', 'するめ', 'すぎ'],
  'せ': ['せみ', 'せかい', 'せき', 'せとか'],
  'そ': ['そら', 'そば', 'そうじ', 'そと'],
  'た': ['たこ', 'たまご', 'たね', 'たけ', 'たぬき', 'たいよう'],
  'ち': ['ちず', 'ちから', 'ちいさい', 'ちちおや'],
  'つ': ['つき', 'つめ', 'つる', 'つくえ', 'つり', 'つばめ', 'つばき'],
  'て': ['てぶくろ', 'てがみ', 'てんき', 'てら', 'てつ'],
  'と': ['とり', 'とけい', 'とまと', 'とんぼ', 'とびら', 'とうふ'],
  'な': ['なす', 'なつ', 'なまこ', 'なべ', 'なわ'],
  'に': ['にわとり', 'にじ', 'にく', 'にど'],
  'ぬ': ['ぬま', 'ぬりえ', 'ぬの'],
  'ね': ['ねこ', 'ねつ', 'ねぎ', 'ねずみ'],
  'の': ['のり', 'のき', 'のはら'],
  'は': ['はな', 'はし', 'はこ', 'はる', 'はと', 'はくさい'],
  'ひ': ['ひつじ', 'ひまわり', 'ひこうき', 'ひかり', 'ひも'],
  'ふ': ['ふね', 'ふく', 'ふじ', 'ふるさと', 'ふた'],
  'へ': ['へび', 'へや', 'へいわ'],
  'ほ': ['ほたる', 'ほし', 'ほね', 'ほら'],
  'ま': ['まめ', 'まど', 'まき', 'まつ', 'まくら'],
  'み': ['みかん', 'みつ', 'みず', 'みみ', 'みち', 'みのむし'],
  'む': ['むかで', 'むし', 'むすめ', 'むら'],
  'め': ['めだか', 'めし', 'めいろ'],
  'も': ['もも', 'もり', 'もぐら', 'もち'],
  'や': ['やま', 'やかん', 'やぎ', 'やきとり'],
  'ゆ': ['ゆき', 'ゆめ', 'ゆかた', 'ゆびわ'],
  'よ': ['よる', 'よむ', 'よか'],
  'ら': ['らっぱ', 'らっこ', 'らいおん'],
  'り': ['りんご', 'りす', 'りく', 'りょうり'],
  'る': ['るす'],
  'れ': ['れっしゃ', 'れいぞうこ'],
  'ろ': ['ろうそく', 'ろうか'],
  'わ': ['わに', 'わかめ', 'わた', 'わさび'],
  // 濁音
  'が': ['がちょう', 'がっこう', 'がま'],
  'ぎ': ['ぎゅうにゅう'],
  'ぐ': ['ぐるぐる'],
  'げ': ['げた'],
  'ご': ['ごま', 'ごりら', 'ごむ'],
  'ざ': ['ざるそば'],
  'じ': ['じしょ', 'じてんしゃ'],
  'ず': ['ずれ', 'ずわいがに'],
  'ぜ': ['ぜに'],
  'ぞ': ['ぞう', 'ぞうり'],
  'だ': ['だいく', 'だいどころ', 'だちょう'],
  'で': ['でんわ', 'でんしゃ', 'でんき'],
  'ど': ['どらやき', 'どうぶつ', 'どんぐり'],
  'ば': ['ばなな', 'ばら', 'ばす'],
  'び': ['びわ', 'びせいぶつ'],
  'ぶ': ['ぶた', 'ぶどう', 'ぶり'],
  'べ': ['べんとう', 'べに'],
  'ぼ': ['ぼうし', 'ぼうず'],
  // 半濁音
  'ぱ': ['ぱせり', 'ぱんだ'],
  'ぴ': ['ぴあの'],
  'ぷ': ['ぷろ'],
  'ぺ': ['ぺらぺら'],
  'ぽ': ['ぽすと'],
};

// DOM要素
const wordChain  = document.getElementById('word-chain');
const wordInput  = document.getElementById('word-input');
const submitBtn  = document.getElementById('submit-btn');
const messageEl  = document.getElementById('message');
const turnIndicator = document.getElementById('turn-indicator');
const resultModal   = document.getElementById('result-modal');
const resultTitle   = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const restartBtn    = document.getElementById('restart-btn');

// ゲーム状態
let usedWords        = new Set();
let lastChar         = '';   // 空文字 = 最初のターン（自由入力）
let isPlayerTurn     = true;
let gameOver         = false;
let consecutiveErrors = 0;
const MAX_ERRORS = 3;

// 最後の文字を取得（小書きかな対応）
// 例: 「おちゃ」→ 'ゃ' は小書き → slice(-2,-1) = 'ち'
function getLastChar(word) {
  const last = word.slice(-1);
  const smallKana = 'ゃゅょぁぃぅぇぉっ';
  if (smallKana.includes(last) && word.length >= 2) {
    return word.slice(-2, -1);
  }
  return last;
}

// ひらがな（＋長音符）のみかチェック
function isHiraganaOnly(str) {
  return /^[\u3040-\u309f\u30fc]+$/.test(str);
}

// バリデーション
function validateWord(word) {
  if (word.length < 2) {
    return { ok: false, message: '2文字以上の言葉を入力してください' };
  }
  if (!isHiraganaOnly(word)) {
    return { ok: false, message: 'ひらがなで入力してください' };
  }
  // 最初のターンは頭文字チェックをスキップ
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

// 単語をチェーンに追加
function addToChain(word, isAI = false) {
  const span = document.createElement('span');
  span.className = 'word' + (isAI ? ' ai' : '');
  span.textContent = word;
  wordChain.appendChild(span);
  wordChain.scrollLeft = wordChain.scrollWidth;
}

// メッセージ表示
function showMessage(text, isError = true) {
  messageEl.textContent = text;
  messageEl.className = 'message' + (isError ? '' : ' success');
}

// AIの手を考える
function getAIWord() {
  const candidates = (WORD_LIST[lastChar] || []).filter(w =>
    !usedWords.has(w) && !w.endsWith('ん') && w.length >= 2
  );
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// AIのターン
function aiTurn() {
  turnIndicator.textContent = 'AIの番です...';
  turnIndicator.classList.add('ai-turn');
  submitBtn.disabled = true;
  wordInput.disabled = true;
  showMessage('', false);

  setTimeout(() => {
    const aiWord = getAIWord();

    if (!aiWord) {
      gameOver = true;
      showResult('win', 'あなたの勝ち！🎉', 'AIが続けられる言葉を持っていません。お見事！');
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
  }, 900);
}

// 結果モーダル表示
function showResult(type, title, msg) {
  resultTitle.textContent = title;
  resultMessage.textContent = msg;
  resultModal.classList.remove('hidden');
  const content = resultModal.querySelector('.result-content');
  content.classList.remove('win', 'lose');
  content.classList.add(type);
}

// 送信処理
function handleSubmit() {
  if (gameOver || !isPlayerTurn) return;

  const word = wordInput.value.trim();
  const result = validateWord(word);

  if (!result.ok) {
    // 「ん」終わりは即負け
    if (result.isLose) {
      gameOver = true;
      showMessage(result.message);
      setTimeout(() => showResult('lose', 'あなたの負け...😢', `「${word}」は「ん」で終わっています。`), 400);
      return;
    }
    // その他のミスは3回までやり直し可
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

  // 有効な入力
  consecutiveErrors = 0;
  usedWords.add(word);
  addToChain(word, false);
  lastChar = getLastChar(word);
  wordInput.value = '';
  showMessage('', false);

  isPlayerTurn = false;
  aiTurn();
}

// ゲームリセット
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

// IME変換中（フリック入力など）はEnterで送信しない
let isComposing = false;
wordInput.addEventListener('compositionstart', () => { isComposing = true; });
wordInput.addEventListener('compositionend',   () => { isComposing = false; });
wordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !isComposing) handleSubmit();
});
restartBtn.addEventListener('click', resetGame);

// 初期化
resetGame();
