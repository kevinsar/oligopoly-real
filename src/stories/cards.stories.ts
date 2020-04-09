import { storiesOf } from '@storybook/angular';
import { CardComponent } from 'src/app/components/card/card.component';
import { CardType } from 'src/app/enums/card-type.enum';
import { Color } from 'src/app/enums/color.enum';
import { brownRents } from 'src/app/data/rents';

storiesOf('Cards', module)
  .add('Property Card', () => ({
    component: CardComponent,  
    props: {
      name: 'Mediterranean Avenue',
      value: 1,
      type: CardType.PROPERTY,
      property: [
        {
          color: Color.BROWN,
          rents: brownRents,
        },
      ],
    }
  }));