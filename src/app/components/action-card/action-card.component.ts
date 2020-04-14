import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardAction } from 'src/app/enums/card-action.enum';
import { CardType } from 'src/app/enums/card-type.enum';

@Component({
  selector: 'or-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() description: string;
  @Input() cardLocation: CardLocation;
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  cardType: CardType = CardType.ACTION;

  constructor() {}

  ngOnInit(): void {}
  
  emitCardAction(action: CardAction) {
    this.cardAction.emit(action);
  }
}
