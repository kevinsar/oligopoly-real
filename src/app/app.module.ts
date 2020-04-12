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

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    CurrencyCardComponent,
    WildCardComponent,
    RentCardComponent,
    ActionCardComponent,
    CardActionsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
