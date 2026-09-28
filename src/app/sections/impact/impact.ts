import { Component } from '@angular/core';
import { CountUpDirective } from '../../shared/count-up.directive';
import { RevealDirective } from '../../shared/reveal.directive';
import { impactStats, process, profile } from '../../data/portfolio.data';

@Component({
  selector: 'app-impact',
  imports: [CountUpDirective, RevealDirective],
  templateUrl: './impact.html',
  styleUrl: './impact.scss',
})
export class Impact {
  protected readonly profile = profile;
  protected readonly stats = impactStats;
  protected readonly steps = process;

  protected readonly leadLabel = profile.about.lead.replace(/\*/g, '');

  // Lead line split into words for the staggered reveal; *word* marks a highlight
  protected readonly leadWords = profile.about.lead.split(' ').map((w) => {
    const m = w.match(/^\*(.+?)\*(\W*)$/);
    return m ? { text: m[1], tail: m[2], hl: true } : { text: w, tail: '', hl: false };
  });
}
