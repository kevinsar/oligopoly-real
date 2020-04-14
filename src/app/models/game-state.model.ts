import { Card } from './card.model';
import { Player } from './player.model';

export interface GameState {
  deck: Card[];
  trash: Card[];
  players: Player[];
}
