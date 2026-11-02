/**
 * Arcade — 2 mini-game cards, popup modals, fully dual-mode safe.
 * Games: Typing Speed Test + Memory Match
 * Font Awesome icons, high contrast text in light and dark mode.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionTitle from '../components/ui/SectionTitle';
import { useLang } from '../hooks/useLang';
import { useInView } from '../hooks/useInView';

const WORD_BANK = {
  en: {
    words: 'the quiet morning brings a new journey across the island discover hidden places meet local people and enjoy every moment together',
    code: 'const trip = await explore("Bali"); function plan(days) { return days.map((day) => discover(day)); }',
    shell: 'cd bali-trip && npm run explore && git status --short && echo "ready for the next adventure"',
  },
  id: {
    words: 'pagi yang tenang membawa perjalanan baru menyusuri pulau menemukan tempat indah bertemu warga lokal dan menikmati setiap momen bersama',
    code: 'const perjalanan = await jelajahi("Bali"); function rencana(hari) { return hari.map((tujuan) => temukan(tujuan)); }',
    shell: 'cd wisata-bali && npm run jelajah && git status --short && echo "siap untuk petualangan berikutnya"',
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
  const tabRef = useRef(false);
  const bestKey = `typing-best-${testLang}-${mode}-${duration}`;
  const [best, setBest] = useState(() => Number(localStorage.getItem(bestKey)) || 0);

  const source = WORD_BANK[testLang][mode].split(' ');
  const words = Array.from({ length: 240 }, (_, index) => source[index % source.length]);
  const currentWord = words[wordIndex] || '';
  const liveCorrectCharacters = correctCharacters + Array.from(currentInput).reduce(
    (count, character, index) => count + (character === currentWord[index] ? 1 : 0),
    0
  );
  const elapsedSeconds = elapsed / 1000;
  const wpm = elapsedSeconds > 0 ? Math.round((liveCorrectCharacters / 5) / (elapsedSeconds / 60)) : 0;
  const accuracy = keystrokes > 0 ? Math.round((correctKeystrokes / keystrokes) * 100) : 100;
  const remaining = Math.max(0, duration * 1000 - elapsed);

  const reset = useCallback(() => {
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
  }, []);

  useEffect(() => {
    targetRef.current?.focus();
  }, []);

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

  const changeSetting = (setter, value, nextBestKey) => {
    setter(value);
    setBest(Number(localStorage.getItem(nextBestKey)) || 0);
    reset();
    targetRef.current?.focus();
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
      if (!currentInput) return;
      const isCorrect = currentInput === currentWord;
      setCompletedWords((value) => [...value, isCorrect]);
      if (isCorrect) setCorrectCharacters((value) => value + currentWord.length);
      setCurrentInput('');
      setWordIndex((value) => value + 1);
      if (wordIndex + 1 >= words.length) {
        const finalElapsed = currentTime() - startTime;
        const finalCorrectCharacters = correctCharacters + (isCorrect ? currentWord.length : 0);
        const finalWpm = Math.round((finalCorrectCharacters / 5) / (finalElapsed / 60000));
        setElapsed(finalElapsed);
        setIsFinished(true);
        if (finalWpm > best) {
          setBest(finalWpm);
          localStorage.setItem(bestKey, String(finalWpm));
        }
      }
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
              onClick={() => changeSetting(setMode, item, `typing-best-${testLang}-${item}-${duration}`)}
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
              onClick={() => changeSetting(setTestLang, item, `typing-best-${item}-${mode}-${duration}`)}
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

      <div className="typing-test-copy" onClick={() => targetRef.current?.focus()}>
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
        {isFinished && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-text">
            <i className="fa-solid fa-trophy text-gold" aria-hidden="true" />
            {isId ? 'Tes selesai' : 'Test complete'} · {wpm} WPM
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-muted">
          <span><kbd>Space</kbd> {isId ? 'kata berikutnya' : 'next word'}</span>
          <span><kbd>Tab</kbd> + <kbd>Enter</kbd> {isId ? 'ulang tes' : 'restart'}</span>
          <span><kbd>Esc</kbd> {isId ? 'tutup' : 'close'}</span>
        </div>
        <button type="button" onClick={reset} className="typing-restart">
          <i className="fa-solid fa-rotate-right" aria-hidden="true" />
          {isId ? 'MULAI ULANG' : 'RESTART'}
        </button>
      </div>
    </div>
  );
}

/* ═══ MEMORY MATCH ═══ */
function MemoryMatch({ lang }) {
  const isId = lang === 'id';
  const [level, setLevel] = useState('normal');
  const [cards, setCards] = useState(() =>
    EMOJIS.slice(0, 6).flatMap((emoji, pairIndex) => [
      { id: pairIndex * 2, emoji },
      { id: pairIndex * 2 + 1, emoji },
    ])
  );
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
    const config = MEMORY_LEVELS.find((item) => item.id === nextLevel) || MEMORY_LEVELS[1];
    const selectedEmojis = EMOJIS.slice(0, config.pairs);
    const pairs = selectedEmojis.flatMap((emoji, pairIndex) => [
      { id: pairIndex * 2, emoji },
      { id: pairIndex * 2 + 1, emoji },
    ]);
    setCards(shuffleArray(pairs));
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

      {isFinished && (
        <div
          className="p-4 rounded-xl border animate-fade-up text-center shadow-sm"
          style={{ borderColor: 'var(--color-gold)', background: 'var(--color-bg)' }}
        >
          <i className="fa-solid fa-trophy text-2xl mb-2 text-gold block" aria-hidden="true" />
          <p className="text-sm font-mono font-bold" style={{ color: 'var(--color-text)' }}>
            {isId ? `Hebat! ${moves} langkah dalam ${elapsedSec} detik` : `Great! ${moves} moves in ${elapsedSec} seconds`}
          </p>
        </div>
      )}
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
  };

  const icons = {
    typing: 'fa-solid fa-keyboard',
    memory: 'fa-solid fa-brain',
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
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
        className="relative z-10 w-full max-w-5xl max-h-[92vh] rounded-xl flex flex-col overflow-hidden shadow-2xl border"
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
              {game === 'typing' ? 'TYPING.EXE' : 'MEMORY.EXE'}
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
        <div className={`overflow-y-auto ${game === 'typing' ? 'p-0' : 'p-4 sm:p-6'}`}>
          {game === 'typing'
            ? <TypingTest lang={lang} onClose={onClose} />
            : <MemoryMatch lang={lang} />}
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
          className={`grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto transition-all duration-700 ${
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