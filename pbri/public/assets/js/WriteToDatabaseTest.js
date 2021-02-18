var database = firebase.database()

function writeData(key, first, last){
    firebase.database().ref('keys/' + key).set({
        firstName: first,
        lastName: last,
    });
}