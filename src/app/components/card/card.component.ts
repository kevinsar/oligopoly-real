import { Component, OnInit, Input } from '@angular/core';
import { CardType } from 'src/app/enums/card-type.enum';
import { Property } from 'src/app/models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() type: CardType;
  @Input() description: string;
  @Input() properties: Property[];

  constructor() {}

  ngOnInit(): void {
    console.log('hello!')
  }
}
