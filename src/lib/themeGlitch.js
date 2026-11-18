/**
 * themeGlitch — the dark ↔ light switch used across the site.
 *
 * Inspired by juliasta.my.id: the incoming theme "breaks through" the old one
 * in one of five randomised patterns (scatter, tear, blocks, scan, drip) drawn
 * as clip-path rectangles in % of the viewport, while both layers jolt.
 * Revealed areas only ever grow, so every part of the screen flips once.
 *
 * Built on the same-document View Transitions API. When it is unavailable
 * (or the visitor prefers reduced motion) the caller falls back to a plain
 * colour fade, so nothing breaks.
 */

const DURATION = 520;
const FRAMES = 10;

/** Cuts 0–100 into runs between `min` and `max` long. */
function strips(min, max) {
  const runs = [];
  for (let start = 0; start < 100; ) {
    const end = Math.min(100, start + min + Math.random() * (max - min));
    runs.push([start, end]);
    start = end;
  }
  return runs;
}

const PATTERNS = [
  // Scatter — full-width bands break through anywhere, slowly at first.
  {
    axis: 'X',
    make() {
      const bands = strips(2, 12).map(([top, bottom]) => ({
        top,
        bottom,
        at: Math.random() ** 0.8 * 0.9,
      }));
      return (time) => bands
        .filter((band) => band.at <= time)
        .map(({ top, bottom }) => [0, top, 100, bottom]);
    },
  },
  // Tear — a seam opens across the middle and spreads up and down.
  {
    axis: 'X',
    make() {
      const bands = strips(1.5, 7.5).map(([top, bottom]) => {
        const distance = Math.abs((top + bottom) / 2 - 50) / 50;
        const middle = top <= 50 && bottom >= 50;
        return {
          top,
          bottom,
          at: middle ? 0 : Math.min(0.75, distance * 0.5 + Math.random() * 0.2),
          speed: 120 + Math.random() * 180,
        };
      });
      return (time) => bands.flatMap(({ top, bottom, at, speed }) => {
        if (time < at) return [];
        const half = Math.min(50, (time - at) * speed + 1);
        return [[50 - half, top, 50 + half, bottom]];
      });
    },
  },
  // Blocks — an uneven grid whose cells flip at random.
  {
    axis: 'X',
    make() {
      const columns = strips(5, 12);
      const cells = strips(7, 16).flatMap(([top, bottom]) => (
        columns.map(([left, right]) => ({
          rect: [left, top, right, bottom],
          at: Math.random() ** 0.9 * 0.9,
        }))
      ));
      return (time) => cells.filter((cell) => cell.at <= time).map((cell) => cell.rect);
    },
  },
  // Scan — thin bands sweep down (or up) the screen like a CRT refresh.
  {
    axis: 'X',
    make() {
      const down = Math.random() < 0.5;
      const bands = strips(1.5, 6).map(([top, bottom]) => ({
        top,
        bottom,
        at: Math.min(0.92, ((down ? top : 100 - bottom) / 100) * 0.8 + Math.random() * 0.12),
      }));
      return (time) => bands
        .filter((band) => band.at <= time)
        .map(({ top, bottom }) => [0, top, 100, bottom]);
    },
  },
  // Drip — columns run down from the top, each at its own pace.
  {
    axis: 'Y',
    make() {
      const columns = strips(2, 9).map(([left, right]) => ({
        left,
        right,
        at: Math.random() ** 0.9 * 0.6,
        speed: 250 + Math.random() * 350,
      }));
      return (time) => columns.flatMap(({ left, right, at, speed }) => (
        time < at ? [] : [[left, 0, right, Math.min(100, (time - at) * speed + 4)]]
      ));
    },
  },
];

let lastPattern = -1;

/** Picks a pattern, never the same one twice in a row. */
function pickPattern() {
  let index = Math.floor(Math.random() * PATTERNS.length);
  if (index === lastPattern) {
    index = (index + 1 + Math.floor(Math.random() * (PATTERNS.length - 1))) % PATTERNS.length;
  }
  lastPattern = index;
  return PATTERNS[index];
}

/**
 * Rectangles as one clip-path polygon: each is reached along its top edge from
 * a spine at the left edge of the screen, and left the same way. The spine and
 * the paths along it have no width, so only the rectangles are filled.
 */
function toClip(rects) {
  if (!rects.length) return 'inset(50%)';
  const point = (x, y) => `${x.toFixed(2)}% ${y.toFixed(2)}%`;
  const points = rects.flatMap(([left, top, right, bottom]) => [
    point(0, top),
    point(left, top),
    point(right, top),
    point(right, bottom),
    point(left, bottom),
    point(left, top),
    point(0, top),
  ]);
  return `polygon(${points.join(', ')})`;
}

function buildFrames() {
  const { axis, make } = pickPattern();
  const through = make();
  const jolt = (frame, reach) => {
    const offset = (Math.random() * 2 - 1) * reach * (1 - frame / FRAMES);
    return `translate${axis}(${offset.toFixed(1)}px)`;
  };

  const steps = Array.from({ length: FRAMES }, (_, frame) => frame);

  return {
    incoming: [
      ...steps.map((frame) => ({
        offset: frame / FRAMES,
        clipPath: toClip(through(frame / (FRAMES - 1))),
        transform: jolt(frame, 18),
        easing: 'steps(1, end)',
      })),
      { offset: 1, clipPath: 'inset(0)', transform: 'none' },
    ],
    outgoing: [
      ...steps.map((frame) => ({
        offset: frame / FRAMES,
        transform: jolt(frame, 8),
        easing: 'steps(1, end)',
      })),
      { offset: 1, transform: 'none' },
    ],
  };
}

/**
 * Plays the glitch while `commit` swaps the theme, or just runs `commit`
 * when the browser cannot animate it.
 */
export function startThemeGlitch(commit) {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || typeof document.startViewTransition !== 'function') {
    commit();
    return;
  }

  // A transition is already running — apply immediately, no stacking.
  if (root.dataset.themeGlitch === '1') {
    commit();
    return;
  }

  let transition;
  try {
    transition = document.startViewTransition(commit);
  } catch {
    commit();
    return;
  }

  root.dataset.themeGlitch = '1';
  const done = () => { delete root.dataset.themeGlitch; };

  transition.ready
    .then(() => {
      const { incoming, outgoing } = buildFrames();
      root.animate(incoming, {
        duration: DURATION,
        pseudoElement: '::view-transition-new(root)',
      });
      root.animate(outgoing, {
        duration: DURATION,
        pseudoElement: '::view-transition-old(root)',
      });
    })
    .catch(done);

  transition.finished.then(done).catch(done);
}

/** True when the glitch will animate (used to pick the right fallback). */
export function canGlitchTheme() {
  return typeof document !== 'undefined'
    && typeof document.startViewTransition === 'function'
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
