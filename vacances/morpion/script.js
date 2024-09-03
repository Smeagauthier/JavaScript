document.querySelector('.btnResetMorpion').addEventListener('click', function () {
    location.reload();
});

// -------------------------- GAME ---------------------------

let boxes = Array.from(document.querySelectorAll('.box'));
let turn = 1;
let winner = null;

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box.textContent === '' && !winner) {
            box.textContent = turn === 1 ? 'X' : 'O';
            box.classList.add('no-select');
            checkWinner();
            turn = turn === 1 ? 2 : 1;
        } else if (!winner) { 
            let snackbar = document.getElementById('snackbar');
            snackbar.classList.add('show');
            setTimeout(() => {
                snackbar.classList.remove('show');
            }, 3000);
        }
    });
});

function checkDraw(){
    return boxes.every(box => box.textContent !== '');
}

function checkWinner(){
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    for (let condition of winningCombos) {
        let [a, b, c] = condition;
        
        if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
            winner = boxes[a].textContent;
            boxes[a].classList.add('winner');
            boxes[b].classList.add('winner');
            boxes[c].classList.add('winner');
            
            
            // Afficher le message de victoire
            setTimeout(() => {
                document.getElementById('victoryMessage').innerHTML = `<div>Félicitations ! <br> ${winner} a gagné la partie.</div>
                <img src="confetti.gif" alt="confetti">`;
                document.getElementById('victoryMessage').style.display = 'block';
            }, 500);
            
            break; 
        }
    }

    if (checkDraw()) {
        setTimeout(() => {
            document.getElementById('victoryMessage').innerHTML = `<div>Égalité ! La partie est terminée.</div>
            <img src="egalite.gif" alt="égalité">`;
            document.getElementById('victoryMessage').style.display = 'block';
        }, 500);
    }
}

