


const db = firebase.firestore();

const form = document.querySelector('#add-show-form')
const showList = document.querySelector('#show-list');

function renderList(doc){

    let li = document.createElement('li');
    let showName = document.createElement('spanner');
    let showDate = document.createElement('spanner');
    let editTickets = document.createElement('spanners');

    li.setAttribute('data-id', doc.id);
    showName.textContent = doc.data().showName;
    showDate.textContent = doc.data().showDate;
    editTickets.textContent = 'Enter Tickets';

    //Creating element from the render list.
    //updating the list of objects.
    li.appendChild(showName);
    li.appendChild(showDate);
    li.appendChild(editTickets);
    showList.appendChild(li);


    editTickets.addEventListener('click', (e) => {
        e.stopPropagation();
        let showId = e.target.parentElement.getAttribute('data-id');

        var newWindow = window.open("newTicket.html");
        newWindow.newShowid = showId;
    });

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Shows').add({
        showName: form.showName.value,
        showDate: form.showDate.value
    
    });
   
    form.showName.value = '';
    form.showDate.value = '';
});


db.collection('Shows').orderBy('showDate').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderList(change.doc);
        }else if (change.type == 'removed'){
            let li = showList.querySelector('[data-id=' + change.doc.id + ']');
            showList.removeChild(li);
        }
    });
});