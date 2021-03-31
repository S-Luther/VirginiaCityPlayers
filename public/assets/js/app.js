
const db = firebase.firestore();

const form = document.querySelector('#add-show-form')
const showList = document.querySelector('#show-list');



form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Shows').add({
        showName: form.showName.value,
        showDate: form.showDate.value,
        time: form.time.value
    
    });
   
    form.showName.value = '';
    form.showDate.value = '';
});


db.collection('Shows').orderBy('showDate').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        // console.log(change.doc);
        if(change.type == 'added'){
            renderShowList(change.doc);
        }else if (change.type == 'removed'){
            let li = showList.querySelector('[data-id=' + change.doc.id + ']');
            showList.removeChild(li);
        }
    });
});

