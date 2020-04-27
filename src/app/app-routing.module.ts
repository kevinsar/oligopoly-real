import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './components/player/player.component';
import { LoginComponent } from './components/login/login.component';
import { GameStateResolver } from './resolvers/game-state.resolver';
import { GameResolver } from './resolvers/game.resolver';

const routes: Routes = [
  { path: '', component: LoginComponent, resolve: { games: GameResolver } },
  { path: 'game/:gameId', component: PlayerComponent, resolve: { gameState: GameStateResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GameStateResolver, GameResolver]
})
export class AppRoutingModule {}
