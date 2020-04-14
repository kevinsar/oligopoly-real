import { Card } from './card.model';

export interface Player {
  id: number;
  name: string;
  hand: Card[];
  land: Card[][];
  bank: Card[];
}
