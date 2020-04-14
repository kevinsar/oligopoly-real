import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardType } from 'src/app/enums/card-type.enum';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { Card } from 'src/app/models/card.model';
import { CardAction } from 'src/app/enums/card-action.enum';

@Component({
  selector: 'or-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
})
export class CurrencyCardComponent implements OnInit {
  CardType = CardType;
  @Input() name: string;
  @Input() value: number;
  @Input() cardLocation: CardLocation;
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  cardType: CardType = CardType.CURRENCY;

  constructor() {}

  ngOnInit(): void {}
  
  emitCardAction(action: CardAction) {
    this.cardAction.emit(action);
  }
}
