

function renderShowList(doc){
    let li, showName, showDate, enterTickets, viewShow
    try {
         li = document.createElement('li');
         showName = document.createElement('spanner');
         showDate = document.createElement('spanner');
         enterTickets = document.createElement('spanners'); 
         viewShow = document.createElement('spanners'); 

        li.setAttribute('data-id', doc.id);

    } catch (e) {
        console.log("Could be testing")
        if (e instanceof ReferenceError) {
            return true
        }
        
    }


        showName.textContent = doc.data().showName;
        showDate.textContent = doc.data().showDate;
        viewShow.textContent = 'View Seat Plan';
        enterTickets.textContent = 'Enter Tickets';

        //Creating element from the render list.
        //updating the list of objects.
        li.appendChild(showName);
        li.appendChild(showDate);
        li.appendChild(enterTickets);
        li.appendChild(viewShow);
        showList.appendChild(li);


        enterTickets.addEventListener('click', (e) => {
            e.stopPropagation();
            let showId = e.target.parentElement.getAttribute('data-id');

            var newWindow = window.open("newTicket.html");
            newWindow.newshowId = showId;

        });
        viewShow.addEventListener('click', (e) => {
            e.stopPropagation();
            let showId = e.target.parentElement.getAttribute('data-id');

            var newWindow = window.open("SeatPlanner.html");
            newWindow.newshowId = showId;

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
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('test').doc(id).delete();

        });

        editTicket.addEventListener('click', (e) => {
            e.stopPropagation();
            let ticketId = e.target.parentElement.getAttribute('data-id');
            var parentWindow = window.parent;

            var newWindow = window.open("editTicket.html", "", "width=1000,height=700");
            newWindow.newticketId = ticketId;
            newWindow.parentWindow = parentWindow;

        });

        
        assignSeat.addEventListener('click', (e) => {
            e.stopPropagation();
            let ticketId = e.target.parentElement.getAttribute('data-id');
            var parentWindow = window.parent;
            var newWindow = window.open("seatAssign.html", "", "width=1000,height=700");
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
