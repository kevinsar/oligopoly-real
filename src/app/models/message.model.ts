import { Player } from './player.model';
import { MessageType } from '../enums/message-type.enum';
import { CardAction } from '../enums/card-action.enum';

export interface Message {
  from: Player;
  messageType: MessageType;
  action?: CardAction;
  content?: any;
  gameId: string;
}
