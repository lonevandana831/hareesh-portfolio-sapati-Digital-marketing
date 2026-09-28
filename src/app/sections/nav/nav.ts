import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { Icon } from '../../shared/icon';
import { profile } from '../../data/portfolio.data';

@Component({
  selector: 'app-nav',
  imports: [Icon],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements OnInit, OnDestroy {
  protected readonly profile = profile;
  protected readonly links = [
    { id: 'work', label: 'Work' },
    { id: 'proof', label: 'Results' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];
  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);
  protected readonly active = signal('');
  private observer?: IntersectionObserver;

  ngOnInit() {
    this.observer = new IntersectionObserver(
      entries => {
        for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    // Sections render after the nav, so wait a tick before observing them.
    setTimeout(() => this.links.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) this.observer!.observe(el);
    }));
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 24);
  }

  @HostListener('document:keydown.escape')
  close() {
    this.open.set(false);
  }

  toggle() {
    this.open.update(v => !v);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
