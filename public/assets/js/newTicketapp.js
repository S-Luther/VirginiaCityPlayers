
const db = firebase.firestore();
const ticketList = document.querySelector('#ticket-list')
const form = document.querySelector('#add-ticket-form');

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
    form.totalAttend = '';
    form.extraInfo = '';
});

