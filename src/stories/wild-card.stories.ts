import { storiesOf, moduleMetadata } from '@storybook/angular';
import { blueRents, greenRents } from 'src/app/data/rents';
import { Color } from 'src/app/enums/color.enum';
import { CardComponent } from 'src/app/components/card/card.component';
import { CardActionsComponent } from 'src/app/components/card-actions/card-actions.component';
import { CardType } from 'src/app/enums/card-type.enum';
import { Player } from 'src/app/models/player.model';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { Card } from 'src/app/models/card.model';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropertyCardComponent } from 'src/app/components/property-card/property-card.component';
import { RentCardComponent } from 'src/app/components/rent-card/rent-card.component';
import { CurrencyCardComponent } from 'src/app/components/currency-card/currency-card.component';
import { ActionCardComponent } from 'src/app/components/action-card/action-card.component';
import { WildCardComponent } from 'src/app/components/wild-card/wild-card.component';
import '../assets/styles/index.scss';

const players: Player[] = [
  {
    id: 1,
    name: 'Kevin',
    hand: [],
    land: [[]],
    bank: [],
    unAssigned: []
  },
  {
    id: 2,
    name: 'Helen',
    hand: [],
    land: [[]],
    bank: [],
    unAssigned: []
  }
];

const card: Card = {
  id: 1,
  name: 'Wild Card',
  value: 4,
  type: CardType.WILD,
  property: [
    {
      color: Color.GREEN,
      rents: greenRents
    },
    {
      color: Color.BLUE,
      rents: blueRents
    }
  ]
};

const activePlayer: Player = players[0];
const cardLocation: CardLocation = CardLocation.HAND;
const lotsAvailable: Card[][] = [[], []];

storiesOf('Wild Card', module)
  .addDecorator(
    moduleMetadata({
      declarations: [CardActionsComponent, PropertyCardComponent, CurrencyCardComponent, ActionCardComponent, RentCardComponent, WildCardComponent],
      imports: [MaterialModule, BrowserAnimationsModule]
    })
  )
  .add('Hand', () => ({
    component: CardComponent,
    props: {
      card,
      activePlayer,
      players,
      cardLocation,
      lotsAvailable
    }
  }))
  .add('Land', () => ({
    component: CardComponent,
    props: {
      card,
      activePlayer,
      players,
      cardLocation: CardLocation.LAND,
      lotsAvailable
    }
  }))
  .add('Trash', () => ({
    component: CardComponent,
    props: {
      card,
      activePlayer,
      players,
      cardLocation: CardLocation.TRASH,
      lotsAvailable
    }
  }))
  .add('Opponent', () => ({
    component: CardComponent,
    props: {
      card,
      activePlayer,
      players,
      cardLocation: CardLocation.OPPONENT,
      lotsAvailable
    }
  }))
  .add('Unassigned', () => ({
    component: CardComponent,
    props: {
      card,
      activePlayer,
      players,
      cardLocation: CardLocation.UNASSIGNED,
      lotsAvailable
    }
  }))
  .add('Bank', () => ({
    component: CardComponent,
    props: {
      card,
      activePlayer,
      players,
      cardLocation: CardLocation.BANK,
      lotsAvailable
    }
  }));
