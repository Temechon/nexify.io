export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDEzj4WwLWU3VJy6KTXyyTPVD7XhhxTxKk",
    authDomain: "chronoapp-b27f8.firebaseapp.com",
    projectId: "chronoapp-b27f8",
    storageBucket: "chronoapp-b27f8.appspot.com",
    messagingSenderId: "333155769617",
    appId: "1:333155769617:web:2d98c788b86236adc100b0"
  },
  matomo: {
    scriptUrl: '//nexify.io/analytics/matomo.js',
    trackers: [
      {
        trackerUrl: '//nexify.io/analytics/matomo.php',
        siteId: 1
      }
    ],
    routeTracking: {
      enable: true
    }
  }
};
