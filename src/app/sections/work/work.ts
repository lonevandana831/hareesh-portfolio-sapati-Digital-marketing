import { Component, inject } from '@angular/core';
import { Icon } from '../../shared/icon';
import { CountUpDirective } from '../../shared/count-up.directive';
import { RevealDirective } from '../../shared/reveal.directive';
import { LightboxService } from '../../shared/lightbox.service';
import { branding, caseStudies } from '../../data/portfolio.data';

@Component({
  selector: 'app-work',
  imports: [Icon, CountUpDirective, RevealDirective],
  templateUrl: './work.html',
  styleUrl: './work.scss',
})
export class Work {
  protected readonly lightbox = inject(LightboxService);
  protected readonly cases = caseStudies;
  protected readonly branding = branding;

  openBrand(i: number) {
    const items = branding.map((b) => ({ image: b.image, title: b.brand, highlight: b.industry, caption: b.note }));
    this.lightbox.open(items, i);
  }
}
