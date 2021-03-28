const db = firebase.firestore();


console.log("working");


function myFunction(id){
    document.getElementById(id).style.fill = "red";
    console.log("testadd");
    db.collection('test').add({
        Seat: id
        
    });



}






