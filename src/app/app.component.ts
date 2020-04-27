import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Card } from './models/card.model';
import { Player } from './models/player.model';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'or-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'oligopoly-real';
  deck: Card[] = [];
  player: Player;
  showSpinner = false;

  constructor(private spinnerService: SpinnerService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.spinnerService.getSpinnerStatus().subscribe((showSpinner: boolean) => {
      this.showSpinner = showSpinner;
      this.cdr.detectChanges();
    });
  }
}
