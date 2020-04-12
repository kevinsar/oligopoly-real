import { storiesOf } from '@storybook/angular';
import { PropertyCardComponent } from 'src/app/components/property-card/property-card.component';
import { blueRents } from 'src/app/data/rents';
import { Color } from 'src/app/enums/color.enum';

storiesOf('Cards', module).add('Property Card', () => ({
  component: PropertyCardComponent,
  props: {
    name: 'Park Place',
    value: 4,
    type: 'property',
    properties: [
      {
        color: Color.BLUE,
        rents: blueRents,
      },
    ],
  },
}));
