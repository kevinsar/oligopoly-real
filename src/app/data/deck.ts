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
  yellowRents
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
        rents: brownRents
      }
    ]
  },
  {
    name: 'Mediterranean Avenue',
    value: 1,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BROWN,
        rents: brownRents
      }
    ]
  },
  {
    name: 'Boardwalk',
    value: 4,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLUE,
        rents: blueRents
      }
    ]
  },
  {
    name: 'Park Place',
    value: 4,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLUE,
        rents: blueRents
      }
    ]
  },
  {
    name: 'North Carolina Avenue',
    value: 4,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.GREEN,
        rents: greenRents
      }
    ]
  },
  {
    name: 'Pacific Avenue',
    value: 4,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.GREEN,
        rents: greenRents
      }
    ]
  },
  {
    name: 'Pennsylvania Avenue',
    value: 4,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.GREEN,
        rents: greenRents
      }
    ]
  },
  {
    name: 'Connecticut Avenue',
    value: 1,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.LIGHT_BLUE,
        rents: lightBlueRents
      }
    ]
  },
  {
    name: 'Oriental Avenue',
    value: 1,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.LIGHT_BLUE,
        rents: lightBlueRents
      }
    ]
  },
  {
    name: 'Vermont Avenue',
    value: 1,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.LIGHT_BLUE,
        rents: lightBlueRents
      }
    ]
  },
  {
    name: 'New York Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.ORANGE,
        rents: orangeRents
      }
    ]
  },
  {
    name: 'St. James Place',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.ORANGE,
        rents: orangeRents
      }
    ]
  },
  {
    name: 'Tennessee Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.ORANGE,
        rents: orangeRents
      }
    ]
  },
  {
    name: 'St. Charles Place',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.PURPLE,
        rents: purpleRents
      }
    ]
  },
  {
    name: 'Virginia Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.PURPLE,
        rents: purpleRents
      }
    ]
  },
  {
    name: 'States Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.PURPLE,
        rents: purpleRents
      }
    ]
  },
  {
    name: 'Short Line',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLACK,
        rents: blackRents
      }
    ]
  },
  {
    name: 'B & O Railroad',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLACK,
        rents: blackRents
      }
    ]
  },
  {
    name: 'Reading Railroad',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLACK,
        rents: blackRents
      }
    ]
  },
  {
    name: 'Pennsylvania Railroad',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.BLACK,
        rents: blackRents
      }
    ]
  },
  {
    name: 'Kentucky Avenue',
    value: 3,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.RED,
        rents: redRents
      }
    ]
  },
  {
    name: 'Indiana Avenue',
    value: 3,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.RED,
        rents: redRents
      }
    ]
  },
  {
    name: 'Illinois Avenue',
    value: 3,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.RED,
        rents: redRents
      }
    ]
  },
  {
    name: 'Water Works',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.LIGHT_GREEN,
        rents: lightGreenRents
      }
    ]
  },
  {
    name: 'Electric Company',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.LIGHT_GREEN,
        rents: lightGreenRents
      }
    ]
  },
  {
    name: 'Ventnor Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.YELLOW,
        rents: yellowRents
      }
    ]
  },
  {
    name: 'Marvin Gardens',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.YELLOW,
        rents: yellowRents
      }
    ]
  },
  {
    name: 'Atlantic Avenue',
    value: 2,
    type: CardType.PROPERTY,
    property: [
      {
        color: Color.YELLOW,
        rents: yellowRents
      }
    ]
  }
];
const currencyCards: Card[] = [10, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5].map((value: number) => {
  return {
    name: `$${value}`,
    value,
    type: CardType.CURRENCY
  };
});

