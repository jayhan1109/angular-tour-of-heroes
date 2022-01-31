// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from 'firebase/app';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyA3eHZNoCQ2mzQGllB1NU3q6whie9rT8Lc',
    authDomain: 'tour-of-heroes-acaeb.firebaseapp.com',
    projectId: 'tour-of-heroes-acaeb',
    storageBucket: 'tour-of-heroes-acaeb.appspot.com',
    messagingSenderId: '835064981377',
    appId: '1:835064981377:web:7430422a272f89124f6a80',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
