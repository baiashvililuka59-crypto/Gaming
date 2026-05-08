const road = document.getElementById('road');
const playerCar = document.getElementById('playerCar');
const startScreen = document.getElementById('startScreen');
const scoreElement = document.getElementById('score');

let score = 0;
let gameActive = false;
let playerPos = { x: 170 }; // საწყისი პოზიცია ცენტრში

startScreen.onclick = () => {
    startScreen.style.display = 'none';
    gameActive = true;
    score = 0;
    scoreElement.innerText = "ქულა: 0";
    window.requestAnimationFrame(playGame);
};

// მართვა (ისრებით)
window.addEventListener('keydown', (e) => {
    if (gameActive) {
        if (e.key === 'ArrowLeft' && playerPos.x > 10) playerPos.x -= 20;
        if (e.key === 'ArrowRight' && playerPos.x < 330) playerPos.x += 20;
        playerCar.style.left = playerPos.x + 'px';
    }
});

function createEnemy() {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    // მტრის მანქანა ჩნდება შემთხვევით ადგილას გზის ფარგლებში
    enemy.style.left = Math.floor(Math.random() * 330) + 10 + 'px';
    enemy.style.top = '-120px';
    road.appendChild(enemy);
    return enemy;
}

let enemies = [];
function playGame() {
    if (!gameActive) return;

    // მტრების გაჩენის სიხშირე
    if (Math.random() < 0.015) enemies.push(createEnemy());

    enemies.forEach((enemy, index) => {
        let top = parseInt(enemy.style.top);
        enemy.style.top = (top + 6) + 'px'; // სიჩქარე

        // შეჯახების ლოგიკა
        let pRect = playerCar.getBoundingClientRect();
        let eRect = enemy.getBoundingClientRect();

        if (!(pRect.bottom < eRect.top || pRect.top > eRect.bottom || 
              pRect.right < eRect.left || pRect.left > eRect.right)) {
            gameActive = false;
            alert("Crash! შენი ქულაა: " + score);
            location.reload();
        }

        // თუ მანქანამ ჩაიარა, ქულა გვემატება
        if (top > window.innerHeight) {
            enemy.remove();
            enemies.splice(index, 1);
            score++;
            scoreElement.innerText = "ქულა: " + score;
        }
    });

    window.requestAnimationFrame(playGame);
}
