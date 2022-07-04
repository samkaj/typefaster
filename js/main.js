import Word from "./word.js";
import WordBox from "./wordbox.js";

const words = document.getElementById('words').textContent;
const wb = new WordBox(words.split(' '));

main();
function main() {
    let htmlInput = document.querySelector('input');
    htmlInput.addEventListener('input', readInput);
    let btn = document.querySelector('button');
    btn.addEventListener('click', reset)
}

/**
 * Read the user input and return the contents once the user inputs a space.
 * @param {InputEvent} e 
 * @returns {String}
 */
function readInput(e) {
    wb.readInput(e);
}

/**
 * Reload the window.
 */
function reset() {
    window.location.reload();
}