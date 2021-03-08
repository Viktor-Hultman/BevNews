import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyDZ6-_ldahS3OUPp7R-5SbP_a-yRz0sJJk",
    authDomain: "fe20tp2-bev-9.firebaseapp.com",
    databaseURL: "https://fe20tp2-bev-9-default-rtdb.firebaseio.com",
    projectId: "fe20tp2-bev-9",
    storageBucket: "fe20tp2-bev-9.appspot.com",
    messagingSenderId: "578616604810",
    appId: "1:578616604810:web:7b0eba208d4a357504d573"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        /* Helper */
        this.serverValue = app.database.ServerValue;

        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });


    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');


    // *** Message API ***

    message = uid => this.db.ref(`messages/${uid}`);

    messages = () => this.db.ref('messages');

    // *** Settings API ***
    
    setting = uid => this.db.ref(`settings/${uid}`);

    settings = () => this.db.ref('settings');
    
}

export default Firebase;

