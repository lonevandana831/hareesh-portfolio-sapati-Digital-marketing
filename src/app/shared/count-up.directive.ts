import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/**
 * Animates a number from 0 to its value when it scrolls into view.
 * Accepts a number, or a display string like '₹1.58L' / '2,800+' (the first number in it is animated;
 * strings without a single clean number, e.g. '18–34', are shown as-is).
 * With `focus`, it waits until the element reaches the middle of the screen and replays on every visit.
 */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  private resetObserver?: IntersectionObserver;
  private frame = 0;
  private done?: ReturnType<typeof setTimeout>;
  readonly appCountUp = input.required<number | string>();
  readonly duration = input(1800);
  readonly focus = input(false);

  private prefix = '';
  private suffix = '';
  private target = 0;
  private decimals = 0;
  private locale = 'en-IN';

  ngOnInit() {
    const node = this.el.nativeElement;
    const value = this.appCountUp();

    if (typeof value === 'number') {
      this.target = value;
      this.decimals = Number.isInteger(value) ? 0 : 1;
    } else {
      const m = value.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/);
      if (!m) {
        node.textContent = value;
        return;
      }
      [, this.prefix, , this.suffix] = m;
      this.target = parseFloat(m[2].replace(/,/g, ''));
      this.decimals = m[2].split('.')[1]?.length ?? 0;
      this.locale = 'en-US'; // keep the source's 1,234,567 grouping
    }

    node.textContent = this.format(this.target);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    node.textContent = this.format(0);

    if (!this.focus()) {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.observer?.disconnect();
          this.run();
        },
        { threshold: 0.4 },
      );
      this.observer.observe(node);
      return;
    }

    // focus: count when the number reaches the middle band of the screen;
    // reset once it has fully left the screen so the next visit replays it
    let armed = true;
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && armed) {
          armed = false;
          this.run();
        }
      },
      { rootMargin: '-30% 0px -30% 0px' },
    );
    this.resetObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting || armed) return;
      armed = true;
      this.stop();
      node.textContent = this.format(0);
    });
    this.observer.observe(node);
    this.resetObserver.observe(node);
  }

  private run() {
    const node = this.el.nativeElement;
    this.stop();
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / this.duration(), 1);
      const eased = 1 - Math.pow(1 - t, 4);
      node.textContent = this.format(this.target * eased);
      if (t < 1) this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
    // Guarantee the final value even if animation frames are throttled.
    this.done = setTimeout(() => (node.textContent = this.format(this.target)), this.duration() + 100);
  }

  private stop() {
    cancelAnimationFrame(this.frame);
    clearTimeout(this.done);
  }

  private format(n: number) {
    const num = n.toLocaleString(this.locale, {
      minimumFractionDigits: this.decimals,
      maximumFractionDigits: this.decimals,
    });
    return this.prefix + num + this.suffix;
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.resetObserver?.disconnect();
    this.stop();
  }
}
