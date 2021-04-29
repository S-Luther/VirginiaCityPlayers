//Renderlist is used throught the program to render ticket and show items that are interactable.


function renderShowList(doc){
    let li, showName, showDate, enterTickets, viewShow


    //Try catch to error out if render list fails to render a ticket
    //Render list creating css elements for show items
    try {
         li = document.createElement('li');
         showName = document.createElement('spanner');
         showDate = document.createElement('spanner');
         enterTickets = document.createElement('spanners'); 
         viewShow = document.createElement('spanners'); 
         print    = document.createElement('spanners');
         cross    = document.createElement('spanners');
        li.setAttribute('data-id', doc.id);

    } catch (e) {
        console.log("Could be testing")
        if (e instanceof ReferenceError) {
            return true
        }
        
    }
        //Asisgning those elements values.

        showName.textContent = doc.data().showName;
        showDate.textContent = " on "+doc.data().showDate+" at "+doc.data().time;
        print.textContent = 'Print';
        cross.textContent = 'X';
        viewShow.textContent = 'View Seat Plan';
        enterTickets.textContent = 'Enter Tickets';

        //Creating element from the render list.
        //updating the list of objects.
        
        li.appendChild(showName);
        li.appendChild(showDate);
        li.appendChild(cross);
        li.appendChild(enterTickets);
        li.appendChild(print);
        li.appendChild(viewShow);
        showList.appendChild(li);



        //Enter tickets button
        enterTickets.addEventListener('click', (e) => {
            e.stopPropagation();
            let showId = e.target.parentElement.getAttribute('data-id');
            let showName = doc.data().showName;

            var newWindow = window.open("newTicket.html");
            newWindow.newshowId = showId;
            newWindow.showName = showName;

        });


        //all of these buttons carry over multiple values to the new windo
        //Used to identify which show or which ticket is being edited.


        //View show ticket
        viewShow.addEventListener('click', (e) => {
            e.stopPropagation();
            let showId = e.target.parentElement.getAttribute('data-id');
            let showName = doc.data().showName;

            var newWindow = window.open("SeatPlanner.html");
            newWindow.showName = showName;
            newWindow.newshowId = showId;

        });
        
        //Delete Show ticket.
        cross.addEventListener('click', (e) => {
            var con = confirm("Are you sure you want to delete this show and all tickets?");

            if (con == true){
                e.stopPropagation();
                let id = e.target.parentElement.getAttribute('data-id');
                db.collection('Shows').doc(id).delete();


                db.collection('test').delete().where('showID', '==', String(id));

            }

        });

        print.addEventListener('click', (e) => {

            let id = e.target.parentElement.getAttribute('data-id');
            console.log(id)
            var docRef = db.collection("Shows").doc(id);
            docRef.get().then((showdata) => {
                var date = showdata.data().showDate;
                var time = showdata.data().time;
                var row = ""
                var seat = ""

                var holder = document.getElementById("tickets");
                db.collection("test")
                    .where("showID", "==", id)
                    .get()
                    .then(snap => {
                        snap.forEach(doc => {
                            console.log("hi")
                            var place = doc.data().Seat
                            var pieces = place.split("_")
                            if(pieces.length < 4){
                                row =  pieces[2];
                                seat =  pieces[1];
                                var ticket = "<div id=\"ticket\" style=\"position: relative; width: 6.5in;height: 2.25in;\"><img src=\'images/ticket.jpeg\'style=\'width: 6.5in;margin-bottom: -.9in; position: absolute; opacity: 1;z-index: 0;\'/><p id=\"\" style=\" position: absolute; float: left; margin-top: 1.65in; margin-left: 1.2in;z-index: 999999;color: black;\">"+date+"</p><p style=\" position: absolute; float: left; margin-top: 1.65in; margin-left: 3.5in;z-index: 999999;color: black;\">"+time+"</p><p style=\" position: absolute; float: left; margin-top: 1.65in; margin-left: 4.8in;z-index: 999999;color: black;\">"+row+"</p><p style=\" position: absolute; float: left; margin-top: 1.65in; margin-left: 6in;z-index: 999999;color: black;\">"+seat+"</p></div>"
                                holder.innerHTML = holder.innerHTML+ticket
                                console.log(ticket)

                            }else{
                                alert("multiple tickets coming later");
                            }
                            

                        });
                        printJS('tickets', 'html')
                    }).catch(err => {
                        alert(err)
                    })
                    
            });
            
        });
}




