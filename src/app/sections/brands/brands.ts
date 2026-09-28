import { Component } from '@angular/core';
import { brands, clientNames } from '../../data/portfolio.data';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
})
export class Brands {
  protected readonly brands = brands;
  // Duplicated so the marquee loops seamlessly.
  protected readonly names = [...clientNames, ...clientNames];
}
