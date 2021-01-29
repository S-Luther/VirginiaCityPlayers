var overlays = ["assets/images/overlays/00.png",
                "assets/images/overlays/01.png",
                "assets/images/overlays/02.png",
                "assets/images/overlays/03.png",
                "assets/images/overlays/04.png",
                "assets/images/overlays/05.png",
                "assets/images/overlays/06.png",
                "assets/images/overlays/07.png",
                "assets/images/overlays/08.png",
                "assets/images/overlays/09.png",
                "assets/images/overlays/10.png",
                "assets/images/overlays/11.png",
                "assets/images/overlays/12.png",
                "assets/images/overlays/13.png",
                "assets/images/overlays/14.png",
                "assets/images/overlays/15.png",
                "assets/images/overlays/16.png",
                "assets/images/overlays/17.png",
                "assets/images/overlays/18.png",
                "assets/images/overlays/19.png",
                "assets/images/overlays/20.png",
                "assets/images/overlays/21.png",
                "assets/images/overlays/22.png",
                "assets/images/overlays/23.png",
                "assets/images/overlays/24.png",
                "assets/images/overlays/25.png"]

document.addEventListener('DOMContentLoaded', function () {

    // Load image from firebase storage
    var puzzleImage = document.getElementById("puzzle-image")
    var questionsWrapper = document.getElementById("questions-wrapper")
    var activeOverlay = document.getElementById("overlay")

    firebase.storage().ref("pbri-puzzle-image").getDownloadURL().then(function (url) {
        puzzleImage.src = url;
        activeOverlay.src = overlays[25];
    }).catch(function (error) {
        console.error(error)
        puzzleImage.src = "assets/images/test-image.jpg"
        activeOverlay.src = overlays[25];
    });

    firebase.database().ref('/questions').once('value').then((snapshot) => {
        var questions = snapshot.val()

        questions.forEach(function (question, q_index) {
            $.get("/assets/components/home/question.html", function (question_element) {
                var question_dom = new DOMParser().parseFromString(question_element, "text/html").firstChild.childNodes[1].firstChild;
                question_dom.getElementsByTagName("p")[0].innerHTML = question.title
                questionsWrapper.insertAdjacentElement('beforeend', question_dom)

                var options_wrapper = question_dom.querySelector(".options")
                question.options.forEach(function (option, o_index) {
                    $.get("/assets/components/home/option.html", function (option_element) {
                        var option_dom = new DOMParser().parseFromString(option_element, "text/html");
                        var input = option_dom.getElementsByTagName("input")[0]
                        var label = option_dom.getElementsByTagName("label")[0]

                        input.id = "option-" + q_index + "-" + o_index
                        input.name = "quesiton-" + q_index
                        
                        label.htmlFor = "option-" + q_index + "-" + o_index
                        label.innerHTML = option

                        if(question.correct_index == o_index) {
                            label.setAttribute("correct", "t");
                        }

                        options_wrapper.insertAdjacentElement('beforeend', option_dom.firstChild.childNodes[1].firstChild)
                    });
                });
            });
        });
    });
});
var iterator = 1;
function selectedOption(option) {
    var activeOverlay = document.getElementById("overlay")
    var celebrate = document.getElementById("success")
//    console.log(option.getAttribute("correct"))
    if(option.getAttribute("correct") == "t") {
        iterator++;
        option.classList.add("correct-answer");

        // show piece
        activeOverlay.src = overlays[overlays.length - iterator];

        if((overlays.length - iterator) <= 0){
            celebrate.style.display = "block";
            //console.log(firebase.auth().currentUser);
            var winnerRef = firebase.database().ref('winners/');
    
            //new method of checking if the user exists
            
            winnerRef.orderByChild("username").equalTo(firebase.auth().currentUser.displayName).on("value", function(data) {
                if(!data.exists()){
                    firebase.database().ref('winners/' + firebase.auth().currentUser.displayName).set({
                        username: firebase.auth().currentUser.displayName,
                        email: firebase.auth().currentUser.email
                    });
                }
            });
        }
        option.disabled = true;
    } else {
        option.classList.add("wrong-answer");

    }
}