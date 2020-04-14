import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardType } from 'src/app/enums/card-type.enum';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardAction } from 'src/app/enums/card-action.enum';
import { Property } from 'src/app/models/card.model';

@Component({
  selector: 'or-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss'],
})
export class CardActionsComponent implements OnInit {
  @Input() cardType: CardType;
  @Input() cardLocation: CardLocation;
  @Input() isHouse: boolean;
  @Input() fullSetExists: boolean;
  @Input() properties: Property;
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  CardType = CardType;
  CardAction = CardAction;
  
  constructor() {}

  ngOnInit(): void {}

  get canAddToProperty() {
    return this.cardType === CardType.PROPERTY || (this.isHouse && this.fullSetExists);
  }

  actionHandler(action: CardAction) {
    this.cardAction.emit(action);
  }
}
