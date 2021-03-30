const db = firebase.firestore();

console.log("working");
var newticketId;

function myFunction(id){
    if(document.getElementById(id).style.fill === "red"){
        document.getElementById(id).style.fill = "#FFFFFF";
    } else {
        document.getElementById(id).style.fill = "red";
    }


    db.collection('test').doc('newticketId').update({
        Seat: id
    });

    console.log("testadd");

    // parentWindow.renderTicketList(newticketId);
    //setTimeout('window.close()', 1000);

    //SHOULD WORK BUT DOES NOT. '
    //SOMETHING WRONG WITH THE VARIABLE THATS BEING READ IN.
    //parentWindow.renderTicketList(newticketId);


}







