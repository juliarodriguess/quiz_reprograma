function question(text, choices, answer) {
	this.text = text;
	this.choices = choices;
	this.answer = answer;
}

question.prototype.correctAnswer = function(choice) {
	return choice === this.answer;
}

function quiz(questions) {
	this.score = 0;
	this.questions = questions;
	this.questionIndex = 0;
}

quiz.prototype.getQuestionIndex = function() {
	return this.questions[this.questionIndex];
}

quiz.prototype.isEnded = function() {
	return this.questions.length === this.questionIndex;
}

quiz.prototype.check = function(answer) {

	if(this.getQuestionIndex().correctAnswer(answer)) {
		this.score++;
	}

	this.questionIndex++;
}

// função que preenche as lacunas
function fill () {
	if(quiz.isEnded()) {
		showScores();
	} else {
		// função que mostra a questão
		let questionText = document.querySelector("#question");
		questionText.innerHTML = quiz.getQuestionIndex().text;

		// função que mostra a resposta
		let choices = quiz.getQuestionIndex().choices;
		for(let i = 0; i < choices.length; i++) {
			let choice = document.querySelector("#choice" + i);
			choice.innerHTML = choices[i];
			check("#button" + i, choices[i]);
		}

		showProgress();
	}
};

// vê se a resposta está certa
function check(id, check) {
	let button = document.querySelector(id);
	button.onclick = function() {
		quiz.check(check);
		fill();
	}
};

function showProgress() {
	let currentQuestionNumber = quiz.questionIndex + 1;
	let progress = document.querySelector("#progress");
	progress.innerHTML = "Questão " + currentQuestionNumber + " de " + quiz.questions.length;
}

function showScores() {
	let gameOverHtml = "<h1>Resultado</h1>";
	gameOverHtml += "<h2 id = 'score'> Sua quantidade de acertos foi: " + quiz.score + "</h2>";
	if(quiz.score == "3") {
		gameOverHtml += "<div class = 'gif'><iframe src='https://giphy.com/embed/K3Sbp8fOgKye4' width='100%' height='100%'' style='position:absolute' frameBorder='0' class='giphy-embed' allowFullScreen></iframe></div>"
	} else if(quiz.score == "2") {
		gameOverHtml += "<div class = 'gif'><iframe src='https://giphy.com/embed/sMaW02wUllmFi' width='100%' height='100%'' style='position:absolute' frameBorder='0' class='giphy-embed' allowFullScreen></iframe></div>"
	} else if(quiz.score == "1") {
		gameOverHtml += "<div class = 'gif'><iframe src='https://giphy.com/embed/HtYsYjPsw1nVu' width='100%' height='100%'' style='position:absolute' frameBorder='0' class='giphy-embed' allowFullScreen></iframe></div>"
	} else if(quiz.score == "0") {
		gameOverHtml += "<div class = 'gif'><iframe src='https://giphy.com/embed/10tIjpzIu8fe0' width='100%' height='100%'' style='position:absolute' frameBorder='0' class='giphy-embed' allowFullScreen></iframe></div>"
	}
	let quizContent = document.querySelector("#quiz");
	quizContent.innerHTML = gameOverHtml;
};

let questions = [
	new question("1. O que significa a sigla HTML?", ["A. Hyperlinks and Text Markup Language", "B. Hyper Text Markup Language", "C. Home Tool Markup Language"], "B. Hyper Text Markup Language"),
	new question("2. O que significa a sigla CSS?", ["A. Creative Style Sheets", "B. Cascading Style Sheets", "C. Colorful Style Sheets"], "B. Cascading Style Sheets"),
	new question("3. Dentro de qual elemento HTML nós colocamos o JavaScript?", ["A. script ", "B. js", "C. javascript"], "A. script ")
];

var quiz = new quiz(questions);

fill();
