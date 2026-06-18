import { Component } from '@angular/core';

import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { FeatureComponent } from '../feature/feature.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    FeatureComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}