const wildCards: Card[] = [
  {
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
  },
  {
    name: 'Wild Card',
    value: 2,
    type: CardType.WILD,
    property: [
      {
        color: Color.LIGHT_BLUE,
        rents: lightBlueRents
      },
      {
        color: Color.BROWN,
        rents: brownRents
      }
    ]
  },
  {
    name: 'Wild Card',
    value: 2,
    type: CardType.WILD,
    property: [
      {
        color: Color.ORANGE,
        rents: orangeRents
      },
      {
        color: Color.PURPLE,
        rents: purpleRents
      }
    ]
  },
  {
    name: 'Wild Card',
    value: 2,
    type: CardType.WILD,
    property: [
      {
        color: Color.ORANGE,
        rents: orangeRents
      },
      {
        color: Color.PURPLE,
        rents: purpleRents
      }
    ]
  },
  {
    name: 'Wild Card',
    value: 2,
    type: CardType.WILD,
    property: [
      {
        color: Color.GREEN,
        rents: greenRents
      },
      {
        color: Color.BLACK,
        rents: blackRents
      }
    ]
  },
  {
    name: 'Wild Card',
    value: 2,
    type: CardType.WILD,
    property: [
      {
        color: Color.LIGHT_BLUE,
        rents: lightBlueRents
      },
      {
        color: Color.BLACK,
        rents: blackRents
      }
    ]
  },
  {
    name: 'Wild Card',
    value: 2,
    type: CardType.WILD,
    property: [
      {
        color: Color.LIGHT_GREEN,
        rents: lightGreenRents
      },
      {
        color: Color.BLACK,
        rents: blackRents
      }
    ]
  },
  {
    name: 'Wild Card',
    value: 2,
    type: CardType.WILD,
    property: [
      {
        color: Color.YELLOW,
        rents: yellowRents
      },
      {
        color: Color.RED,
        rents: redRents
      }
    ]
  },
  {
    name: 'Wild Card',
    value: 2,
    type: CardType.WILD,
    property: [
      {
        color: Color.YELLOW,
        rents: yellowRents
      },
      {
        color: Color.RED,
        rents: redRents
      }
    ]
  },

  {
    name: 'Wild Card',
    value: 0,
    type: CardType.WILD,
    property: [
      {
        color: Color.RED,
        rents: redRents
      },
      {
        color: Color.YELLOW,
        rents: yellowRents
      },
      {
        color: Color.BLACK,
        rents: blackRents
      },
      {
        color: Color.LIGHT_GREEN,
        rents: lightGreenRents
      },
      {
        color: Color.PURPLE,
        rents: purpleRents
      },
      {
        color: Color.ORANGE,
        rents: orangeRents
      },
      {
        color: Color.BROWN,
        rents: brownRents
      },
      {
        color: Color.LIGHT_BLUE,
        rents: lightBlueRents
      },
      {
        color: Color.BLUE,
        rents: blueRents
      },
      {
        color: Color.GREEN,
        rents: greenRents
      }
    ]
  },

  {
    name: 'Wild Card',
    value: 0,
    type: CardType.WILD,
    property: [
      {
        color: Color.RED,
        rents: redRents
      },
      {
        color: Color.YELLOW,
        rents: yellowRents
      },
      {
        color: Color.BLACK,
        rents: blackRents
      },
      {
        color: Color.LIGHT_GREEN,
        rents: lightGreenRents
      },
      {
        color: Color.PURPLE,
        rents: purpleRents
      },
      {
        color: Color.ORANGE,
        rents: orangeRents
      },
      {
        color: Color.BROWN,
        rents: brownRents
      },
      {
        color: Color.LIGHT_BLUE,
        rents: lightBlueRents
      },
      {
        color: Color.BLUE,
        rents: blueRents
      },
      {
        color: Color.GREEN,
        rents: greenRents
      }
    ]
  }
];
const rentCards: Card[] = [
  [Color.BLUE, Color.GREEN],
  [Color.BLUE, Color.GREEN],
  [Color.BROWN, Color.LIGHT_BLUE],
  [Color.BROWN, Color.LIGHT_BLUE],
  [Color.PURPLE, Color.ORANGE],
  [Color.PURPLE, Color.ORANGE],
  [Color.BLACK, Color.LIGHT_GREEN],
  [Color.BLACK, Color.LIGHT_GREEN],
  [Color.RED, Color.YELLOW],
  [Color.RED, Color.YELLOW],
  [Color.RED, Color.YELLOW, Color.BLACK, Color.LIGHT_GREEN, Color.PURPLE, Color.ORANGE, Color.BROWN, Color.LIGHT_BLUE, Color.BLUE, Color.GREEN],
  [Color.RED, Color.YELLOW, Color.BLACK, Color.LIGHT_GREEN, Color.PURPLE, Color.ORANGE, Color.BROWN, Color.LIGHT_BLUE, Color.BLUE, Color.GREEN],
  [Color.RED, Color.YELLOW, Color.BLACK, Color.LIGHT_GREEN, Color.PURPLE, Color.ORANGE, Color.BROWN, Color.LIGHT_BLUE, Color.BLUE, Color.GREEN]
].map((rentColors: Color[]) => {
  return {
    value: 1,
    name: 'Rent',
    type: CardType.RENT,
    rentColors
  };
});
const actionCards: Card[] = [
  {
    name: 'Deal Breaker',
    value: 5,
    type: CardType.ACTION,
    description: 'Steal a complete set of properties from any player (Includes any buildings).'
  },
  {
    name: 'Deal Breaker',
    value: 5,
    type: CardType.ACTION,
    description: 'Steal a complete set of properties from any player (Includes any buildings).'
  },
  {
    name: 'Debt Collector',
    value: 3,
    type: CardType.ACTION,
    description: 'Force any player to pay you $5.'
  },
  {
    name: 'Debt Collector',
    value: 3,
    type: CardType.ACTION,
    description: 'Force any player to pay you $5.'
  },
  {
    name: 'Debt Collector',
    value: 3,
    type: CardType.ACTION,
    description: 'Force any player to pay you $5.'
  },
  {
    name: 'Double the Rent',
    value: 1,
    type: CardType.ACTION,
    description: 'Needs to be played with a rent card.'
  },
  {
    name: 'Double the Rent',
    value: 1,
    type: CardType.ACTION,
    description: 'Needs to be played with a rent card.'
  },
  {
    name: 'Forced Deal',
    value: 3,
    type: CardType.ACTION,
    description: 'Swap any property with another player. (Cannot be part of a full set)'
  },
  {
    name: 'Forced Deal',
    value: 3,
    type: CardType.ACTION,
    description: 'Swap any property with another player. (Cannot be part of a full set)'
  },
  {
    name: 'Forced Deal',
    value: 3,
    type: CardType.ACTION,
    description: 'Swap any property with another player. (Cannot be part of a full set)'
  },
  {
    name: 'Forced Deal',
    value: 3,
    type: CardType.ACTION,
    description: 'Swap any property with another player. (Cannot be part of a full set)'
  },
  {
    name: 'It`s My Birthday',
    value: 2,
    type: CardType.ACTION,
    description: 'All players give you $2 as a "gift"'
  },
  {
    name: 'It`s My Birthday',
    value: 2,
    type: CardType.ACTION,
    description: 'All players give you $2 as a "gift"'
  },
  {
    name: 'It`s My Birthday',
    value: 2,
    type: CardType.ACTION,
    description: 'All players give you $2 as a "gift"'
  },
  {
    name: 'Just Say No!',
    value: 4,
    type: CardType.ACTION,
    description: 'Use any time when an action card is played against you.'
  },
  {
    name: 'Just Say No!',
    value: 4,
    type: CardType.ACTION,
    description: 'Use any time when an action card is played against you.'
  },
  {
    name: 'Just Say No!',
    value: 4,
    type: CardType.ACTION,
    description: 'Use any time when an action card is played against you.'
  },
  {
    name: 'Sly Deal',
    value: 3,
    type: CardType.ACTION,
    description: 'Steal a property from the player of your choice. (Cannot be part of a full set).'
  },
  {
    name: 'Sly Deal',
    value: 3,
    type: CardType.ACTION,
    description: 'Steal a property from the player of your choice. (Cannot be part of a full set).'
  },
  {
    name: 'Sly Deal',
    value: 3,
    type: CardType.ACTION,
    description: 'Steal a property from the player of your choice. (Cannot be part of a full set).'
  },
  {
    name: 'Hotel',
    value: 4,
    type: CardType.ACTION,
    description: 'Add onto any full set you own to add $4 to the rent value.'
  },
  {
    name: 'Hotel',
    value: 4,
    type: CardType.ACTION,
    description: 'Add onto any full set you own to add $4 to the rent value.'
  },
  {
    name: 'Hotel',
    value: 4,
    type: CardType.ACTION,
    description: 'Add onto any full set you own to add $4 to the rent value.'
  },
  {
    name: 'House',
    value: 3,
    type: CardType.ACTION,
    description: 'Add onto any full set you own to add $3 to the rent value.'
  },
  {
    name: 'House',
    value: 3,
    type: CardType.ACTION,
    description: 'Add onto any full set you own to add $3 to the rent value.'
  },
  {
    name: 'House',
    value: 3,
    type: CardType.ACTION,
    description: 'Add onto any full set you own to add $3 to the rent value.'
  },
  {
    name: 'Pass Go',
    value: 1,
    type: CardType.ACTION,
    description: 'Draw 2 extra cards.'
  },
  {
    name: 'Pass Go',
    value: 1,
    type: CardType.ACTION,
    description: 'Draw 2 extra cards.'
  },
  {
    name: 'Pass Go',
    value: 1,
    type: CardType.ACTION,
    description: 'Draw 2 extra cards.'
  },
  {
    name: 'Pass Go',
    value: 1,
    type: CardType.ACTION,
    description: 'Draw 2 extra cards.'
  },
  {
    name: 'Pass Go',
    value: 1,
    type: CardType.ACTION,
    description: 'Draw 2 extra cards.'
  },
  {
    name: 'Pass Go',
    value: 1,
    type: CardType.ACTION,
    description: 'Draw 2 extra cards.'
  },
  {
    name: 'Pass Go',
    value: 1,
    type: CardType.ACTION,
    description: 'Draw 2 extra cards.'
  },
  {
    name: 'Pass Go',
    value: 1,
    type: CardType.ACTION,
    description: 'Draw 2 extra cards.'
  },
  {
    name: 'Pass Go',
    value: 1,
    type: CardType.ACTION,
    description: 'Draw 2 extra cards.'
  },
  {
    name: 'Pass Go',
    value: 1,
    type: CardType.ACTION,
    description: 'Draw 2 extra cards.'
  }
];

export const deck: Card[] = propertyCards
  .concat(wildCards)
  .concat(currencyCards)
  .concat(rentCards)
  .concat(actionCards);
