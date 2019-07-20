
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  import firebase from 'firebase'; // 4.8.1

  class Fire {
    constructor() {
      this.init();
      this.observeAuth();
    }
  
    init = () => {
      if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyAdWDmCl6bSU0qU_FZBD_f2onSTtXH6AJA",
            authDomain: "chat-app-rn-990e9.firebaseapp.com",
            databaseURL: "https://chat-app-rn-990e9.firebaseio.com",
            projectId: "chat-app-rn-990e9",
            storageBucket: "",
            messagingSenderId: "458131522539",
            appId: "1:458131522539:web:957024c2c1e9fe7e"
        });
      }
    };
  
    observeAuth = () =>
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  
    onAuthStateChanged = user => {
      if (!user) {
        try {
          firebase.auth().signInAnonymously();
        } catch ({ message }) {
          alert(message);
        }
      }
    };
  
    get uid() {
      return (firebase.auth().currentUser || {}).uid;
    }
  
    get ref() {
      return firebase.database().ref('messages');
    }
  
    parse = snapshot => {
      const { timestamp: numberStamp, text, user } = snapshot.val();
      const { key: _id } = snapshot;
      const timestamp = new Date(numberStamp);
      const message = {
        _id,
        timestamp,
        text,
        user,
      };
      return message;
    };
  
    on = callback =>
      this.ref
        .limitToLast(20)
        .on('child_added', snapshot => callback(this.parse(snapshot)));
  
    get timestamp() {
      return firebase.database.ServerValue.TIMESTAMP;
    }
    // send the message to the Backend
    send = messages => {
      for (let i = 0; i < messages.length; i++) {
        const { text, user } = messages[i];
        const message = {
          text,
          user,
          timestamp: this.timestamp,
        };
        this.append(message);
      }
    };
  
    append = message => this.ref.push(message);
  
    // close the connection to the Backend
    off() {
      this.ref.off();
    }
  }
  
  Fire.shared = new Fire();
  export default Fire;