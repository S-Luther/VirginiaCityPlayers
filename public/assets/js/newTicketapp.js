
const db = firebase.firestore();
const ticketList = document.querySelector('#ticket-list');
const form = document.querySelector('#add-ticket-form');





if(typeof newshowId == "undefined"){
    newshowId = localStorage.getItem("newshowId")
    console.log("No show ID")
}else{
    localStorage.setItem("newshowId", newshowId);
    console.log("New show Id found")
}


//localStorage.setItem("loggedin", false);



//saving data
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

