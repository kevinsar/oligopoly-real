import { Card } from '../models/card.model';
import { CardType } from '../enums/card-type.enum';
import {
  brownRents,
  blueRents,
  greenRents,
  lightBlueRents,
  orangeRents,
  purpleRents,
  blackRents,
  redRents,
  lightGreenRents,
  yellowRents,
} from './rents';
import { Color } from '../enums/color.enum';

const propertyCards: Card[] = [
  {
    name: 'Baltic Avenue',
    value: 1,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BROWN,
        rents: brownRents,
      },
    ],
  },
  {
    name: 'Mediterranean Avenue',
    value: 1,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BROWN,
        rents: brownRents,
      },
    ],
  },
  {
    name: 'Boardwalk',
    value: 4,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLUE,
        rents: blueRents,
      },
    ],
  },
  {
    name: 'Park Place',
    value: 4,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLUE,
        rents: blueRents,
      },
    ],
  },
  {
    name: 'North Carolina Avenue',
    value: 4,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.GREEN,
        rents: greenRents,
      },
    ],
  },
  {
    name: 'Pacific Avenue',
    value: 4,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.GREEN,
        rents: greenRents,
      },
    ],
  },
  {
    name: 'Pennsylvania Avenue',
    value: 4,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.GREEN,
        rents: greenRents,
      },
    ],
  },
  {
    name: 'Connecticut Avenue',
    value: 1,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.LIGHT_BLUE,
        rents: lightBlueRents,
      },
    ],
  },
  {
    name: 'Oriental Avenue',
    value: 1,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.LIGHT_BLUE,
        rents: lightBlueRents,
      },
    ],
  },
  {
    name: 'Vermont Avenue',
    value: 1,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.LIGHT_BLUE,
        rents: lightBlueRents,
      },
    ],
  },
  {
    name: 'New York Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.ORANGE,
        rents: orangeRents,
      },
    ],
  },
  {
    name: 'St. James Place',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.ORANGE,
        rents: orangeRents,
      },
    ],
  },
  {
    name: 'Tennessee Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.ORANGE,
        rents: orangeRents,
      },
    ],
  },
  {
    name: 'St. Charles Place',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.PURPLE,
        rents: purpleRents,
      },
    ],
  },
  {
    name: 'Virginia Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.PURPLE,
        rents: purpleRents,
      },
    ],
  },
  {
    name: 'States Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.PURPLE,
        rents: purpleRents,
      },
    ],
  },
  {
    name: 'Short Line',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLACK,
        rents: blackRents,
      },
    ],
  },
  {
    name: 'B & O Railroad',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLACK,
        rents: blackRents,
      },
    ],
  },
  {
    name: 'Reading Railroad',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLACK,
        rents: blackRents,
      },
    ],
  },
  {
    name: 'Pennsylvania Railroad',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLACK,
        rents: blackRents,
      },
    ],
  },
  {
    name: 'Kentucky Avenue',
    value: 3,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.RED,
        rents: redRents,
      },
    ],
  },
  {
    name: 'Indiana Avenue',
    value: 3,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.RED,
        rents: redRents,
      },
    ],
  },
  {
    name: 'Illinois Avenue',
    value: 3,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.RED,
        rents: redRents,
      },
    ],
  },
  {
    name: 'Water Works',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.LIGHT_GREEN,
        rents: lightGreenRents,
      },
    ],
  },
  {
    name: 'Illinois Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.LIGHT_GREEN,
        rents: lightGreenRents,
      },
    ],
  },
  {
    name: 'Ventnor Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.YELLOW,
        rents: yellowRents,
      },
    ],
  },
  {
    name: 'Marvin Gardens',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.YELLOW,
        rents: yellowRents,
      },
    ],
  },
  {
    name: 'Atlantic Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.YELLOW,
        rents: yellowRents,
      },
    ],
  },
];
const wildCards: Card[] = [];
const currencyCards: Card[] = [];
const rentCards: Card[] = [];
const actionCards: Card[] = [];

export const deck: Card[] = propertyCards;
