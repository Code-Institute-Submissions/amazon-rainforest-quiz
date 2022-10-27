const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');
const correct = document.querySelector('#data-number')

let currentQuestion = {}
let acceptingAnswers = true
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'The Amazon rainforest is found in which countries of South America?',
        choice1: 'Brazil, Bolivia, Peru, Ecuador, Colombia, Venezuela, Guyana, Argentina',
        choice2: 'Brazil, Bolivia, Peru, Ecuador, Colombia, Venezuela, Guyana, Uruguay and French Guiana',
        choice3: 'Brazil, Bolivia, Peru, Ecuador, Colombia, Venezuela, Guyana, Suriname and French Guiana',
        choice4: 'Brazil, Bolivia, Peru, Ecuador, Colombia, Venezuela, Guyana, Paraguay',
        answer: 2,
    },
    {
        question: 'In which country nearly two-thirds of the Amazon rainforest is found?',
        choice1: 'Brazil',
        choice2: 'Bolivia',
        choice3: 'Peru',
        choice4: 'Ecuador',
        answer: 1,
    },
    {
        question: 'How many species of insects live in the Amazon rainforest?',
        choice1: '250 thousand',
        choice2: '500 thousand',
        choice3: '1.5 million',
        choice4: '2.5 million',
        answer: 4,
    },
    {
        question: 'How much of the world’s oxygen is produced by the Amazon rainforest?',
        choice1: '5%',
        choice2: '10%',
        choice3: '15%',
        choice4: '20%',
        answer: 4,
    },
    {
        question: 'How much of our carbon emissions come from burning the Amazon rainforest?',
        choice1: '5%',
        choice2: '10%',
        choice3: '30%',
        choice4: '50%',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion ()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply == 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scored.innerText = score
}

startGame()
