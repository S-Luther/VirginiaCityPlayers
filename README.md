# VirginiaCityPlayers

Virginia City Players Site: for entering ticket data and assigning seats to ultimately print tickets at the box office.

Developer Documentation: Hosting with Firebase https://virginiacity-players.web.app/

Template from Pixlearity: https://pixelarity.com/ (Licensed Forever)

User Documentation: https://docs.google.com/document/d/12dzcBrxv7eM0DSHdS952UgP-tcaWXYWmiKLTYl1k1go/edit?usp=sharing

Burndown Chart: https://docs.google.com/spreadsheets/d/1c6-g-2eQpSA3cADQ2ElCi3Qs3qSJTIhsx1yXBOEOqnk/edit?usp=sharing

Link to our Final Presenation: https://docs.google.com/presentation/d/1dn1l8L9T6aPEampP63H3zV02LPpN6f1MzBrgTmhIxOk/edit?usp=sharing


Starting the Project:

First of all you must have access to the Virginia City firebase project.

Next install firebase tools and initialize the project 

~ npm install -g firebase-tools

Then clone this project

~ git clone https://github.com/Quackbar/VirginiaCityPlayers.git

Inside the cloned folder init npm and try starting it

~ npm install
~ npm start

Finally, you can make any changes you would like and publish them to the website using

~ firebase deploy

Make sure youre destination is correct within the firebase.json file. It should look like this 

"hosting": {
    "site": "virginiacity-players",
    "public": "public"
  }
  
If you'd like to deploy to a testing endpoint you may change the "site" to one of the projects other domains.

That should be all! Happy Hacking!

For more trouble shooting resources chakout the docs at https://firebase.google.com/ or https://www.npmjs.com/get-npm
