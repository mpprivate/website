const pageContent =
"Les Cinque Terre sont réputées pour leurs cinq villages colorés: Monterosso al Mare, Vernazza, Corniglia, Manarola et Riomaggiore qui sont rattachés au parc national des Cinque Terre créé en 1999 et qui sont classées au patrimoine mondial de l’Unesco.";


const hintText = "Voyage Italie";
let words = pageContent.split(/\s+/);
let hintWords = hintText.split(/\s+/);

let revealedWords = new Array(words.length).fill(false);
let revealedHintWords = new Array(hintWords.length).fill(false);
let attempts = 0;

function updateText() {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = words.map((word, index) => {
        if (revealedWords[index]) {
            if (word.toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿñæœ]/gi, '') === "cinque" || word.toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿñæœ]/gi, '') === "terre") {
                return `<span class="revealed-word bold-word">${word}</span>`;
            } else {
                return `<span class="revealed-word">${word}</span>`;
            }
        } else {
            return `<span class="hidden-word">${word}</span>`;
        }
    }).join(' ');

    const hintContainer = document.getElementById('indices-container');
    hintContainer.innerHTML = hintWords.map((word, index) => {
        if (revealedHintWords[index]) {
            return `<span class="revealed-word">${word}</span>`;
        } else {
            return `<span class="hidden-word">${word}</span>`;
        }
    }).join(' ');
}

function revealWord(wordArray, revealedArray, word) {
    wordArray.forEach((w, index) => {
        if (w.toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿñæœ]/gi, '') === word.toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿñæœ]/gi, '')) {
            revealedArray[index] = true;
        }
    });
}

function handleGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.trim().toLowerCase();
    
    if (guess) {
        attempts++;
        let allRevealed = false;

        revealWord(words, revealedWords, guess);
        revealWord(hintWords, revealedHintWords, guess);

        // Check if both "Cinque" and "Terre" are revealed
        if (revealedWords[words.findIndex(word => word.toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿñæœ]/gi, '') === "cinque")] && 
            revealedWords[words.findIndex(word => word.toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿñæœ]/gi, '') === "terre")]) {
            allRevealed = true;
        }

        // Reveal hint words based on attempts
        if (attempts === 5 || guess === "unesco") {
            revealWord(words, revealedWords, "l’Unesco.");
        } else if (attempts === 7) {
            revealWord(words, revealedWords, "colorés:");
        } else if (attempts === 10) {
            revealWord(words, revealedWords, "Corniglia,");
        }

        if (allRevealed) {
            revealedWords = new Array(words.length).fill(true);
            revealedHintWords = new Array(hintWords.length).fill(true);
            confetti();
        }

        updateText();
    }
    
    guessInput.value = '';
    guessInput.focus();
}

document.getElementById('guess-button').addEventListener('click', handleGuess);
document.getElementById('guess-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleGuess();
    }
});

updateText();