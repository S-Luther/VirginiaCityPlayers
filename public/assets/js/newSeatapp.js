const db = firebase.firestore();
const showTitle = document.querySelector('#show-name');
var showName;



showTitle.append("Viewing Show: " + showName);



console.log("testing");

db.collection('test').where('showID', '==', newshowId).get().then((querySnapShot) => {
    querySnapShot.forEach((doc) => {
        let seat = doc.get('Seat');
        document.getElementById(seat).style.fill = "red";
    });
});



