const db = firebase.firestore();


console.log("testing");

db.collection('test').get().then((querySnapShot) => {
    querySnapShot.forEach((doc) => {
        console.log(doc.data());
    });
});







