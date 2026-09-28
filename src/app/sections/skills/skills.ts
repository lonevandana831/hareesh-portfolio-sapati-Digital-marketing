import { Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { education, skillGroups, tools } from '../../data/portfolio.data';

@Component({
  selector: 'app-skills',
  imports: [Icon, RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly groups = skillGroups;
  protected readonly tools = tools;
  protected readonly education = education;
}
