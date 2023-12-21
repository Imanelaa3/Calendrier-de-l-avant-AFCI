export default class aude extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Create a shadow DOM to encapsulate styles
    }

    // Render method to set up the initial structure and styles of the component
    render() {
        this.shadowRoot.innerHTML = `
            <div id="game-container">
                <h1>Quizz de noël ?</h1>
                <div id="question"></div>
                <div id="options"></div>
                <p id="score">Score : <span id="score-value">0</span></p>
                <div id="countdown"></div>
                <style>
                    /* Styles for the custom element */
                    :host {
                        margin: 0;
                        font-family: 'Arial', sans-serif;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background-color: red;
                        color: #ffffff;
                       
                    }
            
                    #game-container {
                        text-align: center;
                        background-color: green;
                        padding: 20px;
                        border-radius: 10px;
                        max-width: 600px; 
                        width: 100%;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                 }
            
                    h1 {
                        font-size: 2em;
                    }
            
                    #question {
                        font-size: 1.5em;
                        margin: 20px 0;
                    }
            
                    button {
                        padding: 10px;
                        font-size: 1em;
                        cursor: pointer;
                        margin: 10px;
                        color:#6D071A;
                        background-color: silver;
                        border: none;
                        border-radius: 5px;
                    }
            
                    #score {
                        font-size: 1.2em;
                        margin-top: 20px;
                    }
            
                    .hidden {
                        display: none;
                    }
            
                    @media only screen and (max-width: 600px) {
                        #game-container {
                            padding: 10px;
                        }
            
                        h1 {
                            font-size: 1.5em;
                        }
            
                        #question {
                            font-size: 1.2em;
                            margin: 10px 0;
                        }
            
                        button {
                            padding: 8px;
                            font-size: 0.9em;
                        }
            
                        #score {
                            font-size: 1em;
                            margin-top: 15px;
                        }
                    }
                </style>
            </div>
        `;
    }

    connectedCallback() {
        // Set the countdown duration and render the initial structure
        const countdownDuration = 60;
        this.render();
        const questionContainer = this.shadowRoot.getElementById('question');
        const optionsContainer = this.shadowRoot.getElementById('options');
        const scoreValue = this.shadowRoot.getElementById('score-value');
        const countdownDisplay = this.shadowRoot.getElementById('countdown');

        // Log elements to console for debugging
        console.log(questionContainer, optionsContainer, scoreValue, countdownDisplay);

        // Define an array of quiz questions
        const questions = [
            {
                question: 'Quel est le surnom de Santa Claus ?',
                options: ['Père Noël', 'Grand-papa Noël', 'Saint Nicolas', 'Papa Hiver'],
                correctAnswer: 'Père Noël'
            },
            {
                question: 'Quelle est la couleur traditionnelle de Noël ?',
                options: ['Bleu', 'Vert', 'Rouge', 'Jaune'],
                correctAnswer: 'Rouge'
            },
            {
                question: 'Quel animal est souvent associé au traîneau du Père Noël ?',
                options: ['Renne', 'Cheval', 'Élan', 'Lutin'],
                correctAnswer: 'Renne'
            },
            {
                question: 'Quel est le jour de la semaine où Noël est toujours célébré ?',
                options: ['Vendredi', 'Samedi', 'Dimanche', 'Lundi'],
                correctAnswer: 'Dimanche'
            },
            {
                question: 'Quel personnage de Noël est également connu sous le nom de Kris Kringle ?',
                options: ['Le Père Noël', 'Le Bonhomme de neige', 'Le Grinch', 'Rudolphe le renne'],
                correctAnswer: 'Le Père Noël'
            },
            {
                question: 'Quel est le nom de l homme qui a écrit "Un chant de Noël" ?',
                options: ['Charles Dickens', 'Mark Twain', 'Jane Austen', 'William Shakespeare'],
                correctAnswer: 'Charles Dickens'
            },
            {
                question: 'Quel est l autre nom de la fête de la Saint-Sylvestre, qui marque la fin de l année ?',
                options: ['Noël', 'Hanoukka', 'Le Nouvel An', 'Pâques'],
                correctAnswer: 'Le Nouvel An'
            },
            {
                question: 'Dans quelle ville se trouve la place principale de Noël, réputée pour son marché de Noël ?',
                options: ['Paris', 'Londres', 'Berlin', 'New York'],
                correctAnswer: 'Berlin'
            },
            {
                question: 'Quel est le nom du renne au nez rouge qui guide le traîneau du Père Noël ?',
                options: ['Dasher', 'Prancer', 'Rudolphe', 'Vixen'],
                correctAnswer: 'Rudolphe'
            },
            {
                question: 'Quel dessert est traditionnellement associé à Noël en Amérique du Nord ?',
                options: ['Bûche de Noël', 'Pudding de Noël', 'Tarte aux pommes', 'Cookies au gingembre'],
                correctAnswer: 'Cookies au gingembre'
            },
            {
                question: 'Quel jour est célébré le Boxing Day ?("journée de solde")',
                options: ['Le 24 décembre', 'Le 25 décembre', 'Le 26 décembre', 'Le 31 décembre'],
                correctAnswer: 'Le 26 décembre'
            },
            {
                question: 'Quel est le nom du personnage grincheux qui déteste Noël dans le livre et le film "Le Grinch" ?',
                options: ['Scrooge', 'Grumpy', 'Grouchy', 'Grinchy'],
                correctAnswer: 'Grinchy'
            },
            {
                question: 'Quel arbre est traditionnellement utilisé comme arbre de Noël ?',
                options: ['Sapin', 'Chêne', 'Palmier', 'Érable'],
                correctAnswer: 'Sapin'
            }
        ];

        // Initialize variables to manage quiz state
        let currentQuestionIndex = 0;
        let score = 0;
        let countdownTimer;

        // Function to display a question and its options
        const showQuestion = () => {
            resetCountdown();
            const currentQuestion = questions[currentQuestionIndex];
            questionContainer.innerText = currentQuestion.question;
            optionsContainer.innerHTML = '';

            // Create buttons for each option and attach event listeners
            for (let i = 0; i < currentQuestion.options.length; i++) {
                const optionButton = document.createElement('button');
                optionButton.innerText = currentQuestion.options[i];
                optionButton.addEventListener('click', handleButtonClick);
                optionButton.addEventListener('touchstart', handleButtonClick); // Add touch event

                optionsContainer.appendChild(optionButton);
                optionButton.disabled = false;
            }
        };

        // Function to check the selected answer and update the quiz state
        const checkAnswer = (question, selectedAnswer) => {
            clearTimeout(countdownTimer);
            if (selectedAnswer === question.correctAnswer) {
                score++;
                scoreValue.innerText = score;
                showFeedback('Bonne réponse ! 🎉', 'gold');
            } else {
                showFeedback(`Mauvaise réponse. 😢 La bonne réponse était : ${question.correctAnswer}`, 'silver');
            }

            // Move to the next question or end the game after a delay
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    showQuestion();
                    hideFeedback();
                } else {
                    endGame();
                }
            }, 3000);
        };

        // Function to display feedback for the user
        const showFeedback = (message, color) => {
            const feedback = document.createElement('p');
            feedback.innerText = message;
            feedback.style.color = color;
            optionsContainer.appendChild(feedback);
        };

        // Function to hide the feedback
        const hideFeedback = () => {
            const feedback = optionsContainer.querySelector('p');
            if (feedback) {
                optionsContainer.removeChild(feedback);
            }
        };

        // Function to end the game and display the final score
        const endGame = () => {
            clearTimeout(countdownTimer);
            alert(`Fin du jeu ! Votre score est de ${score}`);
        };

        // Function to start the countdown timer
        const startCountdown = () => {
            let timeLeft = countdownDuration;

            // Update the countdown display every 2 seconds
            countdownTimer = setInterval(() => {
                countdownDisplay.innerText = `Temps restant : ${timeLeft}s`;
                timeLeft--;

                // End the game if time runs out
                if (timeLeft < 0) {
                    clearInterval(countdownTimer);
                    showFeedback('Temps écoulé. 😢', 'red');

                    setTimeout(() => {
                        if (currentQuestionIndex < questions.length - 1) {
                            currentQuestionIndex++;
                            showQuestion();
                            hideFeedback();
                        } else {
                            endGame();
                        }
                    }, 2000);
                }
            }, 2000);
        };

        // Function to reset the countdown timer
        const resetCountdown = () => {
            clearInterval(countdownTimer);
            countdownDisplay.innerText = '';
            startCountdown();
        };

        // Event handler for button clicks
        const handleButtonClick = (event) => {
            const selectedAnswer = event.target.innerText;
            checkAnswer(questions[currentQuestionIndex], selectedAnswer);
        };

        // Call showQuestion after defining the functions
        showQuestion();
    }
}

// Define the custom element 'balise-animation8'
customElements.define("balise-animation8", aude);