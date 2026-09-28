import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { experience } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  protected readonly roles = experience;
}
