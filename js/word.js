/**
 * @enum {number}
 */
const WordState = {
    Inactive: "inactive",
    Active: "active",
    Correct: "correct",
    Incorrect: "incorrect"
}

/**
 * @class representing a word.
 */
export default class Word {
    /**
     * @constructor create a Word.
     * @param {string} value a literal word.
     */
    constructor(value) {
        this.state = WordState.Inactive;
        this.val = value;
    }

    /**
     * Set the word state to the active state.
     */
    activate() {
        this.state = WordState.Active;
    }
    
    /**
     * Validate the word by comparing user input with actual value and set the state accordingly.
     * @member state is updated.
     * @param {string} input 
     */
    validate(input) {
        this.state = this.val === input ? WordState.Correct : WordState.Incorrect;
    }

    /**
     * Get the CSS representation of the word.
     */
    get classCSS() {
        return String(this.state);
    }

}
