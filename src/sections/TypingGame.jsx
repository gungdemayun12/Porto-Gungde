/**
 * Arcade — three mini-game cards, popup modals, fully dual-mode safe.
 * Games: Typing Speed Test, Memory Match, and Block Escape.
 * Font Awesome icons, high contrast text in light and dark mode.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionTitle from '../components/ui/SectionTitle';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';

const WORD_BANK = {
  en: {
    words: [
      'the quiet morning brings a new journey across the island discover hidden places and enjoy every moment',
      'meet local people taste traditional food and find a new favorite place along the coast',
      'a little curiosity can turn an ordinary day into a wonderful story worth remembering',
      'follow the ocean breeze through green hills and discover a peaceful corner of Bali',
      'every journey starts with one small step and a willingness to explore something new',
      'sunlight dances across the water while boats return slowly to the village shore',
      'take your time notice the details and let each new experience surprise you',
      'friends shared stories beneath the trees as the evening sky turned soft orange',
    ],
    code: [
      'const trip = await explore("Bali"); function plan(days) { return days.map((day) => discover(day)); }',
      'const places = await getPlaces("Ubud"); const favorites = places.filter((place) => place.rating > 4);',
      'function greet(name) { return `Welcome to Bali, ${name}!`; } const message = greet("traveler");',
      'const itinerary = days.map((day) => ({ date: day.date, activity: chooseExperience(day) }));',
      'async function loadTours() { const response = await fetch("/api/tours"); return response.json(); }',
    ],
    shell: [
      'cd bali-trip && npm run explore && git status --short && echo "ready for the next adventure"',
      'npm install && npm run dev && git status --short && echo "local site is ready"',
      'git checkout -b feature/tour-cards && npm run build && git status --short',
      'mkdir island-guide && cd island-guide && npm create vite@latest . && npm run dev',
      'npm run lint && npm run test && git add src && git commit -m "improve tour guide"',
    ],
  },
  id: {
    words: [
      'pagi yang tenang membawa perjalanan baru menyusuri pulau dan menemukan tempat indah',
      'bertemu warga lokal mencicipi makanan tradisional dan menikmati setiap momen bersama',
      'rasa ingin tahu membuat hari biasa berubah menjadi cerita baru yang menyenangkan',
      'ikuti semilir angin melewati bukit hijau dan temukan sudut Bali yang damai',
      'setiap perjalanan dimulai dari satu langkah kecil dan keberanian untuk mencoba',
      'cahaya matahari berkilau di laut sementara perahu kembali ke tepi desa',
      'nikmati perjalanan perlahan perhatikan hal kecil dan biarkan pengalaman memberi kejutan',
      'teman berbagi cerita di bawah pepohonan saat langit senja berubah jingga',
    ],
    code: [
      'const perjalanan = await jelajahi("Bali"); function rencana(hari) { return hari.map((tujuan) => temukan(tujuan)); }',
      'const tempat = await cariTempat("Ubud"); const favorit = tempat.filter((lokasi) => lokasi.nilai > 4);',
      'function sapa(nama) { return `Selamat datang di Bali, ${nama}!`; } const pesan = sapa("wisatawan");',
      'const jadwal = hari.map((tanggal) => ({ tanggal: tanggal.tanggal, kegiatan: pilihAktivitas(tanggal) }));',
      'async function ambilTur() { const respons = await fetch("/api/tur"); return respons.json(); }',
    ],
    shell: [
      'cd wisata-bali && npm run jelajah && git status --short && echo "siap untuk petualangan berikutnya"',
      'npm install && npm run dev && git status --short && echo "website lokal siap"',
      'git checkout -b fitur-kartu-tur && npm run build && git status --short',
      'mkdir panduan-pulau && cd panduan-pulau && npm create vite@latest . && npm run dev',
      'npm run lint && npm run test && git add src && git commit -m "perbarui panduan wisata"',
    ],
  },
};

const TYPING_MODES = ['words', 'code', 'shell'];
const TYPING_DURATIONS = [15, 30, 60];
const MEMORY_LEVELS = [
  { id: 'easy', pairs: 4, columns: 4 },
  { id: 'normal', pairs: 6, columns: 4 },
  { id: 'hard', pairs: 8, columns: 4 },
];
const EMOJIS = ['⚛️', '🎨', '🚀', '💻', '🌐', '⚡', '🎵', '🔭'];
const BLOCK_LEVELS = {
  easy: [
    { id: 'target', x: 0, y: 2, length: 2, direction: 'h' },
    { id: 'a', x: 2, y: 1, length: 2, direction: 'v' },
    { id: 'b', x: 3, y: 2, length: 2, direction: 'v' },
    { id: 'c', x: 5, y: 2, length: 2, direction: 'v' },
  ],
  normal: [
    { id: 'target', x: 0, y: 2, length: 2, direction: 'h' },
    { id: 'a', x: 2, y: 1, length: 2, direction: 'v' },
    { id: 'b', x: 3, y: 2, length: 2, direction: 'v' },
    { id: 'c', x: 5, y: 2, length: 2, direction: 'v' },
    { id: 'd', x: 2, y: 0, length: 2, direction: 'h' },
    { id: 'e', x: 3, y: 4, length: 2, direction: 'h' },
  ],
  hard: [
    { id: 'target', x: 0, y: 2, length: 2, direction: 'h' },
    { id: 'a', x: 2, y: 1, length: 2, direction: 'v' },
    { id: 'b', x: 3, y: 2, length: 2, direction: 'v' },
    { id: 'c', x: 4, y: 2, length: 2, direction: 'v' },
    { id: 'd', x: 2, y: 0, length: 3, direction: 'h' },
    { id: 'e', x: 5, y: 0, length: 2, direction: 'v' },
    { id: 'f', x: 0, y: 0, length: 2, direction: 'h' },
    { id: 'g', x: 0, y: 4, length: 2, direction: 'v' },
    { id: 'h', x: 2, y: 5, length: 3, direction: 'h' },
    { id: 'i', x: 3, y: 4, length: 2, direction: 'h' },
    { id: 'j', x: 5, y: 2, length: 2, direction: 'v' },
  ],
};

const BLOCK_SCRAMBLE_STEPS = {
  easy: [8, 14],
  normal: [18, 28],
  hard: [28, 42],
};

const BLOCK_MIN_SOLUTION_STEPS = {
  easy: 5,
  normal: 9,
  hard: 16,
};

function currentTime() {
  return Date.now();
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getBlockMoveResult(board, pieceId, direction) {
  const piece = board.find((item) => item.id === pieceId);
  const allowedDirections = piece?.direction === 'h' ? ['left', 'right'] : ['up', 'down'];
  if (!piece || !allowedDirections.includes(direction)) return false;

  if (pieceId === 'target' && direction === 'right' && piece.x + piece.length === 6) {
    return 'exit';
  }

  const delta = direction === 'right' || direction === 'down' ? 1 : -1;
  const nextX = piece.x + (piece.direction === 'h' ? delta : 0);
  const nextY = piece.y + (piece.direction === 'v' ? delta : 0);
  if (
    nextX < 0 ||
    nextY < 0 ||
    nextX + (piece.direction === 'h' ? piece.length : 1) > 6 ||
    nextY + (piece.direction === 'v' ? piece.length : 1) > 6
  ) {
    return false;
  }

  const nextCell = piece.direction === 'h'
    ? { x: direction === 'right' ? nextX + piece.length - 1 : nextX, y: piece.y }
    : { x: piece.x, y: direction === 'down' ? nextY + piece.length - 1 : nextY };

  return !board.some((other) => {
    if (other.id === pieceId) return false;
    return Array.from({ length: other.length }, (_, index) => ({
      x: other.x + (other.direction === 'h' ? index : 0),
      y: other.y + (other.direction === 'v' ? index : 0),
    })).some((cell) => cell.x === nextCell.x && cell.y === nextCell.y);
  });
}

function moveBlockOneCell(board, pieceId, direction) {
  const delta = direction === 'right' || direction === 'down' ? 1 : -1;
  return board.map((piece) => piece.id !== pieceId
    ? piece
    : {
        ...piece,
        x: piece.x + (piece.direction === 'h' ? delta : 0),
        y: piece.y + (piece.direction === 'v' ? delta : 0),
      });
}

function blockBoardKey(board) {
  return board
    .map(({ id, x, y }) => `${id}:${x},${y}`)
    .join('|');
}

function hasEscapeWithinMoves(startBoard, maxMoves) {
  const queue = [{ board: startBoard, moves: 0 }];
  const visited = new Set([blockBoardKey(startBoard)]);

  for (let index = 0; index < queue.length; index += 1) {
    const { board, moves } = queue[index];
    if (moves >= maxMoves) continue;

    for (const piece of board) {
      const directions = piece.direction === 'h' ? ['left', 'right'] : ['up', 'down'];
      for (const direction of directions) {
        const result = getBlockMoveResult(board, piece.id, direction);
        if (result === 'exit') return true;
        if (result !== true) continue;

        const nextBoard = moveBlockOneCell(board, piece.id, direction);
        const key = blockBoardKey(nextBoard);
        if (visited.has(key)) continue;
        visited.add(key);
        queue.push({ board: nextBoard, moves: moves + 1 });
      }
    }
  }
  return false;
}

function makeBlockChallenge(level) {
  const baseBoard = BLOCK_LEVELS[level].map((piece) => ({ ...piece }));
  const previousChallenge = localStorage.getItem(`block-escape-layout-${level}`);
  const [minSteps, maxSteps] = BLOCK_SCRAMBLE_STEPS[level];
  const minimumSolutionSteps = BLOCK_MIN_SOLUTION_STEPS[level];

  for (let attempt = 0; attempt < 100; attempt += 1) {
    let board = baseBoard.map((piece) => ({ ...piece }));
    const visited = new Set([blockBoardKey(board)]);
    const desiredSteps = minSteps + Math.floor(Math.random() * (maxSteps - minSteps + 1));
    let movedSteps = 0;

    while (movedSteps < desiredSteps) {
      const options = board.flatMap((piece) => (
        (piece.direction === 'h' ? ['left', 'right'] : ['up', 'down'])
          .filter((direction) => getBlockMoveResult(board, piece.id, direction) === true)
          .map((direction) => ({ pieceId: piece.id, direction }))
      ));

      const unseenOptions = shuffleArray(options).filter(({ pieceId, direction }) => (
        !visited.has(blockBoardKey(moveBlockOneCell(board, pieceId, direction)))
      ));
      if (!unseenOptions.length) break;

      const [move] = unseenOptions;
      board = moveBlockOneCell(board, move.pieceId, move.direction);
      visited.add(blockBoardKey(board));
      movedSteps += 1;
    }

    const layout = blockBoardKey(board);
    const target = board.find((piece) => piece.id === 'target');
    if (
      movedSteps >= minSteps &&
      target.x < 4 &&
      layout !== previousChallenge &&
      !hasEscapeWithinMoves(board, minimumSolutionSteps - 1)
    ) {
      localStorage.setItem(`block-escape-layout-${level}`, layout);
      return board;
    }
  }

  const fallbackCandidates = [baseBoard, ...baseBoard.flatMap((_, index) => {
    const piece = baseBoard[index];
    return (piece.direction === 'h' ? ['left', 'right'] : ['up', 'down'])
      .filter((direction) => getBlockMoveResult(baseBoard, piece.id, direction) === true)
      .map((direction) => moveBlockOneCell(baseBoard, piece.id, direction));
  })];
  for (const candidate of shuffleArray(fallbackCandidates)) {
    const layout = blockBoardKey(candidate);
    const target = candidate.find((piece) => piece.id === 'target');
    if (
      layout !== previousChallenge &&
      target.x < 4 &&
      !hasEscapeWithinMoves(candidate, minimumSolutionSteps - 1)
    ) {
      localStorage.setItem(`block-escape-layout-${level}`, layout);
      return candidate;
    }
  }

  const alternativeCandidates = shuffleArray(baseBoard.flatMap((piece) => (
      (piece.direction === 'h' ? ['left', 'right'] : ['up', 'down'])
        .filter((direction) => getBlockMoveResult(baseBoard, piece.id, direction) === true)
        .map((direction) => moveBlockOneCell(baseBoard, piece.id, direction))
    )));
  const alternative = alternativeCandidates.find((candidate) => (
    blockBoardKey(candidate) !== previousChallenge &&
    candidate.find((piece) => piece.id === 'target').x < 4 &&
    !hasEscapeWithinMoves(candidate, minimumSolutionSteps - 1)
  ));
  if (!alternative) {
    throw new Error(`Unable to create a sufficiently challenging Block Escape layout for level "${level}".`);
  }
  localStorage.setItem(`block-escape-layout-${level}`, blockBoardKey(alternative));
  return alternative;
}

function makeTypingRound(language, mode, previousText = '') {
  const sentences = shuffleArray(WORD_BANK[language][mode]);
  const previousFirstSentence = WORD_BANK[language][mode]
    .find((sentence) => previousText.startsWith(sentence));
  if (previousFirstSentence && sentences[0] === previousFirstSentence) {
    sentences.push(sentences.shift());
  }
  const passage = sentences.join(' ');
  if (passage === previousText) {
    sentences.push(sentences.shift());
  }
  const sentence = sentences.join(' ');
  const source = sentence.split(/\s+/).filter(Boolean);
  return {
    sentence,
    words: Array.from({ length: 240 }, (_, index) => source[index % source.length]),
  };
}

function makeMemoryDeck(level) {
  const config = MEMORY_LEVELS.find((item) => item.id === level) || MEMORY_LEVELS[1];
  const emojis = EMOJIS.slice(0, config.pairs);
  const counts = new Map(emojis.map((emoji) => [emoji, 2]));
  const deck = [];

  const placeCards = (index) => {
    if (index === config.pairs * 2) return true;
    const candidates = shuffleArray(emojis.filter((emoji) => counts.get(emoji) > 0));
    for (const emoji of candidates) {
      const left = index % config.columns > 0 ? deck[index - 1]?.emoji : null;
      const above = index >= config.columns ? deck[index - config.columns]?.emoji : null;
      if (emoji === left || emoji === above) continue;

      const pairIndex = emojis.indexOf(emoji);
      const cardId = pairIndex * 2 + (2 - counts.get(emoji));
      counts.set(emoji, counts.get(emoji) - 1);
      deck.push({ id: cardId, emoji });
      if (placeCards(index + 1)) return true;
      deck.pop();
      counts.set(emoji, counts.get(emoji) + 1);
    }
    return false;
  };

  if (!placeCards(0)) {
    throw new Error(`Unable to arrange a no-adjacent memory deck for level "${level}".`);
  }
  return deck;
}

function GameResult({ title, stats, onPlayAgain, onClose, lang }) {
  const isId = lang === 'id';
  return (
    <div className="game-result" role="status" aria-live="polite">
      <div className="game-result__card">
        <div className="game-result__icon"><i className="fa-solid fa-trophy" aria-hidden="true" /></div>
        <p className="game-result__eyebrow">{isId ? 'PERMAINAN SELESAI' : 'GAME COMPLETE'}</p>
        <h3 className="game-result__title">{isId ? 'Hebat! Kamu berhasil.' : 'Well done! You did it.'}</h3>
        <p className="game-result__subtitle">{title}</p>
        <div className="game-result__stats">
          {stats.map(({ label, value }) => (
            <div className="game-result__stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="game-result__actions">
          <button type="button" className="game-result__play" onClick={onPlayAgain}>
            <i className="fa-solid fa-rotate-right" aria-hidden="true" />
            {isId ? 'Main Lagi' : 'Play Again'}
          </button>
          <button type="button" className="game-result__close" onClick={onClose}>
            {isId ? 'Kembali ke Arcade' : 'Back to Arcade'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══ TYPING TEST ═══ */
