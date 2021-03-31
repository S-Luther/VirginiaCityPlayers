
const db = firebase.firestore();
const form = document.querySelector('#edit-ticket-form');

var newticketId;


//Another issue is currently you cannot close the window aafter editing the information.

//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("started")

    //Current issue is that db.collection is not properly being referenced.
    //and without this code it will overwrite all information include empty strings

    // form.firstName.value = db.collection('test').doc(newticketId).data().firstName;
    // form.lastName.value = '';
    // form.phoneNumber.value = '' ;
    // form.email.value = '';
    // form.totalAttend.value = '';
    // form.extraInfo.value = '';


    db.collection('test').doc(newticketId).update({
        
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        phoneNumber: form.phoneNumber.value,
        email: form.email.value,
        totalAttend: form.totalAttend.value,
        extraInfo: form.extraInfo.value
    });
    parentWindow.location.reload();

    setTimeout('window.close()', 1000);

    console.log("completed")
   
});

