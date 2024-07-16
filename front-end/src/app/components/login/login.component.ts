import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import AppConfig from '../../config/app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
    logo: 'assets/images/logo.png',
    baseUrl: AppConfig.oidc.issuer.split('/oauth2')[0],
    clientId: AppConfig.oidc.clientId,
    redirectUri: AppConfig.oidc.redirectUri,
    authParams: {
      pkce: true,
      issuer: AppConfig.oidc.issuer,
      scopes: AppConfig.oidc.scopes
      }
    });
    }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'},
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
          }
        },
      (error: any) => {
        throw error;
        }
      );
    }
}