function TypingTest({ lang, onClose }) {
  const isId = lang === 'id';
  const [mode, setMode] = useState('words');
  const [testLang, setTestLang] = useState(lang === 'id' ? 'id' : 'en');
  const [duration, setDuration] = useState(60);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [completedWords, setCompletedWords] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [correctCharacters, setCorrectCharacters] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const targetRef = useRef(null);
  const mobileInputRef = useRef(null);
  const tabRef = useRef(false);
  const bestKey = `typing-best-${testLang}-${mode}-${duration}`;
  const [best, setBest] = useState(() => Number(localStorage.getItem(bestKey)) || 0);
  const [round, setRound] = useState(() => makeTypingRound(
    testLang,
    mode,
    localStorage.getItem(`typing-last-${testLang}-${mode}`) || ''
  ));
  const words = round.words;
  const currentWord = words[wordIndex] || '';
  const liveCorrectCharacters = correctCharacters + Array.from(currentInput).reduce(
    (count, character, index) => count + (character === currentWord[index] ? 1 : 0),
    0
  );
  const elapsedSeconds = elapsed / 1000;
  const wpm = elapsedSeconds > 0 ? Math.round((liveCorrectCharacters / 5) / (elapsedSeconds / 60)) : 0;
  const accuracy = keystrokes > 0 ? Math.round((correctKeystrokes / keystrokes) * 100) : 100;
  const remaining = Math.max(0, duration * 1000 - elapsed);

  const reset = useCallback((nextLanguage = testLang, nextMode = mode) => {
    const lastSentence = localStorage.getItem(`typing-last-${nextLanguage}-${nextMode}`);
    setRound((previous) => makeTypingRound(nextLanguage, nextMode, lastSentence || previous.sentence));
    setWordIndex(0);
    setCurrentInput('');
    setCompletedWords([]);
    setStartTime(null);
    setElapsed(0);
    setKeystrokes(0);
    setCorrectKeystrokes(0);
    setCorrectCharacters(0);
    setIsFinished(false);
    targetRef.current?.focus();
  }, [mode, testLang]);

  useEffect(() => {
    localStorage.setItem(`typing-last-${testLang}-${mode}`, round.sentence);
  }, [mode, round.sentence, testLang]);

  useEffect(() => {
    targetRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isFinished) {
      targetRef.current?.focus();
    }
  }, [isFinished]);

  useEffect(() => {
    if (!startTime || isFinished) return undefined;
    const interval = window.setInterval(() => {
      const nextElapsed = Math.min(currentTime() - startTime, duration * 1000);
      setElapsed(nextElapsed);
      if (nextElapsed >= duration * 1000) {
        setIsFinished(true);
        const finalWpm = nextElapsed > 0
          ? Math.round((liveCorrectCharacters / 5) / (nextElapsed / 60000))
          : 0;
        if (finalWpm > best) {
          setBest(finalWpm);
          localStorage.setItem(bestKey, String(finalWpm));
        }
      }
    }, 100);
    return () => window.clearInterval(interval);
  }, [best, bestKey, duration, isFinished, liveCorrectCharacters, startTime]);

  const changeSetting = (setter, value, nextBestKey, nextLanguage = testLang, nextMode = mode) => {
    setter(value);
    setBest(Number(localStorage.getItem(nextBestKey)) || 0);
    reset(nextLanguage, nextMode);
    targetRef.current?.focus();
  };

  const finishTest = (finishTime = currentTime()) => {
    const finalElapsed = Math.max(100, finishTime - (startTime || finishTime));
    const finalWpm = Math.round((liveCorrectCharacters / 5) / (finalElapsed / 60000));
    setElapsed(finalElapsed);
    setIsFinished(true);
    if (finalWpm > best) {
      setBest(finalWpm);
      localStorage.setItem(bestKey, String(finalWpm));
    }
  };

  const submitWord = (typedWord) => {
    if (!typedWord || isFinished) return;
    const isCorrect = typedWord === currentWord;
    setCompletedWords((value) => [...value, isCorrect]);
    if (isCorrect) setCorrectCharacters((value) => value + currentWord.length);
    setCurrentInput('');
    if (wordIndex + 1 >= words.length) {
      finishTest();
    } else {
      setWordIndex((value) => value + 1);
    }
  };

  const handleMobileInput = (event) => {
    const value = event.target.value;
    if (value.includes(' ') || value.includes('\n')) {
      const typedWord = value.trim();
      const addedCharacters = typedWord.slice(currentInput.length);
      for (let index = 0; index < addedCharacters.length; index += 1) {
        const character = addedCharacters[index];
        if (character === currentWord[currentInput.length + index]) {
          setCorrectKeystrokes((count) => count + 1);
        }
        setKeystrokes((count) => count + 1);
      }
      submitWord(typedWord);
      return;
    }

    if (value.length < currentInput.length) {
      setCurrentInput(value);
      return;
    }

    const addedCharacters = value.slice(currentInput.length);
    for (let index = 0; index < addedCharacters.length; index += 1) {
      const character = addedCharacters[index];
      if (!startTime) setStartTime(currentTime());
      if (character === currentWord[currentInput.length + index]) {
        setCorrectKeystrokes((count) => count + 1);
      }
      setKeystrokes((count) => count + 1);
    }
    setCurrentInput(value.slice(0, currentWord.length + 4));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
      return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      tabRef.current = true;
      return;
    }
    if (event.key === 'Enter' && tabRef.current) {
      event.preventDefault();
      tabRef.current = false;
      reset();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey || isFinished) return;

    if (event.key === 'Backspace') {
      event.preventDefault();
      setCurrentInput((value) => value.slice(0, -1));
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      submitWord(currentInput);
      return;
    }

    if (event.key.length !== 1 || currentInput.length >= currentWord.length + 4) return;
    event.preventDefault();
    if (!startTime) setStartTime(currentTime());
    setCurrentInput((value) => value + event.key);
    setKeystrokes((value) => value + 1);
    if (event.key === currentWord[currentInput.length]) {
      setCorrectKeystrokes((value) => value + 1);
    }
  };

  const stats = [
    { label: isId ? 'WPM' : 'WPM', value: String(wpm) },
    { label: isId ? 'AKURASI' : 'ACCURACY', value: `${accuracy}%` },
    { label: isId ? 'WAKTU' : 'TIME', value: `${String(Math.ceil(remaining / 1000)).padStart(2, '0')}s` },
    { label: isId ? 'TERBAIK' : 'BEST', value: best ? String(best) : '—' },
  ];

  const visibleStart = Math.max(0, wordIndex - 4);
  const visibleWords = words.slice(visibleStart, wordIndex + 44);

  if (isFinished) {
    return (
      <GameResult
        title={isId ? 'Tes Kecepatan Mengetik' : 'Typing Speed Test'}
        lang={lang}
        onPlayAgain={reset}
        onClose={onClose}
        stats={[
          { label: 'WPM', value: String(wpm) },
          { label: isId ? 'Akurasi' : 'Accuracy', value: `${accuracy}%` },
          { label: isId ? 'Durasi' : 'Duration', value: `${(elapsed / 1000).toFixed(1)}s` },
          { label: isId ? 'Rekor' : 'Best', value: best ? `${best} WPM` : '—' },
        ]}
      />
    );
  }

  return (
    <div
      ref={targetRef}
      tabIndex={0}
      role="textbox"
      aria-label={isId ? 'Area tes mengetik. Mulai mengetik untuk bermain.' : 'Typing test area. Start typing to play.'}
      aria-multiline="false"
      onKeyDown={handleKeyDown}
      onClick={() => targetRef.current?.focus()}
      className="typing-test-shell outline-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-1">
          {TYPING_MODES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => changeSetting(setMode, item, `typing-best-${testLang}-${item}-${duration}`, testLang, item)}
              className={`typing-setting ${mode === item ? 'typing-setting--active' : ''}`}
              aria-pressed={mode === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {['en', 'id'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => changeSetting(setTestLang, item, `typing-best-${item}-${mode}-${duration}`, item, mode)}
              className={`typing-setting ${testLang === item ? 'typing-setting--active' : ''}`}
              aria-pressed={testLang === item}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {TYPING_DURATIONS.map((seconds) => (
            <button
              key={seconds}
              type="button"
              onClick={() => changeSetting(setDuration, seconds, `typing-best-${testLang}-${mode}-${seconds}`)}
              className={`typing-setting ${duration === seconds ? 'typing-setting--active' : ''}`}
              aria-pressed={duration === seconds}
            >
              {seconds}s
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-b border-border px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <div className="font-mono text-[10px] tracking-[0.18em] text-muted">{stat.label}</div>
            <div className="mt-1 font-heading text-xl font-bold tabular-nums text-text">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="typing-test-copy" onClick={() => mobileInputRef.current?.focus()}>
        <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {testLang === 'id' ? 'BAHASA INDONESIA' : 'ENGLISH'}
          <span className="ml-3 opacity-60">{mode.toUpperCase()}</span>
        </div>
        <p className="typing-test-words" aria-live="polite">
          {visibleWords.map((word, offset) => {
            const index = visibleStart + offset;
            const isCurrent = index === wordIndex;
            const result = index < wordIndex ? completedWords[index] : null;
            const className = isCurrent
              ? 'typing-test-word typing-test-word--current'
              : result === true
                ? 'typing-test-word typing-test-word--correct'
                : result === false
                  ? 'typing-test-word typing-test-word--incorrect'
                  : 'typing-test-word';

            return (
              <span key={`${index}-${word}`} className={className}>
                {isCurrent ? (
                  <>
                    {Array.from(word).map((character, characterIndex) => {
                      const typedCharacter = currentInput[characterIndex];
                      const characterClass = typedCharacter
                        ? typedCharacter === character ? 'typing-test-char--correct' : 'typing-test-char--incorrect'
                        : '';
                      return <span key={`${characterIndex}-${character}`} className={characterClass}>{character}</span>;
                    })}
                    {currentInput.length > word.length && (
                      <span className="typing-test-char--incorrect">{currentInput.slice(word.length)}</span>
                    )}
                    {!isFinished && <span className="typing-test-caret" aria-hidden="true" />}
                  </>
                ) : word}
                {' '}
              </span>
            );
          })}
        </p>
        {!startTime && !isFinished && (
          <p className="mt-5 font-mono text-xs text-muted">
            {isId ? 'Mulai mengetik untuk memulai tes' : 'Start typing to begin the test'}
          </p>
        )}
        <label className="typing-mobile-input" onClick={(event) => event.stopPropagation()}>
          <span>{isId ? 'Ketik di sini untuk bermain' : 'Type here to play'}</span>
          <input
            ref={mobileInputRef}
            type="text"
            inputMode="text"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            value={currentInput}
            onChange={handleMobileInput}
            onKeyDown={(event) => event.stopPropagation()}
            aria-label={isId ? 'Ketik kata untuk tes' : 'Type the words for the test'}
            placeholder={isId ? 'Mulai mengetik…' : 'Start typing…'}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-muted">
          <span><kbd>Space</kbd> {isId ? 'kata berikutnya' : 'next word'}</span>
          <span><kbd>Tab</kbd> + <kbd>Enter</kbd> {isId ? 'ulang tes' : 'restart'}</span>
          <span><kbd>Esc</kbd> {isId ? 'tutup' : 'close'}</span>
        </div>
        <button type="button" onClick={() => reset()} className="typing-restart">
          <i className="fa-solid fa-rotate-right" aria-hidden="true" />
          {isId ? 'MULAI ULANG' : 'RESTART'}
        </button>
      </div>
    </div>
  );
}

/* ═══ MEMORY MATCH ═══ */
function MemoryMatch({ lang, onClose }) {
  const isId = lang === 'id';
  const [level, setLevel] = useState('normal');
  const [cards, setCards] = useState(() => makeMemoryDeck('normal'));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);
  const mismatchTimerRef = useRef(null);
  const selectedLevel = MEMORY_LEVELS.find((item) => item.id === level) || MEMORY_LEVELS[1];
  const bestKey = `memory-best-${level}`;
  const [bestMoves, setBestMoves] = useState(() => Number(localStorage.getItem(bestKey)) || 0);

  const initGame = (nextLevel = level) => {
    setCards(makeMemoryDeck(nextLevel));
    clearInterval(timerRef.current);
    clearTimeout(mismatchTimerRef.current);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setStartTime(null);
    setElapsed(0);
    setIsFinished(false);
  };

  useEffect(() => {
    if (startTime && !isFinished) {
      timerRef.current = setInterval(() => setElapsed(Date.now() - startTime), 100);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime, isFinished]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(mismatchTimerRef.current);
  }, []);

  const chooseLevel = (nextLevel) => {
    setLevel(nextLevel);
    setBestMoves(Number(localStorage.getItem(`memory-best-${nextLevel}`)) || 0);
    initGame(nextLevel);
  };

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index) || isFinished) return;
    if (!startTime) setStartTime(currentTime());
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        const newMatched = [...matched, a, b];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) {
          const finishedAt = currentTime();
          setElapsed(finishedAt - (startTime || finishedAt));
          setIsFinished(true);
          clearInterval(timerRef.current);
          const finalMoves = moves + 1;
          if (!bestMoves || finalMoves < bestMoves) {
            setBestMoves(finalMoves);
            localStorage.setItem(bestKey, String(finalMoves));
          }
        }
      } else {
        mismatchTimerRef.current = window.setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  const elapsedSec = (elapsed / 1000).toFixed(1);
  const labels = {
    easy: isId ? 'Mudah' : 'Easy',
    normal: isId ? 'Sedang' : 'Normal',
    hard: isId ? 'Sulit' : 'Hard',
  };

  if (isFinished) {
    return (
      <GameResult
        title={isId ? 'Memory Match' : 'Memory Match'}
        lang={lang}
        onPlayAgain={() => initGame()}
        onClose={onClose}
        stats={[
          { label: isId ? 'Langkah' : 'Moves', value: String(moves) },
          { label: isId ? 'Waktu' : 'Time', value: `${elapsedSec}s` },
          { label: isId ? 'Level' : 'Level', value: labels[level] },
          { label: isId ? 'Rekor' : 'Best', value: bestMoves ? `${bestMoves} ${isId ? 'langkah' : 'moves'}` : '—' },
        ]}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {isId ? 'Pilih tingkat kesulitan' : 'Choose difficulty'}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {MEMORY_LEVELS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => chooseLevel(item.id)}
                className={`typing-setting ${level === item.id ? 'typing-setting--active' : ''}`}
                aria-pressed={level === item.id}
              >
                {labels[item.id]} · {item.pairs} {isId ? 'pasang' : 'pairs'}
              </button>
            ))}
          </div>
        </div>
        <button type="button" onClick={() => initGame()} className="typing-restart">
          <i className="fa-solid fa-shuffle" aria-hidden="true" />
          {isId ? 'ACAK ULANG' : 'SHUFFLE'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { icon: 'fa-solid fa-shoe-prints', label: isId ? 'Langkah' : 'Moves', value: String(moves), color: 'var(--color-gold)' },
          { icon: 'fa-solid fa-check-double', label: isId ? 'Pasangan' : 'Pairs', value: `${matched.length / 2}/${selectedLevel.pairs}`, color: '#16a34a' },
          { icon: 'fa-regular fa-clock', label: isId ? 'Waktu' : 'Time', value: startTime ? `${elapsedSec}s` : '0.0s', color: 'var(--color-text)' },
          { icon: 'fa-solid fa-trophy', label: isId ? 'Terbaik' : 'Best', value: bestMoves ? `${bestMoves}` : '—', color: 'var(--color-gold)' },
        ].map(({ icon, label, value, color }) => (
          <div key={label} className="flex flex-col items-center gap-1 rounded-xl border px-2 py-3 shadow-2xs"
            style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
            <i className={`${icon} text-xs mb-0.5`} style={{ color }} aria-hidden="true" />
            <span className="text-lg font-mono font-bold" style={{ color }}>{value}</span>
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--color-muted)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Board */}
      <div
        className="mx-auto grid w-full max-w-md gap-2.5 sm:gap-3"
        style={{ gridTemplateColumns: `repeat(${selectedLevel.columns}, minmax(0, 1fr))` }}
      >
        {cards.map((card, i) => {
          const isOpen = flipped.includes(i) || matched.includes(i);
          const isMatchedCard = matched.includes(i);
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleFlip(i)}
              disabled={isOpen || (flipped.length === 2 && !flipped.includes(i)) || isFinished}
              aria-label={isMatchedCard
                ? (isId ? 'Kartu pasangan ditemukan' : 'Matched card')
                : (isId ? `Buka kartu ${i + 1}` : `Reveal card ${i + 1}`)}
              className="aspect-square rounded-xl text-2xl sm:text-3xl flex items-center justify-center cursor-pointer border transition-all duration-300 shadow-2xs"
              style={{
                background: isOpen ? 'var(--color-bg)' : 'var(--color-surface)',
                borderColor: isMatchedCard ? '#16a34a' : isOpen ? 'var(--color-gold)' : 'var(--color-border)',
                opacity: isMatchedCard ? 0.75 : 1,
              }}
            >
              {isOpen ? (
                card.emoji
              ) : (
                <i className="fa-solid fa-gamepad text-base sm:text-lg text-gold/70" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}

/* ═══ BLOCK ESCAPE ═══ */
function BlockEscape({ lang, onClose }) {
  const isId = lang === 'id';
  const [level, setLevel] = useState('easy');
  const [pieces, setPieces] = useState(() => makeBlockChallenge('easy'));
  const [selectedId, setSelectedId] = useState('target');
  const [history, setHistory] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const boardRef = useRef(null);
  const dragRef = useRef(null);
  const [dragOffset, setDragOffset] = useState(null);
  const bestKey = `block-escape-best-${level}`;
  const [best, setBest] = useState(() => Number(localStorage.getItem(bestKey)) || 0);
  const selectedPiece = pieces.find((piece) => piece.id === selectedId) || pieces[0];
  const labels = {
    easy: isId ? 'Mudah' : 'Easy',
    normal: isId ? 'Sedang' : 'Normal',
    hard: isId ? 'Sulit' : 'Hard',
  };

  useEffect(() => {
    if (!startedAt || isFinished) return undefined;
    const timerId = window.setInterval(() => setElapsed(Date.now() - startedAt), 100);
    return () => window.clearInterval(timerId);
  }, [startedAt, isFinished]);

  const resetGame = (nextLevel = level) => {
    setPieces(makeBlockChallenge(nextLevel));
    setSelectedId('target');
    setHistory([]);
    setMoves(0);
    setStartedAt(null);
    setElapsed(0);
    setIsFinished(false);
  };

  const chooseLevel = (nextLevel) => {
    setLevel(nextLevel);
    setBest(Number(localStorage.getItem(`block-escape-best-${nextLevel}`)) || 0);
    resetGame(nextLevel);
  };

  const canMove = (pieceId, direction, board = pieces) => {
    return getBlockMoveResult(board, pieceId, direction);
  };

  const moveSelected = (direction, distance = 1, pieceId = selectedPiece?.id) => {
    if (isFinished || !pieceId) return;
    let nextPieces = pieces;
    let completedSteps = 0;
    let didExit = false;
    const moveTime = Date.now();

    for (let step = 0; step < distance; step += 1) {
      const moveResult = canMove(pieceId, direction, nextPieces);
      if (!moveResult) break;
      completedSteps += 1;
      if (moveResult === 'exit') {
        didExit = true;
        break;
      }

      nextPieces = moveBlockOneCell(nextPieces, pieceId, direction);
    }

    if (!completedSteps) return;
    setSelectedId(pieceId);
    setHistory((previous) => [...previous, { pieces, moves }]);
    setPieces(nextPieces);
    const nextMoves = moves + completedSteps;
    setMoves(nextMoves);
    if (!startedAt) setStartedAt(moveTime);

    if (didExit) {
      setElapsed(moveTime - (startedAt || moveTime));
      setIsFinished(true);
      if (!best || nextMoves < best) {
        setBest(nextMoves);
        localStorage.setItem(bestKey, String(nextMoves));
      }
    }
  };

  const beginDrag = (event, piece) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const directions = piece.direction === 'h' ? ['left', 'right'] : ['up', 'down'];
    const maxSteps = Object.fromEntries(directions.map((direction) => {
      let board = pieces;
      let steps = 0;
      while (true) {
        const result = canMove(piece.id, direction, board);
        if (!result) break;
        steps += 1;
        if (result === 'exit') break;
        board = moveBlockOneCell(board, piece.id, direction);
      }
      return [direction, steps];
    }));
    dragRef.current = {
      id: piece.id,
      x: event.clientX,
      y: event.clientY,
      maxSteps,
    };
    setDragOffset({ id: piece.id, x: 0, y: 0 });
    setSelectedId(piece.id);
  };

  const updateDrag = (event, piece) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== piece.id || !boardRef.current) return;

    const deltaX = piece.direction === 'h' ? event.clientX - drag.x : 0;
    const deltaY = piece.direction === 'v' ? event.clientY - drag.y : 0;
    const delta = piece.direction === 'h' ? deltaX : deltaY;
    if (Math.abs(delta) < 1) return;

    const direction = piece.direction === 'h'
      ? delta > 0 ? 'right' : 'left'
      : delta > 0 ? 'down' : 'up';
    const boardRect = boardRef.current.getBoundingClientRect();
    const cellSize = (piece.direction === 'h' ? boardRect.width : boardRect.height) / 6;
    const maxOffset = drag.maxSteps[direction] * cellSize;
    const clampedDelta = Math.sign(delta) * Math.min(Math.abs(delta), maxOffset);
    setDragOffset({
      id: piece.id,
      x: piece.direction === 'h' ? clampedDelta : 0,
      y: piece.direction === 'v' ? clampedDelta : 0,
    });
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    dragRef.current = null;
    setDragOffset(null);
    if (!drag || !boardRef.current) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const deltaX = event.clientX - drag.x;
    const deltaY = event.clientY - drag.y;
    const piece = pieces.find((item) => item.id === drag.id);
    if (!piece) return;

    const delta = piece.direction === 'h' ? deltaX : deltaY;
    const cellSize = (piece.direction === 'h' ? boardRect.width : boardRect.height) / 6;
    const distance = Math.abs(delta) < cellSize * 0.35
      ? 0
      : Math.max(1, Math.round(Math.abs(delta) / cellSize));
    if (!distance) return;
    const direction = piece.direction === 'h'
      ? delta > 0 ? 'right' : 'left'
      : delta > 0 ? 'down' : 'up';
    moveSelected(direction, Math.min(distance, drag.maxSteps[direction]), piece.id);
  };

  const cancelDrag = () => {
    dragRef.current = null;
    setDragOffset(null);
  };

  const undoMove = () => {
    const previous = history[history.length - 1];
    if (!previous) return;
    setPieces(previous.pieces);
    setMoves(previous.moves);
    setHistory((items) => items.slice(0, -1));
    setIsFinished(false);
  };

  const onBoardKeyDown = (event) => {
    const direction = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
    }[event.key];
    if (!direction) return;
    event.preventDefault();
    moveSelected(direction);
  };

  if (isFinished) {
    return (
      <GameResult
        title={isId ? 'Teka-teki Geser Blok' : 'Block Escape'}
        lang={lang}
        onPlayAgain={() => resetGame()}
        onClose={onClose}
        stats={[
          { label: isId ? 'Langkah' : 'Moves', value: String(moves) },
          { label: isId ? 'Waktu' : 'Time', value: `${(elapsed / 1000).toFixed(1)}s` },
          { label: isId ? 'Level' : 'Level', value: labels[level] },
          { label: isId ? 'Rekor' : 'Best', value: best ? String(best) : '—' },
        ]}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {isId ? 'Pilih level puzzle' : 'Choose puzzle level'}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {Object.keys(BLOCK_LEVELS).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => chooseLevel(item)}
                className={`typing-setting ${level === item ? 'typing-setting--active' : ''}`}
                aria-pressed={level === item}
              >
                {labels[item]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={undoMove} disabled={!history.length} className="typing-restart disabled:cursor-not-allowed disabled:opacity-40">
            <i className="fa-solid fa-rotate-left" aria-hidden="true" />
            {isId ? 'URUNGKAN' : 'UNDO'}
          </button>
          <button type="button" onClick={() => resetGame()} className="typing-restart">
            <i className="fa-solid fa-arrow-rotate-right" aria-hidden="true" />
            {isId ? 'ULANGI' : 'RESET'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: isId ? 'Langkah' : 'Moves', value: String(moves) },
          { label: isId ? 'Waktu' : 'Time', value: `${(elapsed / 1000).toFixed(1)}s` },
          { label: isId ? 'Terbaik' : 'Best', value: best ? `${best}` : '—' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border px-3 py-2 text-center" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{stat.label}</div>
            <div className="mt-1 font-mono text-lg font-bold tabular-nums text-text">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center sm:gap-8">
        <div className="relative w-full max-w-[340px]">
          <div
            ref={boardRef}
            role="group"
            aria-label={isId ? 'Papan puzzle blok. Geser setiap blok searah jalurnya.' : 'Block puzzle board. Drag each block along its track.'}
            tabIndex={0}
            onKeyDown={onBoardKeyDown}
            className="relative aspect-square overflow-hidden rounded-2xl border-2 border-border outline-none focus-visible:ring-2 focus-visible:ring-gold"
            style={{
              backgroundColor: 'var(--color-bg)',
              backgroundImage: 'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
              backgroundSize: '16.6667% 16.6667%',
            }}
          >
            {pieces.map((piece, index) => {
              const isSelected = selectedId === piece.id;
              const isTarget = piece.id === 'target';
              const colors = ['#64748b', '#0f766e', '#7c3aed', '#2563eb', '#c2410c', '#475569', '#be185d'];
              const cellPercent = 100 / 6;
              return (
                <button
                  key={piece.id}
                  type="button"
                  onPointerDown={(event) => beginDrag(event, piece)}
                  onPointerMove={(event) => updateDrag(event, piece)}
                  onPointerUp={endDrag}
                  onPointerCancel={cancelDrag}
                  aria-pressed={isSelected}
                  aria-label={isTarget
                    ? (isId ? 'Blok kunci' : 'Key block')
                    : `${isId ? 'Blok' : 'Block'} ${piece.id.toUpperCase()}`}
                  onClick={() => setSelectedId(piece.id)}
                  className="absolute flex items-center justify-center rounded-xl border-2 text-white shadow-md transition-all duration-150 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{
                    left: `calc(${piece.x * cellPercent}% + 3px)`,
                    top: `calc(${piece.y * cellPercent}% + 3px)`,
                    width: `calc(${(piece.direction === 'h' ? piece.length : 1) * cellPercent}% - 6px)`,
                    height: `calc(${(piece.direction === 'v' ? piece.length : 1) * cellPercent}% - 6px)`,
                    background: isTarget
                      ? 'linear-gradient(135deg, #f3cb68, #a8731c)'
                      : `linear-gradient(135deg, ${colors[index % colors.length]}, ${colors[(index + 2) % colors.length]})`,
                    borderColor: isSelected ? '#fff1b8' : isTarget ? '#ffd976' : 'rgba(255,255,255,0.3)',
                    boxShadow: isSelected ? '0 0 0 3px rgba(216,170,66,0.42), 0 8px 18px rgba(0,0,0,0.2)' : undefined,
                    zIndex: isSelected ? 2 : 1,
                    touchAction: 'none',
                    userSelect: 'none',
                    transform: dragOffset?.id === piece.id
                      ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`
                      : undefined,
                    transition: dragOffset?.id === piece.id
                      ? 'none'
                      : 'left 160ms cubic-bezier(0.22, 1, 0.36, 1), top 160ms cubic-bezier(0.22, 1, 0.36, 1), transform 160ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {isTarget ? <i className="fa-solid fa-key text-sm sm:text-base" aria-hidden="true" /> : <span className="h-1 w-1/2 rounded-full bg-white/40" />}
                </button>
              );
            })}
            <div className="pointer-events-none absolute right-1 top-[35%] text-gold" aria-hidden="true">
              <i className="fa-solid fa-arrow-right-long text-xl drop-shadow" />
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-muted">
            {isId ? 'Sentuh lalu geser setiap blok searah jalurnya. Buka jalan agar kunci keluar ke kanan.' : 'Touch and drag blocks along their tracks. Clear the path for the key to exit on the right.'}
          </p>
        </div>

      </div>

    </div>
  );
}

/* ═══ GAME MODAL ═══ */
function GameModal({ game, onClose, lang }) {
  const isId = lang === 'id';
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const sb = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (sb > 0) document.body.style.paddingRight = `${sb}px`;
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [onClose]);

  const titles = {
    typing: { en: 'Typing Speed Test', id: 'Tes Kecepatan Mengetik' },
    memory: { en: 'Memory Match', id: 'Memory Match' },
    blocks: { en: 'Block Escape', id: 'Teka-teki Geser Blok' },
  };

  const icons = {
    typing: 'fa-solid fa-keyboard',
    memory: 'fa-solid fa-brain',
    blocks: 'fa-solid fa-cubes-stacked',
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center p-2 sm:items-center sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
        role="dialog"
        aria-modal="true"
        aria-label={isId ? titles[game].id : titles[game].en}
        className="relative z-10 my-auto flex max-h-[calc(100dvh-1rem)] w-full max-w-5xl flex-col overflow-hidden rounded-xl border shadow-2xl sm:max-h-[92vh]"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        {/* Header */}
        <div
          className="px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 border-b"
          style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              aria-label={isId ? 'Kembali ke arcade' : 'Back to arcade'}
              className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-surface hover:text-text"
            >
              <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true" />
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {isId ? 'ARCADE' : 'ARCADE'} <span className="mx-1 opacity-50">/</span>
              {game === 'typing' ? 'TYPING.EXE' : game === 'memory' ? 'MEMORY.EXE' : 'BLOCKS.EXE'}
            </span>
            <i className={`${icons[game]} ml-2 text-sm text-gold`} aria-hidden="true" />
            <span
              className="hidden text-sm font-semibold sm:inline"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              {isId ? titles[game].id : titles[game].en}
            </span>
          </div>
          <button
            type="button" onClick={onClose}
            aria-label={isId ? 'Tutup game' : 'Close game'}
            className="w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer transition-all duration-200"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-gold)';
              e.currentTarget.style.color = 'var(--color-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
          </button>
        </div>
        {/* Content */}
        <div className={`min-h-0 overflow-y-auto overscroll-contain ${game === 'typing' ? 'p-0' : 'p-4 sm:p-6'}`}>
          {game === 'typing'
            ? <TypingTest lang={lang} onClose={onClose} />
            : game === 'memory'
              ? <MemoryMatch lang={lang} onClose={onClose} />
              : <BlockEscape lang={lang} onClose={onClose} />}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══ ARCADE SECTION ═══ */
export default function Arcade() {
  const { lang } = useLang();
  const { ref, isInView } = useInView({ triggerOnce: true });
  const [activeGame, setActiveGame] = useState(null);
  const isId = lang === 'id';

  const games = [
    {
      id: 'typing',
      iconClass: 'fa-solid fa-keyboard',
      title: { en: 'Typing Speed Test', id: 'Tes Kecepatan Mengetik' },
      description: {
        en: 'Test your typing speed and accuracy. Track your WPM score in real time.',
        id: 'Uji kecepatan dan akurasi mengetikmu. Lihat skor WPM secara langsung.',
      },
      tag: { en: 'Speed', id: 'Kecepatan' },
    },
    {
      id: 'memory',
      iconClass: 'fa-solid fa-brain',
      title: { en: 'Memory Match', id: 'Memory Match' },
      description: {
        en: 'Flip cards and find all matching pairs. Train your short-term memory!',
        id: 'Balik kartu dan temukan semua pasangan yang cocok. Latih daya ingatmu!',
      },
      tag: { en: 'Memory', id: 'Memori' },
    },
    {
      id: 'blocks',
      iconClass: 'fa-solid fa-cubes-stacked',
      title: { en: 'Block Escape', id: 'Teka-teki Geser Blok' },
      description: {
        en: 'Clear a path through traffic and slide the key block to the exit. Choose a level and solve it with as few moves as you can.',
        id: 'Buka jalan di antara blok dan geser blok kunci menuju pintu keluar. Pilih level dan pecahkan dengan langkah sesedikit mungkin.',
      },
      tag: { en: 'Logic', id: 'Logika' },
    },
  ];

  return (
    <section
      id="arcade"
      className="section-padding relative overflow-hidden"
      aria-label="Arcade"
      ref={ref}
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="container-main">
        <SectionTitle
          label="ARCADE"
          title={isId ? 'Istirahat sejenak, mainkan game.' : 'Take a break, play a game.'}
          subtitle={isId ? 'Klik salah satu kartu untuk memulai permainan interaktif.' : 'Click a card to launch an interactive mini-game.'}
        />

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {games.map((game, i) => (
            <button
              key={game.id}
              type="button"
              onClick={() => setActiveGame(game.id)}
              className="group relative rounded-2xl border p-6 sm:p-7 text-left cursor-pointer transition-all duration-300 flex flex-col shadow-2xs hover:shadow-md"
              style={{
                background: 'var(--color-bg)',
                borderColor: 'var(--color-border)',
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Tag */}
              <span
                className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-semibold"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'rgba(179,130,38,0.3)',
                  color: 'var(--color-gold-text)',
                }}
              >
                {isId ? game.tag.id : game.tag.en}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl border flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 shadow-2xs"
                style={{
                  background: 'rgba(179,130,38,0.1)',
                  borderColor: 'rgba(179,130,38,0.3)',
                  color: 'var(--color-gold)',
                }}
              >
                <i className={`${game.iconClass} text-xl`} aria-hidden="true" />
              </div>

              {/* Title */}
              <h3
                className="text-base sm:text-lg mb-2 font-semibold transition-colors duration-300"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                {isId ? game.title.id : game.title.en}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm leading-relaxed flex-1" style={{ color: 'var(--color-muted)' }}>
                {isId ? game.description.id : game.description.en}
              </p>

              {/* Play hint */}
              <div
                className="mt-5 pt-4 flex items-center justify-between"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <span className="text-xs font-mono font-medium" style={{ color: 'var(--color-gold-text)' }}>
                  {isId ? 'Mulai bermain' : 'Launch game'}
                </span>
                <i className="fa-solid fa-arrow-right text-xs text-gold transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeGame && (
          <GameModal key={activeGame} game={activeGame} lang={lang} onClose={() => setActiveGame(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}