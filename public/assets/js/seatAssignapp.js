const db = firebase.firestore();

console.log("working");
var newticketId;

db.collection('test').where('showID', '==', newshowId).get().then((querySnapShot) => {
    querySnapShot.forEach((doc) => {
        let seat = doc.get('Seat');
        document.getElementById(seat).style.fill = "red";
    });
});


function myFunction(id){
    if(document.getElementById(id).style.fill === "red"){
        document.getElementById(id).style.fill = "#FFFFFF";
    } else {
        document.getElementById(id).style.fill = "red";
    }


    db.collection('test').doc(newticketId).update({
        Seat: id
    });

    parentWindow.location.reload();
    console.log("testadd");

    // parentWindow.renderTicketList(newticketId);
    //setTimeout('window.close()', 1000);

    setTimeout('window.close()', 1000);
    //


}







