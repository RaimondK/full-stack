import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userName: string = '';
  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService,
      @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

    ngOnInit(): void {
      this.oktaAuthService.authState$.subscribe(
            (result) => {
              this.isAuthenticated = result.isAuthenticated;
              this.getUserDetails();
            }
          );
      }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (result) => {
          this.userName = result.name as string;

          const email = result.email;
          this.storage.setItem('userEmail', JSON.stringify(email));
          }
        );
      }
    }

  logout() {
    this.oktaAuth.signOut();
    }
}
