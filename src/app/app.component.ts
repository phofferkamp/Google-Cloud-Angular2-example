import { Component, NgZone, HostListener } from '@angular/core';

declare var gapi;
declare var Base64;
declare var crt;
declare var KJUR;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  GoogleAuth: any;
  //SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  SCOPE = 'https://www.googleapis.com/auth/datastore';
  isAuthorized: boolean;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://apis.google.com/js/api.js";

    script.onload = (e) => {
      script.onload = function () { };
      this.handleClientLoad();
    };

    script['onreadystatechange'] = () => {
      if (this['readyState'] === 'complete') {
        let event = new Event("load");
        script.onload(event);
      }
    }

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  handleClientLoad() {
    /*gapi.root = this;
    gapi.load('client:auth2', this.initClient);*/

    /*gapi.root = this;
    gapi.load('client', gapi.root.start);*/

    let now = (Date.now() / 1000).toFixed(0);
    let exp = +now + 1800;

    let claimObj = {
      "iss": "{account email}",
      "scope": "https://www.googleapis.com/auth/datastore",
      "aud": "https://www.googleapis.com/oauth2/v4/token",
      "exp": exp,
      "iat": +now
    }

    let header = Base64.encodeURI('{"alg":"RS256","typ":"JWT"}');

    let claimSet = Base64.encodeURI(JSON.stringify(claimObj));

    let privateKey = "-----BEGIN PRIVATE KEY-----{private key}-----END PRIVATE KEY-----\n";

    let sig = new KJUR.crypto.Signature({ "alg": "SHA256withRSA" });
    sig.init(privateKey);
    sig.updateString(header + "." + claimSet);
    let cleaned_hex = sig.sign()

    let input = new Array();
    for (let i = 0; i < cleaned_hex.length / 2; i++) {
      let h = cleaned_hex.substr(i * 2, 2);
      input[i] = parseInt(h, 16);
    }

    let base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

    let ret = '';
    let i = 0;
    let j = 0;
    let char_array_3 = new Array(3);
    let char_array_4 = new Array(4);
    let in_len = input.length;
    let pos = 0;

    while (in_len--) {
      char_array_3[i++] = input[pos++];
      if (i == 3) {
        char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
        char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
        char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
        char_array_4[3] = char_array_3[2] & 0x3f;

        for (i = 0; (i < 4); i++)
          ret += base64_chars.charAt(char_array_4[i]);
        i = 0;
      }
    }

    if (i) {
      for (j = i; j < 3; j++)
        char_array_3[j] = 0;

      char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
      char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
      char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
      char_array_4[3] = char_array_3[2] & 0x3f;

      for (j = 0; (j < i + 1); j++)
        ret += base64_chars.charAt(char_array_4[j]);

      while ((i++ < 3))
        ret += '=';

    }

    let jwt = header + "." + claimSet + "." + ret;

    console.log(jwt)
  }

  start() {
    gapi.client.init({
      'apiKey': '{API key}',
      'discoveryDocs': ['https://datastore.googleapis.com/$discovery/rest?version=v1']
    }).then(() => {
      /*return gapi.client.language.translations.list({
        q: 'hello world',
        source: 'en',
        target: 'de',
      });*/
      /*return gapi.client.request({
        path: 'https://datastore.googleapis.com/v1/projects/{Project ID}:beginTransaction',
        method: 'POST'
      });*/
    }).then(function (response) {
      //console.log(response.result.data.translations[0].translatedText);
      console.log(response);
    }, function (reason) {
      console.log('Error: ' + reason.result.error.message);
    });

  }

  initClient() {
    //let discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    //let discoveryUrl = 'https://people.googleapis.com/$discovery/rest?version=v1';
    let discoveryUrl = 'https://datastore.googleapis.com/$discovery/rest?version=v1';

    gapi.client.init({
      'apiKey': '{API key}',
      'discoveryDocs': [discoveryUrl],
      'clientId': '{Client ID}',
      //'scope': gapi.root.SCOPE
      'scope': 'https://www.googleapis.com/auth/cloud-platform'
    }).then(() => {
      gapi.root.GoogleAuth = gapi.auth2.getAuthInstance();

      gapi.root.GoogleAuth.isSignedIn.listen(gapi.root.updateSigninStatus);

      let user = gapi.root.GoogleAuth.currentUser.get();
      gapi.root.setSigninStatus();

      /*return gapi.client.datastore.projects.beginTransaction({
        projectId: "{Project ID}"
      });*/
      /*return gapi.client.request({
        path: 'https://datastore.googleapis.com/v1/projects/{Project ID}:beginTransaction',
        method: 'POST'
      });*/
      /*return gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.names'
      })*/
    }).then(function (response) {
      //console.log(response.result.data.translations[0].translatedText);
      //console.log('Hello, ' + response.result.names[0].givenName);
      console.log('Hello, ', response);
    }, function (reason) {
      //console.log('Error: ' + reason.result.error.message);
      console.log('Error: ', reason);
    });
  }

  setSigninStatus() {
    let user = gapi.root.GoogleAuth.currentUser.get();
    gapi.root.isAuthorized = user.hasGrantedScopes(gapi.root.SCOPE);
    console.log(gapi.root.isAuthorized)
  }

  updateSigninStatus(isSignedIn: boolean) {
    console.log("updateSigninStatus", isSignedIn)
    gapi.root.setSigninStatus();
  }

  signIn() {
    gapi.root.GoogleAuth.signIn();
  }

  signOut() {
    gapi.root.GoogleAuth.signOut();
  }

  revokeAccess() {
    gapi.root.GoogleAuth.disconnect();
  }

  beginTransation() {
    gapi.client.datastore.projects.beginTransaction({
      projectId: "{Project ID}"
    })
      .then(response => console.log(response), error => console.log(error));

    /*gapi.client.datastore.projects.lookup({
      projectId: "{Project ID}",
      //keys: ["{Entity key}"]
    })
      .then(response => console.log(response), error => console.log(error));*/
  }
}
