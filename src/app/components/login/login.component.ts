import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { GameStateService } from 'src/app/services/game-state.service';
import { WindowService } from 'src/app/services/window.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

@Component({
  selector: 'or-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output()
  login = new EventEmitter();
  name = '';
  gameId = '';
  gameExistsError = false;
  games: { name: string; gameId: string }[] = [];

  gameIdControl = new FormControl();
  filteredGameIds: Observable<{ gameId: string; name: string }[]>;

  constructor(
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private gameStateService: GameStateService,
    private windowService: WindowService,
    private router: Router,
    public httpClient: HttpClient
  ) {
    this.route.data.subscribe((params: any) => {
      this.spinnerService.hideSpinner();
      this.games = params.games.games.sort();
    });
  }

  ngOnInit() {
    this.filteredGameIds = this.gameIdControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterGameIds(value))
    );
  }

  submit() {
    this.spinnerService.showSpinner();
    this.windowService.removeItem('userName');
    this.windowService.removeItem('gameId');
    this.windowService.removeItem('userId');

    this.gameId = this.gameId?.toUpperCase() || null;
    const serverUrl = environment.gameUrl;
    const url = `${serverUrl}/client-login`;

    const body = {
      name: this.name,
      gameId: this.gameId
    };

    this.httpClient.post(url, body).subscribe(
      (resp: any) => {
        if (resp.success) {
          this.windowService.setItem('userName', this.name);
          this.windowService.setItem('gameId', this.gameId);
          this.windowService.setItem('userId', resp.player.id);
          this.gameStateService.setGameId(this.gameId);
          this.router.navigate([resp.route]);
        } else {
          this.gameExistsError = true;
        }

        this.spinnerService.hideSpinner();
      },
      error => {
        console.log(error);
        this.gameExistsError = true;
        this.spinnerService.hideSpinner();
      }
    );
  }

  filterGameIds(value: string): { gameId: string; name: string }[] {
    const filterValue = value.toLowerCase().trim();
    this.gameId = filterValue;
    return this.games.filter((option: { gameId: string; name: string }) => {
      return option.gameId.toLowerCase().includes(filterValue) || option.name.toLowerCase().includes(filterValue);
    });
  }
}
