import Word from "./word.js";

var index = 0;  
var score = 0;
var timeStart = 0; 
var timeFinish = 0;

export default class WordBox {
    /**
     * Create a WordBox and fill it with words.
     * @param {Array.<string>} words a collection of words.
     */
    constructor(words) {
        this.userInput = '';
        this.wordList = new Array(0);
        words.forEach((word) => {
            if (word.length > 1)
                this.wordList.push(new Word(word.trim()))
        });
        this.running = false;
        this.currentWord.activate();
        this.updateCurrentWord();
    }

    /**
     * Sets the current input 
     * @param {InputEvent} e User input.
     */
    readInput(e) {
        if (!this.running) {
            timeStart = Date.now();
            score = 0;
        }
        this.userInput = e.target.value;
        if (index < this.wordList.length) {
            this.running = true;
            if (this.userInput.endsWith(' ')) {
                e.target.value = '';
                this.nextWord();
            }
        }
    }

    /**
     * Update the current word and progresses to the next one in line.
     */
    nextWord() {
        this.currentWord.validate(this.userInput.trim());
        this.updateCurrentWord();
        index = index + 1;
        if (index < this.wordList.length) {
            this.currentWord.activate();
            document.getElementById(index.toString()).classList.add("active");
        } else {
            this.gameOver();
        }
    }

    /**
     * Update the current word in the WordList and add appropriate CSS.
     */
    updateCurrentWord() {
        let cl = document.getElementById(index.toString()).classList;
        cl.add(this.currentWord.classCSS);
        if (this.currentWord.classCSS === 'correct')
            score++;

        if (cl.length > 1)
            cl.remove("active");
    }

    /**
     * Game over. Sets statistics and updates the DOM.
     */
    gameOver() {
        this.running = false;
        timeFinish = Date.now();
        const timeDelta = (timeFinish - timeStart) / (1000*60);
        let wpm = score / timeDelta;
        let acc = (score / this.wordList.length) * 100;
        document.getElementById("stats").textContent = "wpm: " + String(Math.floor(wpm) + " | acc: " + String(acc));
    }

    /**
     * Returns a Word.
     * @return {Word} A word.
     */
    get currentWord() {
        return this.wordList[index];
    }

}