import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property, Card } from 'src/app/models/card.model';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardType } from 'src/app/enums/card-type.enum';
import { CardAction } from 'src/app/enums/card-action.enum';

@Component({
  selector: 'or-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() properties: Property[] = [];
  @Input() cardLocation: CardLocation;
  @Input() lots: number;
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  @Output() setProperty: EventEmitter<number> = new EventEmitter<number>();
  cardType: CardType = CardType.PROPERTY;

  constructor() {}

  ngOnInit(): void {}

  emitCardAction(action: CardAction) {
    this.cardAction.emit(action);
  }

  setPropertyHandler(lotNumber: number) {
    this.setProperty.emit(lotNumber);
  }

  get propertyClass(): string {
    let propertyClass = '';

    if (this.properties[0] && this.properties[0].color) {
      propertyClass = `property-title-container-${this.properties[0].color}`;
    }
    return propertyClass;
  }
}
