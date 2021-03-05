var UserD = "";
/**
* Function called when clicking the Login/Logout button.
*/
function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
        
    }
    else {
        localStorage.setItem("current_uid", null);
        firebase.auth().signOut();
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}
var modal = document.getElementById("authModal");

var span = document.getElementsByClassName("close")[0];

/**
*  writes user info to the database
*  called from within initApp funtion for when a user logs in
*/
admins = ["samluther998@gmail.com"]
function writeUserData(userId, name, email, imageUrl) {
    var userRef = firebase.database().ref('users/');
    
    //new method of checking if the user exists
    
    userRef.orderByChild("id").equalTo(userId).on("value", function(data) {
        if(!data.exists()){
            // console.log("do it");
                firebase.database().ref('users/' + userId).set({
                    username: name,
                    id: userId,
                    email: email,
                    profile_picture : imageUrl
                });
            

        }
    });
    

}

/**
* initApp handles setting up UI event listeners and registering Firebase auth listeners:
*  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
*    out, and that is where we update the UI.
*  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
*    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
*/
function initApp() {
    
    firebase.auth().getRedirectResult().then(function(result) {
    var user = result.user;
    localStorage.setItem("current_uid", user.uid);
    console.log(user.uid);
    localStorage.setItem("lsUser", user);

    // calls funtion to write to firebase
    // this might need to be called from a different location if data is being overwritten
    
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    
    
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
        }
    });
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

                span.onclick = function() {
                    modal.style.display = "none";
                  }
                  
                  // When the user clicks anywhere outside of the modal, close it
                  window.onclick = function(event) {
                    if (event.target == modal) {
                      modal.style.display = "none";
                    }
                  }
            

            UserD = user.uid;
            // User is signed in.
            localStorage.setItem("current_uid", user.uid);
            
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);


            document.getElementById('quickstart-sign-in').textContent = 'Sign out';

        }
        else {

            span.onclick = function() {
               alert("Please Sign In");
              }
              
              // When the user clicks anywhere outside of the modal, close it
              window.onclick = function(event) {
                if (event.target == modal) {
                    alert("Please Sign In");
                }
              }

            localStorage.setItem("userMarkers", null);
            localStorage.setItem("current_uid", null);
            document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
        }
        document.getElementById('quickstart-sign-in').disabled = false;
    });
    
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}

window.onload = function() {
    initApp();
};
