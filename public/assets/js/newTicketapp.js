
const db = firebase.firestore();
const ticketList = document.querySelector('#ticket-list');
const form = document.querySelector('#add-ticket-form');
const showTitle = document.querySelector('#show-name');
var showName;


//Checking if there is a show selected to save whatever the last show opened was.
//If no show is found in local storage then it makes whatever showId that currently exists
//The new locally stored Id.
if(typeof newshowId == "undefined"){
    newshowId = localStorage.getItem("newshowId")
    showName = localStorage.getItem("showName")
    console.log("No show ID")
}else{
    localStorage.setItem("newshowId", newshowId);
    localStorage.setItem("showName", showName);
    console.log("New show Id found")
}

//Creating the title for the page using the name of the show currently editing.
showTitle.append("Editing Tickets for " + showName);


//Storing data within the firestore database.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('test').add({
        showID: newshowId,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        phoneNumber: form.phoneNumber.value,
        email: form.email.value,
        totalAttend: form.totalAttend.value,
        extraInfo: form.extraInfo.value
    });
   
    //clearing the entry values after completing a ticket.
    form.firstName.value = '';
    form.lastName.value = '';
    form.phoneNumber.value = '';
    form.email.value = '';
    form.totalAttend.value = '';
    form.extraInfo.value = '';
});




//real-time listener, keeps updating page if changes are made.
try{
    db.collection('test').where('showID', '==', newshowId).onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            // console.log(change.doc.data());
            if(change.type == 'added'){
                renderTicketList(change.doc);
            }else if (change.type == 'removed'){
                let li = ticketList.querySelector('[data-id=' + change.doc.id + ']');
                ticketList.removeChild(li);
            }
        });
    });
}catch(er){
    alert("Error with loading tickets, returning to show list.")
    window.location = "showsList.html"
}

