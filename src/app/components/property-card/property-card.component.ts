import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from 'src/app/models/card.model';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardType } from 'src/app/enums/card-type.enum';
import { CardAction } from 'src/app/enums/card-action.enum';

@Component({
  selector: 'or-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
})
export class PropertyCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() properties: Property[] = [];
  @Input() cardLocation: CardLocation;
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  cardType: CardType = CardType.PROPERTY;

  constructor() {}

  ngOnInit(): void {}

  emitCardAction(action: CardAction) {
    this.cardAction.emit(action);
  }

  get propertyClass(): string {
    let propertyClass = '';

    if (this.properties[0] && this.properties[0].color) {
      propertyClass = `property-title-container-${this.properties[0].color}`;
    }
    return propertyClass;
  }
}
