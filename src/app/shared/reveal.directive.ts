import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/** Fades an element up into view the first time it scrolls into the viewport. */
@Directive({ selector: '[appReveal]', host: { class: 'reveal' } })
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  readonly revealDelay = input(0);

  ngOnInit() {
    const node = this.el.nativeElement;
    node.style.transitionDelay = `${this.revealDelay()}ms`;
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    this.observer.observe(node);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
