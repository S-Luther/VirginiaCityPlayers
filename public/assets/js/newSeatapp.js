const db = firebase.firestore();
const showTitle = document.querySelector('#show-name');
var showName;


//Creating a title for the page with the current show.
showTitle.append("Viewing Show: " + showName);



//Making seats that are currently occupied taken up by red seats.

db.collection('test').where('showID', '==', newshowId).get().then((querySnapShot) => {
    querySnapShot.forEach((doc) => {
        let seat = doc.get('Seat');
        document.getElementById(seat).style.fill = "red";
    });
});