//For use on newTicket.html page
//Retrieving Data from firestore
//create element and render the list.

function renderTicketList(doc){
    let li, firstName, lastName, totalAttend, email, phoneNumber, cross, extraInfo, editTicket, assignSeat, print, Seat
    try {
         li          = document.createElement('li');
         firstName   = document.createElement('spanner');
         lastName    = document.createElement('spanner');
         totalAttend = document.createElement('spanner');
         email       = document.createElement('spanner');
         phoneNumber = document.createElement('spanner');
         cross       = document.createElement('spanner');
         extraInfo   = document.createElement('div');
         print       = document.createElement('spanner');
         editTicket  = document.createElement('spanner');
         assignSeat  = document.createElement('spanner');
         Seat        = document.createElement('div');
         li.setAttribute('data-id', doc.id);

    } catch (e) {
        console.log("Could be testing")
        if (e instanceof ReferenceError) {
            return true
        }
    }
    
        //assigning values to the elements.


        firstName.textContent = doc.data().firstName;
        lastName.textContent = doc.data().lastName;
        totalAttend.textContent = "# of tickets: " + doc.data().totalAttend;
        email.textContent =  doc.data().email;
        phoneNumber.textContent = doc.data().phoneNumber;
        cross.textContent = 'X';
        editTicket.textContent = 'EDIT';
        assignSeat.textContent = 'ASSIGN SEAT';
        print.textContent = 'PRINT';
        extraInfo.textContent = 'Additional Info: '+ doc.data().extraInfo;
        Seat.textContent = 'Seat: ' + doc.data().Seat;


        //Creating element from the render list.
        //updating the list of objects.
        li.appendChild(firstName);
        li.appendChild(lastName);
        li.appendChild(email);
        li.appendChild(phoneNumber);
        li.appendChild(cross);
        li.appendChild(editTicket);
        li.appendChild(assignSeat);
        li.appendChild(print);
        li.appendChild(totalAttend);
        li.appendChild(extraInfo);
        li.appendChild(Seat);
        ticketList.appendChild(li);
        //Updating the list


        //Deleting Data
        cross.addEventListener('click', (e) => {
            var con = confirm("Are you sure you want to delete this ticket?");

            if (con == true){
                e.stopPropagation();
                let id = e.target.parentElement.getAttribute('data-id');
                db.collection('test').doc(id).delete();
                console.log("working");

            }

        });


        //all of these buttons carry over multiple values to the new windo
        //Used to identify which show or which ticket is being edited.

        //create edit ticket button
        editTicket.addEventListener('click', (e) => {
            e.stopPropagation();
            let ticketId = e.target.parentElement.getAttribute('data-id');
            var parentWindow = window.parent;

            var newWindow = window.open("editTicket.html", "", "width=1000,height=700");
            
            newWindow.newticketId = ticketId;
            newWindow.parentWindow = parentWindow;

        });

        
        //Create seat assign button 
        assignSeat.addEventListener('click', (e) => {
            e.stopPropagation();
            let ticketId = e.target.parentElement.getAttribute('data-id');
            var parentWindow = window.parent;
            var newWindow = window.open("seatAssign.html", "", "width=1000,height=1000");
            newWindow.newticketId = ticketId;
            newWindow.newshowId = newshowId;
            newWindow.parentWindow = parentWindow;

        });

        print.addEventListener('click', (e) => {
            e.stopPropagation();

            var show = doc.data().showID
            var docRef = db.collection("Shows").doc(show);

            docRef.get().then((showdata) => {
                if (showdata.exists) {
                    var date = document.getElementById("date");
                    date.innerHTML = showdata.data().showDate;
                    var time = document.getElementById("time");
                    time.innerHTML = showdata.data().time;
                    seat = doc.data().Seat
                    pieces = seat.split("_")
                    if(pieces.length < 4){
                        var row = document.getElementById("row");
                        row.innerHTML = pieces[2];
                        var seat = document.getElementById("seat");
                        seat.innerHTML = pieces[1];
                    }else{
                        alert("multiple tickets coming later");
                    }
                    printJS('ticket', 'html')
                }else{
                    alert("No such show")
                }
            })



        });


}

try {
    module.exports = {
        renderTicketList: renderTicketList,
        renderShowList: renderShowList
    }
} catch (error) {
    console.log("Not in test env")
}
