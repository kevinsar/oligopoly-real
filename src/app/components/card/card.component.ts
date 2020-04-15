import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property, Card } from 'src/app/models/card.model';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardAction } from 'src/app/enums/card-action.enum';

@Component({
  selector: 'or-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() cardLocation: CardLocation = CardLocation.TRASH;
  @Input() lotsAvailable: Card[][] = [];

  @Output() updatePropertyOrder: EventEmitter<Property> = new EventEmitter<Property>();
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  @Output() setProperty: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  emitCardAction(action: CardAction) {
    this.cardAction.emit(action);
  }

  setPropertyHandler(lotNumber: number) {
    this.setProperty.emit(lotNumber);
  }

  setPrimaryProperty(property: Property) {
    this.updatePropertyOrder.emit(property);
  }
}
