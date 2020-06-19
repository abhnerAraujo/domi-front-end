// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  domi_api: process.env.DOMI_API || (window as any).domi_env.domi_api || 'http://127.0.0.1:3000/v1',
  firebaseConfig: {
    apiKey: 'AIzaSyBHUM8BCroR_7-4X1G59AClePXlcmESR3c',
    authDomain: 'domi-app-web.firebaseapp.com',
    databaseURL: 'https://domi-app-web.firebaseio.com',
    projectId: 'domi-app-web',
    storageBucket: 'domi-app-web.appspot.com',
    messagingSenderId: '615854700273',
    appId: '1:615854700273:web:ba995c11bbf49dde749b50',
    measurementId: 'G-RW1WZXZD7B'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
