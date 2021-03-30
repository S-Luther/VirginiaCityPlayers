const db = firebase.firestore();


console.log("testing");

db.collection('test').get().then((querySnapShot) => {
    querySnapShot.forEach((doc) => {
        let seat = doc.get('Seat');
        console.log(seat);
        //document.getElementById().style.fill = "red";
    });
});
