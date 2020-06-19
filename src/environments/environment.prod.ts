export const environment = {
  production: true,
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
