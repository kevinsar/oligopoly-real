import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from 'src/app/models/card.model';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardAction } from 'src/app/enums/card-action.enum';
import { CardType } from 'src/app/enums/card-type.enum';

@Component({
  selector: 'or-wild-card',
  templateUrl: './wild-card.component.html',
  styleUrls: ['./wild-card.component.scss'],
})
export class WildCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() properties: Property[] = [];
  @Input() cardLocation: CardLocation;
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  cardType: CardType = CardType.WILD;

  constructor() {}

  ngOnInit(): void {}

  emitCardAction(action: CardAction) {
    this.cardAction.emit(action);
  }

  flipCard() {
    this.properties.reverse();
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
