
const db = firebase.firestore();
const form = document.querySelector('#edit-ticket-form');

var newticketId;


<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
//saving data
form.addEventListener('submit', (e) => {

    var r = confirm("Are you sure you want to edit this ticket?");

    //Works the same way as creating a new ticket but just
    //overrides the tickets information
    if (r == true){
        e.preventDefault();
        console.log("started");

    
        //Update the firestore database.
        db.collection('test').doc(newticketId).update({
            
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            phoneNumber: form.phoneNumber.value,
            email: form.email.value,
            totalAttend: form.totalAttend.value,
            extraInfo: form.extraInfo.value
        });

       
    }
    
    //Reloads the parent window and then closes the current window.
    parentWindow.location.reload();
    
    setTimeout('window.close()', 1000);

    console.log("completed")
    
});

