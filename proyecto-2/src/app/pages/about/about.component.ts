import { Component } from '@angular/core';
import { CharactersNavbarComponent } from '../../components/shared/navbars/characters-navbar/characters-navbar.component';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { SplitterModule } from 'primeng/splitter';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CharactersNavbarComponent,
    ButtonModule,
    StepperModule,
    SplitterModule,
    TabViewModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
