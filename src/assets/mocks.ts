export const mockGameState = {
  deck: [
    {
      name: 'Pennsylvania Railroad',
      value: 2,
      type: 'property',
      property: [
        {
          color: 'black',
          rents: [1, 2, 3, 4]
        }
      ],
      id: 19
    },
    {
      name: '$4',
      value: 4,
      type: 'currency',
      id: 54
    },
    {
      name: 'Pacific Avenue',
      value: 4,
      type: 'property',
      property: [
        {
          color: 'green',
          rents: [2, 4, 7]
        }
      ],
      id: 5
    },
    {
      name: '$3',
      value: 3,
      type: 'currency',
      id: 51
    },
    {
      name: 'Indiana Avenue',
      value: 3,
      type: 'property',
      property: [
        {
          color: 'red',
          rents: [2, 3, 6]
        }
      ],
      id: 21
    },
    {
      name: 'Marvin Gardens',
      value: 2,
      type: 'property',
      property: [
        {
          color: 'yellow',
          rents: [2, 4, 6]
        }
      ],
      id: 26
    },
    {
      name: 'Wild Card',
      value: 2,
      type: 'wild',
      property: [
        {
          color: 'light-blue',
          rents: [1, 2, 3]
        },
        {
          color: 'brown',
          rents: [1, 2]
        }
      ],
      id: 29
    },
    {
      name: 'Wild Card',
      value: 2,
      type: 'wild',
      property: [
        {
          color: 'orange',
          rents: [1, 3, 5]
        },
        {
          color: 'purple',
          rents: [1, 2, 4]
        }
      ],
      id: 31
    },
    {
      name: '$1',
      value: 1,
      type: 'currency',
      id: 45
    },
    {
      name: 'Boardwalk',
      value: 4,
      type: 'property',
      property: [
        {
          color: 'blue',
          rents: [3, 8]
        }
      ],
      id: 2
    },
    {
      name: 'Kentucky Avenue',
      value: 3,
      type: 'property',
      property: [
        {
          color: 'red',
          rents: [2, 3, 6]
        }
      ],
      id: 20
    },
    {
      name: '$1',
      value: 1,
      type: 'currency',
      id: 42
    },
    {
      name: 'Illinois Avenue',
      value: 3,
      type: 'property',
      property: [
        {
          color: 'red',
          rents: [2, 3, 6]
        }
      ],
      id: 22
    },
    {
      name: 'Water Works',
      value: 2,
      type: 'property',
      property: [
        {
          color: 'light-green',
          rents: [1, 2]
        }
      ],
      id: 23
    },
    {
      name: '$2',
      value: 2,
      type: 'currency',
      id: 47
    },
    {
      value: 1,
      name: 'Rent',
      type: 'rent',
      rentColors: ['purple', 'orange'],
      id: 63
    },
    {
      name: 'It`s My Birthday',
      value: 2,
      type: 'action',
      description: 'All players give you $2 as a "gift"',
      id: 83
    },
    {
      name: 'Wild Card',
      value: 2,
      type: 'wild',
      property: [
        {
          color: 'light-blue',
          rents: [1, 2, 3]
        },
        {
          color: 'black',
          rents: [1, 2, 3, 4]
        }
      ],
      id: 33
    },
    {
      value: 1,
      name: 'Rent',
      type: 'rent',
      rentColors: ['brown', 'light-blue'],
      id: 61
    },
    {
      value: 1,
      name: 'Rent',
      type: 'rent',
      rentColors: ['blue', 'green'],
      id: 59
    },
    {
      name: 'Wild Card',
      value: 0,
      type: 'wild',
      property: [
        {
          color: 'red',
          rents: [2, 3, 6]
        },
        {
          color: 'yellow',
          rents: [2, 4, 6]
        },
        {
          color: 'black',
          rents: [1, 2, 3, 4]
        },
        {
          color: 'light-green',
          rents: [1, 2]
        },
        {
          color: 'purple',
          rents: [1, 2, 4]
        },
        {
          color: 'orange',
          rents: [1, 3, 5]
        },
        {
          color: 'brown',
          rents: [1, 2]
        },
        {
          color: 'light-blue',
          rents: [1, 2, 3]
        },
        {
          color: 'blue',
          rents: [3, 8]
        },
        {
          color: 'green',
          rents: [2, 4, 7]
        }
      ],
      id: 37
    },
    {
      name: 'St. Charles Place',
      value: 2,
      type: 'property',
      property: [
        {
          color: 'purple',
          rents: [1, 2, 4]
        }
      ],
      id: 13
    },
    {
      name: 'New York Avenue',
      value: 2,
      type: 'property',
      property: [
        {
          color: 'orange',
          rents: [1, 3, 5]
        }
      ],
      id: 10
    },
    {
      name: '$1',
      value: 1,
      type: 'currency',
      id: 41
    },
    {
      name: 'Wild Card',
      value: 4,
      type: 'wild',
      property: [
        {
          color: 'green',
          rents: [2, 4, 7]
        },
        {
          color: 'blue',
          rents: [3, 8]
        }
      ],
      id: 28
    }
  ],
  players: [
    {
      id: 0,
      name: 'Kevin',
      hand: [
        {
          name: 'Just Say No!',
          value: 4,
          type: 'action',
          description: 'Use any time when an action card is played against you.',
          id: 88
        },
        {
          value: 1,
          name: 'Rent',
          type: 'rent',
          rentColors: ['brown', 'light-blue'],
          id: 62
        },
        {
          name: 'Hotel',
          value: 4,
          type: 'action',
          description: 'Add onto any full set you own to add $4 to the rent value.',
          id: 94
        }
      ],
      land: [
        [
          {
            name: 'Oriental Avenue',
            value: 1,
            type: 'property',
            property: [
              {
                color: 'light-blue',
                rents: [1, 2, 3]
              }
            ],
            id: 8
          }
        ],
        [
          {
            name: 'Atlantic Avenue',
            value: 2,
            type: 'property',
            property: [
              {
                color: 'yellow',
                rents: [2, 4, 6]
              }
            ],
            id: 27
          }
        ],
        [
          {
            name: 'St. James Place',
            value: 2,
            type: 'property',
            property: [
              {
                color: 'orange',
                rents: [1, 3, 5]
              }
            ],
            id: 11
          },
          {
            name: 'Wild Card',
            value: 0,
            type: 'wild',
            property: [
              {
                color: 'orange',
                rents: [1, 3, 5]
              },
              {
                color: 'red',
                rents: [2, 3, 6]
              },
              {
                color: 'yellow',
                rents: [2, 4, 6]
              },
              {
                color: 'black',
                rents: [1, 2, 3, 4]
              },
              {
                color: 'light-green',
                rents: [1, 2]
              },
              {
                color: 'purple',
                rents: [1, 2, 4]
              },
              {
                color: 'brown',
                rents: [1, 2]
              },
              {
                color: 'light-blue',
                rents: [1, 2, 3]
              },
              {
                color: 'blue',
                rents: [3, 8]
              },
              {
                color: 'green',
                rents: [2, 4, 7]
              }
            ],
            id: 38
          }
        ],
        [
          {
            name: 'Virginia Avenue',
            value: 2,
            type: 'property',
            property: [
              {
                color: 'purple',
                rents: [1, 2, 4]
              }
            ],
            id: 14
          }
        ],
        [
          {
            name: 'Short Line',
            value: 2,
            type: 'property',
            property: [
              {
                color: 'black',
                rents: [1, 2, 3, 4]
              }
            ],
            id: 16
          }
        ],
        []
      ],
      bank: [
        {
          name: '$2',
          value: 2,
          type: 'currency',
          id: 50
        },
        {
          name: '$1',
          value: 1,
          type: 'currency',
          id: 44
        },
        {
          value: 1,
          name: 'Rent',
          type: 'rent',
          rentColors: ['red', 'yellow', 'black', 'light-green', 'purple', 'orange', 'brown', 'light-blue', 'blue', 'green'],
          id: 70
        }
      ]
    },
    {
      id: 1586926870459,
      name: '1586926870459',
      hand: [
        {
          name: 'House',
          value: 3,
          type: 'action',
          description: 'Add onto any full set you own to add $3 to the rent value.',
          id: 96
        },
        {
          name: 'Sly Deal',
          value: 3,
          type: 'action',
          description: 'Steal a property from the player of your choice. (Cannot be part of a full set).',
          id: 89
        },
        {
          name: 'House',
          value: 3,
          type: 'action',
          description: 'Add onto any full set you own to add $3 to the rent value.',
          id: 95
        },
        {
          name: 'Just Say No!',
          value: 4,
          type: 'action',
          description: 'Use any time when an action card is played against you.',
          id: 87
        },
        {
          name: 'Pass Go',
          value: 1,
          type: 'action',
          description: 'Draw 2 extra cards.',
          id: 99
        }
      ],
      land: [
        [
          {
            name: 'Vermont Avenue',
            value: 1,
            type: 'property',
            property: [
              {
                color: 'light-blue',
                rents: [1, 2, 3]
              }
            ],
            id: 9
          }
        ],
        [
          {
            name: 'Pennsylvania Avenue',
            value: 4,
            type: 'property',
            property: [
              {
                color: 'green',
                rents: [2, 4, 7]
              }
            ],
            id: 6
          }
        ],
        [],
        [
          {
            name: 'Park Place',
            value: 4,
            type: 'property',
            property: [
              {
                color: 'blue',
                rents: [3, 8]
              }
            ],
            id: 3
          }
        ],
        [
          {
            name: 'Tennessee Avenue',
            value: 2,
            type: 'property',
            property: [
              {
                color: 'orange',
                rents: [1, 3, 5]
              }
            ],
            id: 12
          }
        ]
      ],
      bank: [
        {
          name: 'Pass Go',
          value: 1,
          type: 'action',
          description: 'Draw 2 extra cards.',
          id: 102
        },
        {
          value: 1,
          name: 'Rent',
          type: 'rent',
          rentColors: ['black', 'light-green'],
          id: 65
        },
        {
          name: '$3',
          value: 3,
          type: 'currency',
          id: 52
        },
        {
          value: 1,
          name: 'Rent',
          type: 'rent',
          rentColors: ['blue', 'green'],
          id: 60
        },
        {
          value: 1,
          name: 'Rent',
          type: 'rent',
          rentColors: ['red', 'yellow', 'black', 'light-green', 'purple', 'orange', 'brown', 'light-blue', 'blue', 'green'],
          id: 69
        }
      ]
    },
    {
      id: 1586926948752,
      name: '1586926948752',
      hand: [
        {
          name: 'Sly Deal',
          value: 3,
          type: 'action',
          description: 'Steal a property from the player of your choice. (Cannot be part of a full set).',
          id: 91
        },
        {
          name: 'Double the Rent',
          value: 1,
          type: 'action',
          description: 'Needs to be played with a rent card.',
          id: 77
        },
        {
          name: 'House',
          value: 3,
          type: 'action',
          description: 'Add onto any full set you own to add $3 to the rent value.',
          id: 97
        },
        {
          name: 'Pass Go',
          value: 1,
          type: 'action',
          description: 'Draw 2 extra cards.',
          id: 107
        },
        {
          name: 'Debt Collector',
          value: 3,
          type: 'action',
          description: 'Force any player to pay you $5.',
          id: 74
        },
        {
          value: 1,
          name: 'Rent',
          type: 'rent',
          rentColors: ['red', 'yellow'],
          id: 67
        }
      ],
      land: [
        [],
        [
          {
            name: 'Wild Card',
            value: 2,
            type: 'wild',
            property: [
              {
                color: 'yellow',
                rents: [2, 4, 6]
              },
              {
                color: 'red',
                rents: [2, 3, 6]
              }
            ],
            id: 35
          }
        ],
        [],
        [],
        [
          {
            name: 'Wild Card',
            value: 2,
            type: 'wild',
            property: [
              {
                color: 'black',
                rents: [1, 2, 3, 4]
              },
              {
                color: 'green',
                rents: [2, 4, 7]
              }
            ],
            id: 32
          }
        ]
      ],
      bank: [
        {
          name: '$10',
          value: 10,
          type: 'currency',
          id: 39
        },
        {
          name: '$3',
          value: 3,
          type: 'currency',
          id: 53
        },
        {
          value: 1,
          name: 'Rent',
          type: 'rent',
          rentColors: ['purple', 'orange'],
          id: 64
        },
        {
          value: 1,
          name: 'Rent',
          type: 'rent',
          rentColors: ['black', 'light-green'],
          id: 66
        }
      ]
    },
    {
      id: 1586927031244,
      name: '1586927031244',
      hand: [
        {
          name: 'Pass Go',
          value: 1,
          type: 'action',
          description: 'Draw 2 extra cards.',
          id: 106
        },
        {
          name: 'Pass Go',
          value: 1,
          type: 'action',
          description: 'Draw 2 extra cards.',
          id: 100
        }
      ],
      land: [
        [
          {
            name: 'Baltic Avenue',
            value: 1,
            type: 'property',
            property: [
              {
                color: 'brown',
                rents: [1, 2]
              }
            ],
            id: 0
          }
        ],
        [
          {
            name: 'Ventnor Avenue',
            value: 2,
            type: 'property',
            property: [
              {
                color: 'yellow',
                rents: [2, 4, 6]
              }
            ],
            id: 25
          }
        ],
        [
          {
            name: 'Wild Card',
            value: 2,
            type: 'wild',
            property: [
              {
                color: 'orange',
                rents: [1, 3, 5]
              },
              {
                color: 'purple',
                rents: [1, 2, 4]
              }
            ],
            id: 30
          }
        ],
        [],
        []
      ],
      bank: [
        {
          name: '$1',
          value: 1,
          type: 'currency',
          id: 40
        },
        {
          name: '$4',
          value: 4,
          type: 'currency',
          id: 56
        },
        {
          name: '$2',
          value: 2,
          type: 'currency',
          id: 46
        },
        {
          name: '$5',
          value: 5,
          type: 'currency',
          id: 58
        }
      ]
    },
    {
      id: 1586927099185,
      name: '1586927099185',
      hand: [
        {
          name: 'Hotel',
          value: 4,
          type: 'action',
          description: 'Add onto any full set you own to add $4 to the rent value.',
          id: 93
        },
        {
          name: 'Double the Rent',
          value: 1,
          type: 'action',
          description: 'Needs to be played with a rent card.',
          id: 78
        },
        {
          name: 'Debt Collector',
          value: 3,
          type: 'action',
          description: 'Force any player to pay you $5.',
          id: 76
        },
        {
          name: 'Deal Breaker',
          value: 5,
          type: 'action',
          description: 'Steal a complete set of properties from any player (Includes any buildings).',
          id: 72
        }
      ],
      land: [
        [
          {
            name: 'B & O Railroad',
            value: 2,
            type: 'property',
            property: [
              {
                color: 'black',
                rents: [1, 2, 3, 4]
              }
            ],
            id: 17
          }
        ],
        [
          {
            name: 'Electric Company',
            value: 2,
            type: 'property',
            property: [
              {
                color: 'light-green',
                rents: [1, 2]
              }
            ],
            id: 24
          }
        ],
        [
          {
            name: 'North Carolina Avenue',
            value: 4,
            type: 'property',
            property: [
              {
                color: 'green',
                rents: [2, 4, 7]
              }
            ],
            id: 4
          }
        ],
        [],
        []
      ],
      bank: [
        {
          name: '$2',
          value: 2,
          type: 'currency',
          id: 48
        },
        {
          name: '$1',
          value: 1,
          type: 'currency',
          id: 43
        },
        {
          name: '$2',
          value: 2,
          type: 'currency',
          id: 49
        }
      ]
    },
    {
      id: 1586927129382,
      name: '1586927129382',
      hand: [
        {
          name: 'Deal Breaker',
          value: 5,
          type: 'action',
          description: 'Steal a complete set of properties from any player (Includes any buildings).',
          id: 73
        },
        {
          name: 'Forced Deal',
          value: 3,
          type: 'action',
          description: 'Swap any property with another player. (Cannot be part of a full set)',
          id: 82
        },
        {
          name: 'Pass Go',
          value: 1,
          type: 'action',
          description: 'Draw 2 extra cards.',
          id: 103
        },
        {
          value: 1,
          name: 'Rent',
          type: 'rent',
          rentColors: ['red', 'yellow'],
          id: 68
        },
        {
          value: 1,
          name: 'Rent',
          type: 'rent',
          rentColors: ['red', 'yellow', 'black', 'light-green', 'purple', 'orange', 'brown', 'light-blue', 'blue', 'green'],
          id: 71
        }
      ],
      land: [
        [
          {
            name: 'Connecticut Avenue',
            value: 1,
            type: 'property',
            property: [
              {
                color: 'light-blue',
                rents: [1, 2, 3]
              }
            ],
            id: 7
          }
        ],
        [
          {
            name: 'Reading Railroad',
            value: 2,
            type: 'property',
            property: [
              {
                color: 'black',
                rents: [1, 2, 3, 4]
              }
            ],
            id: 18
          }
        ],
        [
          {
            name: 'States Avenue',
            value: 2,
            type: 'property',
            property: [
              {
                color: 'purple',
                rents: [1, 2, 4]
              }
            ],
            id: 15
          }
        ],
        [
          {
            name: 'Mediterranean Avenue',
            value: 1,
            type: 'property',
            property: [
              {
                color: 'brown',
                rents: [1, 2]
              }
            ],
            id: 1
          }
        ],
        [
          {
            name: 'Wild Card',
            value: 2,
            type: 'wild',
            property: [
              {
                color: 'yellow',
                rents: [2, 4, 6]
              },
              {
                color: 'red',
                rents: [2, 3, 6]
              }
            ],
            id: 36
          }
        ],
        [
          {
            name: 'Wild Card',
            value: 2,
            type: 'wild',
            property: [
              {
                color: 'light-green',
                rents: [1, 2]
              },
              {
                color: 'black',
                rents: [1, 2, 3, 4]
              }
            ],
            id: 34
          }
        ],
        []
      ],
      bank: [
        {
          name: '$5',
          value: 5,
          type: 'currency',
          id: 57
        },
        {
          name: '$4',
          value: 4,
          type: 'currency',
          id: 55
        }
      ]
    }
  ],
  trash: [
    {
      name: 'Pass Go',
      value: 1,
      type: 'action',
      description: 'Draw 2 extra cards.',
      id: 98
    },
    {
      name: 'Just Say No!',
      value: 4,
      type: 'action',
      description: 'Use any time when an action card is played against you.',
      id: 86
    },
    {
      name: 'Debt Collector',
      value: 3,
      type: 'action',
      description: 'Force any player to pay you $5.',
      id: 75
    },
    {
      name: 'Pass Go',
      value: 1,
      type: 'action',
      description: 'Draw 2 extra cards.',
      id: 105
    },
    {
      name: 'Pass Go',
      value: 1,
      type: 'action',
      description: 'Draw 2 extra cards.',
      id: 101
    },
    {
      name: 'Hotel',
      value: 4,
      type: 'action',
      description: 'Add onto any full set you own to add $4 to the rent value.',
      id: 92
    },
    {
      name: 'Sly Deal',
      value: 3,
      type: 'action',
      description: 'Steal a property from the player of your choice. (Cannot be part of a full set).',
      id: 90
    },
    {
      name: 'Forced Deal',
      value: 3,
      type: 'action',
      description: 'Swap any property with another player. (Cannot be part of a full set)',
      id: 80
    },
    {
      name: 'Forced Deal',
      value: 3,
      type: 'action',
      description: 'Swap any property with another player. (Cannot be part of a full set)',
      id: 79
    },
    {
      name: 'It`s My Birthday',
      value: 2,
      type: 'action',
      description: 'All players give you $2 as a "gift"',
      id: 85
    },
    {
      name: 'Forced Deal',
      value: 3,
      type: 'action',
      description: 'Swap any property with another player. (Cannot be part of a full set)',
      id: 81
    },
    {
      name: 'It`s My Birthday',
      value: 2,
      type: 'action',
      description: 'All players give you $2 as a "gift"',
      id: 84
    },
    {
      name: 'Pass Go',
      value: 1,
      type: 'action',
      description: 'Draw 2 extra cards.',
      id: 104
    }
  ]
};
