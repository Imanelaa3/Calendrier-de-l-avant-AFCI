export default class Harry extends HTMLElement {
  constructor() {
    super();

    this.btn = document.createElement('button');
    this.append(this.btn);



    this.btn.addEventListener('click', this.closePopup.bind(this));
    this.initPendu();
  }

  closePopup() {
    this.style.display = "none";
  }

  initPendu() {
    let motADeviner = '';
    let motAffiche = '';
    let erreursCommises = 0;
    let partieTerminee = false;

    const words = ['exemple', 'ordinateur', 'javascript', 'pendu', 'programmation'];

    const popupContent = `
      <div id="hangman-image" class="hangman-image"></div>
      <div id="word-display" class="word-display"></div>
      <div id="error-count" class="error-display"></div>
      <div id="result" class="result"></div> 
      <div id="letter-buttons-container" class="letter-buttons"></div>
      <button id="new-game-button" style="display: none;">Nouvelle partie</button>
      <
    `;


        this.style.display = "block";
        this.innerHTML = popupContent;

    const updateDisplay = () => {
      const wordDisplay = this.querySelector('#word-display');
      const errorDisplay = this.querySelector('#error-count');
      const resultDisplay = this.querySelector('#result'); 
      wordDisplay.textContent = motAffiche.split('').join(' ');
      errorDisplay.textContent = `Erreurs : ${erreursCommises}`;
    };
    const updateHangmanImage = (errorCount) => {
      const hangmanImageContainer = this.querySelector('#hangman-image');
      hangmanImageContainer.innerHTML = `<img src="./images/hangman-${errorCount}.png" alt="Pendu image ${errorCount}"/>`;
    };

    const demarrerPartie = () => {
      motADeviner = words[Math.floor(Math.random() * words.length)];
      motAffiche = '_'.repeat(motADeviner.length);
      erreursCommises = 0;
      partieTerminee = false;

      const wordDisplay = this.querySelector('#word-display');
      const errorDisplay = this.querySelector('#error-count');
      const resultDisplay = this.querySelector('#result'); 
      const letterButtonsContainer = this.querySelector('#letter-buttons-container');
      letterButtonsContainer.innerHTML = '';

      'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter.toUpperCase();
        button.addEventListener('click', () => handleLetterClick(letter, button));
        letterButtonsContainer.appendChild(button);
      });

      updateDisplay();
      updateHangmanImage(erreursCommises);

      const newGameButton = this.querySelector('#new-game-button');
      newGameButton.addEventListener('click', () => {
        this.innerHTML = popupContent;
        demarrerPartie();
        });


    };demarrerPartie();

    const handleLetterClick = (letter, button) => {
        if (partieTerminee) return;

        button.disabled = true;
        if (motADeviner.includes(letter)) {
          motAffiche = motADeviner.split('').map((char, index) => char === letter ? letter : motAffiche[index]).join('');
        } else {
          erreursCommises++;
          updateHangmanImage(erreursCommises);
        }

        updateDisplay();
        if (motAffiche === motADeviner || erreursCommises >= 5) {
          endGame();
        }
    };

    const endGame = () => {
      partieTerminee = true;
      const wordDisplay = this.querySelector('#word-display');
      const resultDisplay = this.querySelector('#result');
      const newGameButton = this.querySelector('#new-game-button');
      const letterButtonsContainer = this.querySelector('#letter-buttons-container');

      wordDisplay.textContent = motADeviner;
      resultDisplay.textContent = motAffiche === motADeviner ? 'Bravo ! Vous avez gagné !' : 'Dommage... Vous avez perdu.';

      Array.from(letterButtonsContainer.children).forEach(button => button.disabled = true);

      newGameButton.style.display = 'block';

      updateHangmanImage(erreursCommises);
    };
  }
}

customElements.define("balise-animation2", Dylan);
