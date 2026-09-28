import { Component } from '@angular/core';
import { Nav } from './sections/nav/nav';
import { Hero } from './sections/hero/hero';
import { Impact } from './sections/impact/impact';
import { Brands } from './sections/brands/brands';
import { Work } from './sections/work/work';
import { ProofWall } from './sections/proof/proof';
import { Experience } from './sections/experience/experience';
import { Skills } from './sections/skills/skills';
import { Contact } from './sections/contact/contact';
import { Lightbox } from './shared/lightbox';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, Impact, Brands, Work, ProofWall, Experience, Skills, Contact, Lightbox],
  template: `
    <app-nav />
    <main>
      <app-hero />
      <app-brands />
      <app-impact />
      <app-work />
      <app-proof />
      <app-experience />
      <app-skills />
      <app-contact />
    </main>
    <app-lightbox />
  `,
})
export class App {}
