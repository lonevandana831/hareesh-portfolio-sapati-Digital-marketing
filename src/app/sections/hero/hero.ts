import { Component, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { Icon } from '../../shared/icon';
import { CountUpDirective } from '../../shared/count-up.directive';
import { dashboard, heroStats, profile } from '../../data/portfolio.data';

const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)';
const GLYPHS = '₹$%#@*+0123456789';

const split = (w: string) => [...w];

@Component({
  selector: 'app-hero',
  imports: [Icon, CountUpDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = profile;
  protected readonly stats = heroStats;
  protected readonly dashboard = dashboard;

  // Dashboard chart: hovered/focused bar drives the tooltip and the big number
  protected readonly barMax = Math.max(...dashboard.bars.map((b) => b.value));
  protected readonly barTotal = dashboard.bars.reduce((sum, b) => sum + b.value, 0);
  protected readonly active = signal<number | null>(null);
  protected readonly activeBar = computed(() => {
    const i = this.active();
    return i === null ? null : dashboard.bars[i];
  });

  // Headline words, pre-split into letters for the per-character animation
  protected readonly t = {
    I: split('I'),
    turn: split('turn'),
    ad: split('ad'),
    spend: split('spend'),
    into: split('into'),
    conv: split('conversations'),
    leads: split('leads'),
    cust: split('customers.'),
  };

  // Headline stays hidden until the first frame so letters don't flash before animating
  protected readonly pending = signal(true);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => this.play());
  }

  private play() {
    const root = this.host.nativeElement;
    const h1 = root.querySelector('h1')!;
    const q = (sel: string) => Array.from(h1.querySelectorAll<HTMLElement>(sel));

    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !h1.animate) {
      this.pending.set(false);
      return;
    }

    // 1. "I turn" — letters flip up out of a blur
    this.flip(q('.g-a .c'), 150);

    // 2. "ad spend" — flips in while scrambling through currency glyphs, then gets underlined
    const spend = q('.g-spend .c');
    this.flip(spend, 330, 40);
    this.scramble(spend, 330, 45);
    h1.querySelector('.squiggle path')!.animate(
      [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
      { duration: 700, delay: 1000, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'backwards' },
    );

    // 3. "into"
    this.flip(q('.g-b .c'), 640);

    // 4. The conversion — ₹ coins arc from "ad spend" into "conversations"
    const wipe = h1.querySelector<HTMLElement>('.wipe')!;
    setTimeout(() => this.coins(h1.querySelector('.g-spend')!, wipe, root.querySelector('.copy')!), 1050);

    // 5. "conversations" — orange bar sweeps across as the coins land, word pops out
    wipe.querySelector('.bar')!.animate(
      [
        { transform: 'scaleX(0)', transformOrigin: 'left' },
        { transform: 'scaleX(1)', transformOrigin: 'left', offset: 0.5 },
        { transform: 'scaleX(1)', transformOrigin: 'right', offset: 0.501 },
        { transform: 'scaleX(0)', transformOrigin: 'right' },
      ],
      { duration: 900, delay: 1400, easing: 'cubic-bezier(0.77, 0, 0.18, 1)', fill: 'both' },
    );
    q('.wipe .c').forEach((el, i) =>
      el.animate(
        [{ opacity: 0, transform: 'translateY(0.25em)' }, { opacity: 1, transform: 'none' }],
        { duration: 420, delay: 1850 + i * 14, easing: EASE, fill: 'backwards' },
      ),
    );
    wipe.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.07)', offset: 0.35 }, { transform: 'scale(1)' }],
      { duration: 600, delay: 1950, easing: 'ease-out' },
    );

    // 6. ", leads & customers." — "&" spins into place
    this.flip(q('.comma, .g-leads .c'), 1950);
    q('.amp').forEach((el) =>
      el.animate(
        [{ opacity: 0, transform: 'scale(0) rotate(-220deg)' }, { opacity: 1, transform: 'none' }],
        { duration: 900, delay: 2050, easing: EASE, fill: 'backwards' },
      ),
    );
    this.flip(q('.g-d .c'), 2150);

    // 7. Chain reaction — a wave of energy ripples from "conversations" through "leads & customers."
    q('.wipe .c, .comma, .g-leads .c, .amp, .g-d .c').forEach((el, i) =>
      el.animate(
        [
          { transform: 'none' },
          { transform: 'translateY(-0.14em) scale(1.08)', color: 'var(--accent)', offset: 0.35 },
          { transform: 'none' },
        ],
        { duration: 520, delay: 3050 + i * 32, easing: 'ease-out' },
      ),
    );

    this.pending.set(false);

    // 8. Once the intro has played, letters near the cursor lift towards it
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setTimeout(() => this.magnet(h1, q('.c')), 3800);
    }
  }

  /** Letters within reach of the cursor lift, tilt away from it and light up. */
  private magnet(h1: HTMLElement, letters: HTMLElement[]) {
    const REACH = 150;
    let centres: { x: number; y: number }[] = [];
    let px = 0;
    let py = 0;
    let queued = false;

    const measure = () => {
      centres = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };

    const render = () => {
      queued = false;
      letters.forEach((el, i) => {
        const dx = centres[i].x - px;
        const dy = centres[i].y - py;
        const f = Math.max(0, 1 - Math.hypot(dx, dy) / REACH);
        el.style.transform = f
          ? `translateY(${(-0.2 * f).toFixed(3)}em) rotate(${((dx / REACH) * 10 * f).toFixed(2)}deg) scale(${(1 + 0.1 * f).toFixed(3)})`
          : '';
        el.classList.toggle('near', f > 0.45);
      });
    };

    h1.addEventListener('pointerenter', measure);
    h1.addEventListener('pointermove', (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!centres.length) measure();
      if (!queued) {
        queued = true;
        requestAnimationFrame(render);
      }
    });
    h1.addEventListener('pointerleave', () => {
      centres = [];
      letters.forEach((el) => {
        el.style.transform = '';
        el.classList.remove('near');
      });
    });
    addEventListener('scroll', () => (centres = []), { passive: true });
  }

  /** 3D flip-up with blur, staggered per letter. fill: backwards so CSS hover works afterwards. */
  private flip(els: HTMLElement[], start: number, step = 28) {
    els.forEach((el, i) =>
      el.animate(
        [
          { opacity: 0, transform: 'perspective(600px) translateY(0.45em) rotateX(-95deg)', filter: 'blur(6px)' },
          { opacity: 1, transform: 'none', filter: 'blur(0)' },
        ],
        { duration: 800, delay: start + i * step, easing: EASE, fill: 'backwards' },
      ),
    );
  }

  /** Overlays random currency glyphs (via data-g + CSS ::after) until each letter settles. */
  private scramble(els: HTMLElement[], start: number, step: number) {
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = now - t0;
      let done = true;
      els.forEach((el, i) => {
        if (t < start + 420 + i * step) {
          done = false;
          el.dataset['g'] = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        } else {
          delete el.dataset['g'];
        }
      });
      if (!done) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /** Fires ₹ coins along curved paths from one element to another. */
  private coins(from: Element, to: Element, container: HTMLElement) {
    const c = container.getBoundingClientRect();
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    const size = Math.max(14, Math.min(26, a.height * 0.32));

    for (let i = 0; i < 9; i++) {
      const coin = document.createElement('span');
      coin.textContent = '₹';
      coin.setAttribute('aria-hidden', 'true');
      Object.assign(coin.style, {
        position: 'absolute',
        left: '0',
        top: '0',
        font: `700 ${size}px var(--font-display)`,
        color: 'var(--accent)',
        pointerEvents: 'none',
        zIndex: '2',
        willChange: 'transform, opacity',
      });
      container.appendChild(coin);

      const x0 = a.left - c.left + a.width * (0.1 + Math.random() * 0.8);
      const y0 = a.top - c.top + a.height * 0.45;
      const x1 = b.left - c.left + b.width * (0.08 + Math.random() * 0.84);
      const y1 = b.top - c.top + b.height * 0.5;
      const cx = (x0 + x1) / 2 + (Math.random() - 0.5) * 80;
      const cy = Math.min(y0, y1) - 70 - Math.random() * 90;
      const spin = (Math.random() - 0.5) * 540;

      // Sample a quadratic Bézier so the coin travels in a smooth arc
      const frames: Keyframe[] = [];
      for (let s = 0; s <= 10; s++) {
        const u = s / 10;
        const x = (1 - u) ** 2 * x0 + 2 * (1 - u) * u * cx + u ** 2 * x1;
        const y = (1 - u) ** 2 * y0 + 2 * (1 - u) * u * cy + u ** 2 * y1;
        const scale = u < 0.5 ? 0.4 + u * 1.4 : 1.1 - (u - 0.5) * 1.4;
        frames.push({
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${spin * u}deg) scale(${scale})`,
          opacity: u === 0 || u === 1 ? 0 : 1,
        });
      }

      coin
        .animate(frames, { duration: 620 + Math.random() * 180, delay: i * 38, easing: 'cubic-bezier(0.45, 0, 0.25, 1)', fill: 'both' })
        .finished.then(() => coin.remove());
    }
  }
}
