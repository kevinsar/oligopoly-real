import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { CardType } from 'src/app/enums/card-type.enum';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardAction } from 'src/app/enums/card-action.enum';
import { Property } from 'src/app/models/card.model';
import { Color } from 'src/app/enums/color.enum';

@Component({
  selector: 'or-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss']
})
export class CardActionsComponent implements OnInit, OnChanges {
  @Input() cardType: CardType;
  @Input() cardLocation: CardLocation;
  @Input() isHouse: boolean;
  @Input() fullSetExists: boolean;
  @Input() properties: Property[] = [];
  @Input() lots = 5;
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  @Output() setColor: EventEmitter<Property> = new EventEmitter<Property>();
  @Output() setProperty: EventEmitter<number> = new EventEmitter<number>();
  CardType = CardType;
  CardAction = CardAction;
  lotsMenu: any[] = new Array(5);

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.lots) {
      this.lotsMenu = new Array(changes.lots.currentValue).map(() => {
        return 1;
      });
      console.log(this.lotsMenu);
    }
  }

  get canAddToProperty() {
    return this.cardType === CardType.PROPERTY || this.cardType === CardType.WILD || (this.isHouse && this.fullSetExists);
  }

  actionHandler(action: CardAction) {
    this.cardAction.emit(action);
  }

  colorChangeHandler(property: Property) {
    this.setColor.emit(property);
  }

  setPropertyHandler(lot: number) {
    this.setProperty.emit(lot);
  }

  get setWhite() {
    return this.properties && this.properties[0] && (this.properties[0].color === Color.BLACK || this.properties.length > 2);
  }
}
