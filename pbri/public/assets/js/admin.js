document.addEventListener('DOMContentLoaded', function () {

    // Elements 
    var imageForm = document.getElementById("image-form")
    var previewImage = document.getElementById("preview-image")
    var addQuestionsWrapper = document.getElementById("add-questions-wrapper")
    var addQuestionButton = document.getElementById("add-question-button")
    var saveQuestionsButton = document.getElementById("save-questions-button")

    // Firebase
    var imageRef = firebase.storage().ref("pbri-puzzle-image");
    var database = firebase.database();

    // Other
    var questionCount = 0

    // Populate page content
    updatePreviewImage()
    updateQuestion()


    addQuestionButton.addEventListener("click", function () {
        $.get("/assets/components/admin/question.html", function (data) {
            addQuestionsWrapper.insertAdjacentHTML('beforeend', data)

            var newQuestion = document.getElementById("new-question")
            newQuestion.id = "question" + questionCount
            newQuestion.setAttribute("index", questionCount);

            questionCount++
        });
    });

    saveQuestionsButton.addEventListener("click", function () {

        var questions = []

        var questions_dom = document.querySelectorAll('.question-wrapper')
        questions_dom.forEach(function (question, q_index) {
            var new_question = { title: "", options: [], correct_index: 0 }

            new_question.title = question.querySelector(".question").value

            var options = question.querySelectorAll(".option")
            options.forEach(function (option, o_index) {
                new_question.options.push(option.getElementsByTagName("input")[0].value)

            });

            var radios = document.getElementsByName("quesiton-" + q_index);
            radios.forEach(function (radio, r_index) {
                if(radio.checked) {
                    index = radio.id.split("-")[2]
                    new_question.correct_index = index
                }
            });

            questions.push(new_question)
        })

        firebase.database().ref('/').set({
            questions
        }, (error) => {
            if (error) {
                console.error(error)
            } else {
                alert("Questions successfully saved.")
            }
        });
    });

    // Upload new Image
    imageForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // var $ = jQuery;
        var file_data = $("#select-image").prop("files")[0];

        imageRef.put(file_data).then(function (snapshot) {
            updatePreviewImage(imageRef)
        });
    });


    function updatePreviewImage() {
        imageRef.getDownloadURL().then(function (url) {
            previewImage.src = url;
        }).catch(function (error) {
            console.error(error)
            previewImage.src = "assets/images/test-image.jpg"
        });
    }

    function updateQuestion() {
        firebase.database().ref('/questions').once('value').then((snapshot) => {
            var questions = snapshot.val()

            questions.forEach(function (question, q_index) {
                $.get("/assets/components/admin/question.html", function (question_element) {

                    addQuestionsWrapper.insertAdjacentHTML('beforeend', question_element)

                    var newQuestion = document.getElementById("new-question")
                    var addOptionButton = newQuestion.childNodes[3]
                    newQuestion.id = "question" + q_index
                    newQuestion.setAttribute("index", q_index);
                    newQuestion.querySelector(".question").value = question.title

                    question.options.forEach(function (option, o_index) {
                        $.get("/assets/components/admin/option.html", function (option_element) {
                            var option_dom = new DOMParser().parseFromString(option_element, "text/html");
                            option_dom.getElementsByTagName("input")[0].value = option

                            var input = option_dom.querySelector(".is-correct").querySelector("input")
                            var label = option_dom.querySelector(".is-correct").querySelector("label")

                            input.id = "option-" + q_index + "-" + o_index
                            input.name = "quesiton-" + q_index
                        
                            label.htmlFor = "option-" + q_index + "-" + o_index

                            if(question.correct_index == o_index) {
                                input.checked = true
                            }

                            addOptionButton.insertAdjacentElement('beforebegin', option_dom.firstChild)
                        });
                    });
                });
                questionCount = q_index
            });
        });
    }
});

function addOption(element) {
    $.get("/assets/components/admin/option.html", function (data) {
        var q_index = element.parentNode.getAttribute("index")
        var o_index = document.getElementsByName("quesiton-" + q_index).length;
        var option_dom = new DOMParser().parseFromString(data, "text/html");

        var input = option_dom.querySelector(".is-correct").querySelector("input")
        var label = option_dom.querySelector(".is-correct").querySelector("label")

        input.id = "option-" + q_index + "-" + o_index
        input.name = "quesiton-" + q_index
    
        label.htmlFor = "option-" + q_index + "-" + o_index

        element.insertAdjacentElement('beforebegin', option_dom.firstChild.childNodes[1].firstChild)
    });
}

function deleteOption(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
}

function deleteQuestion(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
}
