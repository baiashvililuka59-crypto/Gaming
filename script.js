const road = document.getElementById('road');
const playerCar = document.getElementById('playerCar');
const startScreen = document.getElementById('startScreen');
const scoreElement = document.getElementById('score');

let score = 0;
let gameActive = false;
let playerPos = { x: 125 };

startScreen.onclick = () => {
    startScreen.style.display = 'none';
    gameActive = true;
    score = 0;
    window.requestAnimationFrame(playGame);
};

// მართვა ისრებით ან თითით
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerPos.x > 0) playerPos.x -= 15;
    if (e.key === 'ArrowRight' && playerPos.x < 250) playerPos.x += 15;
    playerCar.style.left = playerPos.x + 'px';
});

function createEnemy() {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = Math.floor(Math.random() * 250) + 'px';
    enemy.style.top = '-100px';
    road.appendChild(enemy);
    return enemy;
}

let enemies = [];
function playGame() {
    if (!gameActive) return;

    if (Math.random() < 0.02) enemies.push(createEnemy());

    enemies.forEach((enemy, index) => {
        let top = parseInt(enemy.style.top);
        enemy.style.top = (top + 5) + 'px';

        // შეჯახება
        let pRect = playerCar.getBoundingClientRect();
        let eRect = enemy.getBoundingClientRect();

        if (!(pRect.bottom < eRect.top || pRect.top > eRect.bottom || 
              pRect.right < eRect.left || pRect.left > eRect.right)) {
            gameActive = false;
            alert("Crash! შენი ქულაა: " + score);
            location.reload();
        }

        if (top > window.innerHeight) {
            enemy.remove();
            enemies.splice(index, 1);
            score++;
            scoreElement.innerText = "ქულა: " + score;
        }
    });

    window.requestAnimationFrame(playGame);
}
