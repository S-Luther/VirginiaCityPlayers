var database = firebase.database()

// Crud functions

function createData(key, first, last){
    database.ref('keys/' + key).set({
        firstName: first,
        lastName: last
    });
}

function readData(key){
    database.child("users").child(userId).get().then(function(snapshot) {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        }
        else {
          console.log("No data available");
        }
      }).catch(function(error) {
        console.error(error);
      });
}

function updateData(key, first, last){
    // Update Data
    var updatedData = {
        firstName: first,
        lastName: last
    };

    // Get Key
    var newPostKey = database.ref().child('posts').push().key;

    // Build updates array
    var updates = {};
    updates['/posts/' + newPostKey] = updatedData
    updates['/user-posts/' + key + '/' + newPostKey] = updatedData;

    return database.ref().update(updates)
}

function deleteData(key){
    database.ref('keys/' + key).remove();
}
