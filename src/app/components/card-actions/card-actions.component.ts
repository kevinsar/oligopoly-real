import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { CardType } from 'src/app/enums/card-type.enum';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardAction } from 'src/app/enums/card-action.enum';
import { Property, Card } from 'src/app/models/card.model';
import { Color } from 'src/app/enums/color.enum';
import { GameState } from 'src/app/models/game-state.model';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'or-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss']
})
export class CardActionsComponent implements OnInit, OnChanges {
  @Input() players: Player[];
  @Input() activePlayer: Player;

  @Input() cardType: CardType;
  @Input() cardLocation: CardLocation;
  @Input() isHouse: boolean;
  @Input() fullSetExists = true;
  @Input() properties: Property[] = [];
  @Input() lots: Card[][] = [];
  @Output() cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();
  @Output() setColor: EventEmitter<Property> = new EventEmitter<Property>();
  @Output() setProperty: EventEmitter<number> = new EventEmitter<number>();
  @Output() payPlayer: EventEmitter<{ player: Player; cardLocation: CardLocation }> = new EventEmitter<{
    player: Player;
    cardLocation: CardLocation;
  }>();
  CardType = CardType;
  CardAction = CardAction;
  lotsMenu: any[] = new Array(5);
  payablePlayers: Player[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.lots) {
      this.lotsMenu = new Array((this.lots || []).length).map(() => {
        return 1;
      });
    }
    if (changes.players) {
      this.payablePlayers = (this.players || []).filter(player => {
        return player.id !== this.activePlayer.id;
      });
    }
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

  payPlayerHandler(player: Player, cardLocation: CardLocation) {
    this.payPlayer.emit({ player, cardLocation });
  }

  get setWhite() {
    return this.properties && this.properties[0] && (this.properties[0].color === Color.BLACK || this.properties.length > 2);
  }

  get canAddToProperty() {
    return (
      (this.cardLocation === CardLocation.UNASSIGNED || this.cardLocation === CardLocation.HAND) &&
      (this.cardType === CardType.PROPERTY || this.cardType === CardType.WILD || (this.isHouse && this.fullSetExists))
    );
  }

  get canChangeColor() {
    return this.cardType === CardType.PROPERTY || this.cardType === CardType.WILD;
  }
}
