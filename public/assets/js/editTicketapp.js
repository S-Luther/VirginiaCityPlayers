
const db = firebase.firestore();
const form = document.querySelector('#edit-ticket-form');

var newticketId;

//Another issue is currently you cannot close the window aafter editing the information.

//saving data
form.addEventListener('submit', (e) => {

    var r = confirm("Are you sure you want to edit this ticket?");


    if (r == true){
        e.preventDefault();
        console.log("started");
    
        db.collection('test').doc(newticketId).update({
            
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            phoneNumber: form.phoneNumber.value,
            email: form.email.value,
            totalAttend: form.totalAttend.value,
            extraInfo: form.extraInfo.value
        });
    

       
    }
    
    parentWindow.location.reload();
    
    setTimeout('window.close()', 1000);

    console.log("completed")
    
});

