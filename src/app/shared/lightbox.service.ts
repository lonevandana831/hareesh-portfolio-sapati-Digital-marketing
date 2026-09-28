import { Injectable, computed, signal } from '@angular/core';
import { Proof, proofs } from '../data/portfolio.data';

/** Anything the viewer can show: proof screenshots, branding feeds, … */
export type LightboxItem = Pick<Proof, 'image' | 'title' | 'highlight' | 'caption'>;

/** Shared state for the full-screen screenshot viewer. */
@Injectable({ providedIn: 'root' })
export class LightboxService {
  private readonly items = signal<LightboxItem[]>(proofs);
  readonly index = signal<number | null>(null);
  readonly current = computed(() => {
    const i = this.index();
    return i === null ? null : this.items()[i];
  });
  readonly count = computed(() => this.items().length);

  open(list: LightboxItem[], i: number) {
    this.items.set(list);
    this.index.set(i);
  }

  openById(id: string) {
    this.items.set(proofs);
    this.index.set(Math.max(0, proofs.findIndex(p => p.id === id)));
  }

  close() {
    this.index.set(null);
  }

  step(delta: number) {
    const i = this.index();
    if (i === null) return;
    const n = this.items().length;
    this.index.set((i + delta + n) % n);
  }
}
