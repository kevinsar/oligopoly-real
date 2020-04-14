import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Color } from 'src/app/enums/color.enum';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardAction } from 'src/app/enums/card-action.enum';
import { CardType } from 'src/app/enums/card-type.enum';

@Component({
  selector: 'or-rent-card',
  templateUrl: './rent-card.component.html',
  styleUrls: ['./rent-card.component.scss'],
})
export class RentCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() rentColors: Color[];
  @Input() cardLocation: CardLocation;
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  cardType: CardType = CardType.RENT;

  constructor() {}

  ngOnInit(): void {}

  emitCardAction(action: CardAction) {
    this.cardAction.emit(action);
  }
}
