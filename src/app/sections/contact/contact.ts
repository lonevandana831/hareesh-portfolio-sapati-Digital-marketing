import { Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { profile } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  imports: [Icon, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly profile = profile;
  protected readonly year = new Date().getFullYear();
  protected readonly whatsapp = `https://wa.me/${profile.phoneRaw}?text=${encodeURIComponent(
    `Hi ${profile.firstName}, I saw your portfolio and would like to connect.`,
  )}`;
}
