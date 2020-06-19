import { LOCAL_STORAGE_ITENS } from './../../../../constantes/config';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {

  supportedPopupSignInMethods = [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ];
  constructor() { }

  async logout() {
    return firebase.auth().signOut();
  }

  getProvider(providerId: string) {
    switch (providerId) {
      case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
        return new firebase.auth.GoogleAuthProvider();
      case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
        return new firebase.auth.FacebookAuthProvider();
      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  }

  async updateToken() {
    if (firebase.auth().currentUser) {
      const token = await firebase.auth().currentUser.getIdToken();
      localStorage.setItem(LOCAL_STORAGE_ITENS.token, token);
    }
  }

}
