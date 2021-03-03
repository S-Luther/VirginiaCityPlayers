
const db = firebase.firestore();
const form = document.querySelector('#add-show-form');

//saving data

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var showName = form.showName.value;
    db.collection(showName).set();
    

    // db.collection('showsList').add({
    //     firstName: form.firstName.value,
    //     lastName: form.lastName.value,
    //     phoneNumber: form.phoneNumber.value,
    //     email: form.email.value,
    //     totalAttend: form.totalAttend.value,
    //     extraInfo: form.extraInfo.value
    // });
    // form.firstName.value = '';
    // form.lastName.value = '';
    // form.phoneNumber.value = '';
    // form.email.value = '';
    // form.totalAttend = '';
    // form.extraInfo = '';
});



