// game.js
let player = null;
let computer = null;
let result = null;

const score = { win: 0, loss: 0, tie: 0 };

const finalEl = document.getElementById('result');
const resetBtn = document.getElementById('reset');

// Utility: pick a random computer choice
function pickComputer() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const idx = Math.floor(Math.random() * choices.length);
    return choices[idx];
}

// Compute round outcome and update score/result string
function evaluateRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        score.tie++;
        return `It's a tie — both chose ${playerChoice}.
                Your Score: wins = ${score.win}, losses = ${score.loss}, ties = ${score.tie}.`;
    }

    // Winning combos for the player
    const wins = {
        Rock: 'Scissors',
        Paper: 'Rock',
        Scissors: 'Paper'
    };

    if (wins[playerChoice] === computerChoice) {
        score.win++;
        return `You WON — computer chose ${computerChoice}.
                Your Score: wins = ${score.win}, losses = ${score.loss}, ties = ${score.tie}.`;
    } else {
        score.loss++;
        return `You LOST — computer chose ${computerChoice}.
                Your Score: wins = ${score.win}, losses = ${score.loss}, ties = ${score.tie}.`;
    }
}

// Show result in the UI (uses .visible class from improved CSS)
function showResult(text) {
    finalEl.textContent = text;
    finalEl.classList.add('visible');
}

// Reset UI / Scores
function resetGame() {
    score.win = score.loss = score.tie = 0;
    player = computer = result = null;
    finalEl.textContent = '';
    finalEl.classList.remove('visible');
}

// Main handler when user clicks a choice
function onPlayerChoice(choice) {
    player = choice;
    computer = pickComputer();
    result = evaluateRound(player, computer);
    showResult(result);
}

// Wire up event listeners
function init() {
    // Expect HTML images to have data-choice attributes (see HTML snippet below)
    const choiceImages = document.querySelectorAll('#btn img[data-choice]');
    choiceImages.forEach(img => {
        img.addEventListener('click', (e) => {
            const choice = e.currentTarget.dataset.choice;
            onPlayerChoice(choice);
        });

        // keyboard accessibility: allow Enter / Space to trigger the choice
        img.setAttribute('tabindex', '0');
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const choice = e.currentTarget.dataset.choice;
                onPlayerChoice(choice);
            }
        });
    });

    resetBtn.addEventListener('click', resetGame);
}

// run init after DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
