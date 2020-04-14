import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property, Card } from 'src/app/models/card.model';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardAction } from 'src/app/enums/card-action.enum';
import { CardType } from 'src/app/enums/card-type.enum';

@Component({
  selector: 'or-wild-card',
  templateUrl: './wild-card.component.html',
  styleUrls: ['./wild-card.component.scss']
})
export class WildCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() properties: Property[] = [];
  @Input() cardLocation: CardLocation;
  @Input() lots: number;
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  @Output() updatePropertyOrder: EventEmitter<Property> = new EventEmitter<Property>();
  @Output() setProperty: EventEmitter<number> = new EventEmitter<number>();
  propertyIsSet = false;
  cardType: CardType = CardType.WILD;

  constructor() {}

  ngOnInit(): void {}

  emitCardAction(action: CardAction) {
    this.cardAction.emit(action);
  }

  setPrimaryProperty(property: Property) {
    this.updatePropertyOrder.emit(property);
  }

  setPropertyHandler(lotNumber: number) {
    this.setProperty.emit(lotNumber);
  }

  get propertyClass(): string {
    let propertyClass = '';

    if (this.properties.length > 2) {
      propertyClass = `property-title-container-rainbow`;
    } else if (this.properties[0] && this.properties[0].color) {
      propertyClass = `property-title-container-${this.properties[0].color}`;
    }
    return propertyClass;
  }

  get propertyClassReverse(): string {
    let propertyClass = '';

    if (this.properties[1] && this.properties[1].color) {
      propertyClass = `property-title-container-${this.properties[1].color}`;
    }
    return propertyClass;
  }
}
