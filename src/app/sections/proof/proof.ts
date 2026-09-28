import { Component, computed, inject, signal } from '@angular/core';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { LightboxService } from '../../shared/lightbox.service';
import { proofs } from '../../data/portfolio.data';

// Grid tracks each card layout spans on desktop (must match proof.scss)
const SPAN = { normal: 4, wide: 8, strip: 4 };

@Component({
  selector: 'app-proof',
  imports: [Icon, RevealDirective],
  templateUrl: './proof.html',
  styleUrl: './proof.scss',
})
export class ProofWall {
  private readonly lightbox = inject(LightboxService);
  protected readonly filters = ['All', ...new Set(proofs.map(p => p.category))];
  protected readonly filter = signal('All');
  protected readonly visible = computed(() =>
    this.filter() === 'All' ? proofs : proofs.filter(p => p.category === this.filter()),
  );

  /**
   * Desktop grid is 12 tracks: normal and strip cards take 4 (3 per row), wide takes 8.
   * If the last row isn't full, its first card gets a start column so the row sits centred.
   */
  protected readonly centreStart = computed(() => {
    const cards = this.visible();
    let used = 0;
    let rowStart = 0;
    cards.forEach((p, i) => {
      const span = SPAN[p.layout ?? 'normal'];
      if (used + span > 12) {
        used = 0;
        rowStart = i;
      }
      used += span;
    });
    return used < 12 ? { index: rowStart, col: Math.floor((12 - used) / 2) + 1 } : null;
  });

  open(i: number) {
    this.lightbox.open(this.visible(), i);
  }
}
