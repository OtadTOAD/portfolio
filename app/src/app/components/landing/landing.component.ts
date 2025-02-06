import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-landing',
  imports: [CardModule, TranslatePipe],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
