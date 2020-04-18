import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { GameStateService } from 'src/app/services/game-state.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  matcher = new MyErrorStateMatcher();

  constructor(private gameStateService: GameStateService, private router: Router, public httpClient: HttpClient) {}

  ngOnInit() {}

  submit() {
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('gameId');
    window.localStorage.removeItem('userId');

    this.gameId = this.gameId?.toUpperCase() || null;
    const serverUrl = environment.gameUrl;
    const url = `${serverUrl}/client-login`;

    console.log(serverUrl);

    const body = {
      name: this.name,
      gameId: this.gameId
    };

    this.httpClient.request('post', url, { body }).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.success) {
          window.localStorage.setItem('userName', this.name);
          window.localStorage.setItem('gameId', this.gameId);
          window.localStorage.setItem('userId', resp.player.id);
          this.gameStateService.setGameId(this.gameId);
          this.router.navigate([resp.route]);
        } else {
          this.gameExistsError = true;
        }
      },
      error => {
        console.log(error);
        this.gameExistsError = true;
      }
    );
  }

  getRandomId(): string {
    return Math.floor(Math.random() * 1000000) + '';
  }

  roomCodeIsValid(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this.gameExistsError ? { roomCodeIsValid: { value: control.value } } : null;
    };
  }
}
