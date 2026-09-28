import { Component, HostListener, effect, inject } from '@angular/core';
import { Icon } from './icon';
import { LightboxService } from './lightbox.service';

@Component({
  selector: 'app-lightbox',
  imports: [Icon],
  template: `
    @if (lb.current(); as p) {
      <div class="backdrop" (click)="lb.close()" role="dialog" aria-modal="true" [attr.aria-label]="p.title">
        <figure (click)="$event.stopPropagation()">
          <div class="frame"><img [src]="p.image" [alt]="p.title" /></div>
          <figcaption>
            <div>
              <span class="hl">{{ p.highlight }}</span>
              <strong>{{ p.title }}</strong>
              <p>{{ p.caption }}</p>
            </div>
            <span class="count">{{ lb.index()! + 1 }} / {{ lb.count() }}</span>
          </figcaption>
        </figure>
        <button class="ctrl close" type="button" (click)="lb.close()" aria-label="Close"><app-icon name="close" /></button>
        @if (lb.count() > 1) {
          <button class="ctrl prev" type="button" (click)="$event.stopPropagation(); lb.step(-1)" aria-label="Previous"><app-icon name="left" /></button>
          <button class="ctrl next" type="button" (click)="$event.stopPropagation(); lb.step(1)" aria-label="Next"><app-icon name="right" /></button>
        }
      </div>
    }
  `,
  styles: `
    .backdrop {
      position: fixed; inset: 0; z-index: 100;
      display: grid; place-items: center;
      padding: calc(64px + env(safe-area-inset-top, 0px)) 16px calc(24px + env(safe-area-inset-bottom, 0px));
      background: rgba(8, 7, 6, 0.92); backdrop-filter: blur(8px);
      animation: fade 0.25s ease both;
    }
    figure { margin: 0; width: min(1200px, 100%); display: grid; gap: 16px; animation: pop 0.35s var(--ease) both; }
    .frame { overflow: auto; max-height: 68vh; border-radius: 14px; background: #fff; border: 1px solid var(--line); }
    img { width: 100%; height: auto; }
    figcaption { display: flex; justify-content: space-between; gap: 20px; align-items: flex-start; }
    figcaption div { display: grid; gap: 4px; }
    .hl { font-family: var(--font-mono); font-size: 13px; color: var(--accent); text-transform: uppercase; letter-spacing: .08em; }
    strong { font-family: var(--font-display); font-size: 22px; }
    p { color: var(--muted); font-size: 15px; max-width: 720px; }
    .count { font-family: var(--font-mono); font-size: 13px; color: var(--faint); white-space: nowrap; }
    .ctrl {
      position: absolute; display: grid; place-items: center;
      width: 48px; height: 48px; border-radius: 50%; font-size: 22px;
      background: var(--surface-2); border: 1px solid var(--line-strong);
      transition: background .2s;
    }
    .ctrl:hover { background: var(--accent); color: var(--bg); }
    .close { top: calc(12px + env(safe-area-inset-top, 0px)); right: 16px; }
    .prev { left: 16px; top: 50%; translate: 0 -50%; }
    .next { right: 16px; top: 50%; translate: 0 -50%; }
    @media (max-width: 1320px) {
      .prev, .next { top: auto; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); translate: none; }
      .backdrop { padding-bottom: calc(84px + env(safe-area-inset-bottom, 0px)); }
    }
    @keyframes fade { from { opacity: 0; } }
    @keyframes pop { from { opacity: 0; transform: scale(.96); } }
  `,
})
export class Lightbox {
  protected readonly lb = inject(LightboxService);

  constructor() {
    // Lock page scroll while the viewer is open.
    effect(() => {
      document.body.style.overflow = this.lb.current() ? 'hidden' : '';
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (!this.lb.current()) return;
    if (e.key === 'Escape') this.lb.close();
    if (e.key === 'ArrowRight') this.lb.step(1);
    if (e.key === 'ArrowLeft') this.lb.step(-1);
  }
}
