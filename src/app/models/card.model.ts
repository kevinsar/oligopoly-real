import { Color } from '../enums/color.enum';
import { CardType } from '../enums/card-type.enum';

export interface Card {
  id?: number;
  name: string;
  value: number;
  type: CardType;
  description?: string;
  property?: Property[];
  rentColors?: Color[];
}

export interface Property {
  color: Color;
  rents: number[];
}
