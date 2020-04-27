import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { WildCardComponent } from './components/wild-card/wild-card.component';
import { RentCardComponent } from './components/rent-card/rent-card.component';
import { ActionCardComponent } from './components/action-card/action-card.component';
import { CardActionsComponent } from './components/card-actions/card-actions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PlayerComponent } from './components/player/player.component';
import { CardComponent } from './components/card/card.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { OpponentsViewComponent } from './components/opponents-view/opponents-view.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    CurrencyCardComponent,
    WildCardComponent,
    RentCardComponent,
    ActionCardComponent,
    CardActionsComponent,
    PlayerComponent,
    CardComponent,
    ClickOutsideDirective,
    OpponentsViewComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, FormsModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
