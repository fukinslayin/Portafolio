import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input() item!: Character;
  @Input() getImageUrl!: (item: Character) => string;
}
