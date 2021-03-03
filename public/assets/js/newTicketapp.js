
const db = firebase.firestore();
const ticketList = document.querySelector('#ticket-list');
const form = document.querySelector('#add-ticket-form');



//For use on newTicket.html page
//Retrieving Data from firestore
//create element and render the list.
function renderList(doc){

    let li = document.createElement('li');
    let firstName = document.createElement('spanner');
    let lastName = document.createElement('spanner');
    let totalAttend = document.createElement('spanner');
    let email = document.createElement('spanner');
    let phoneNumber = document.createElement('spanner');
    let cross = document.createElement('spanner');
    let extraInfo = document.createElement('div');
    
    li.setAttribute('data-id', doc.id);
    firstName.textContent = doc.data().firstName;
    lastName.textContent = doc.data().lastName;
    totalAttend.textContent = "# of tickets: " + doc.data().totalAttend;
    email.textContent =  doc.data().email;
    phoneNumber.textContent = doc.data().phoneNumber;
    cross.textContent = 'X';
    extraInfo.textContent = 'Additional Info: '+ doc.data().extraInfo;


    //Creating element from the render list.
    //updating the list of objects.
    li.appendChild(firstName);
    li.appendChild(lastName);
    li.appendChild(email);
    li.appendChild(phoneNumber);
    li.appendChild(cross);
    li.appendChild(totalAttend);
    li.appendChild(extraInfo);
    ticketList.appendChild(li);
    //Updating the list


    //Deleting Data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('test').doc(id).delete();

    });
    //Deleting Data

}

// db.collection('test').orderBy('firstName').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderList(doc);

//     });

// });

//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('test').add({
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

db.collection('test').orderBy('firstName').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderList(change.doc);
        }else if (change.type == 'removed'){
            let li = ticketList.querySelector('[data-id=' + change.doc.id + ']');
            ticketList.removeChild(li);
        }
    });
});


