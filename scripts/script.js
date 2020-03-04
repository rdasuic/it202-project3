const canvas = document.querySelector("#game"), ctx = canvas.getContext("2d");

let player = {
    health: 100,
    x: 0,
    y: 0,
    score: 0,
    harmsHit: 0,
    benefitsHit: 0,
    speed: 1,
    lives: 9
}
let game = {
    player: player,
    level: 1,
    state: 0 // 0 == alive, 1 == dead
}

let benefitObjs = [
    {
        id: "starbucks",
        img: "sb.png",
        pointValue: 10,
        y: 150
    },
    {
        id: "starbucks",
        img: "starbucks.png",
        pointValue: 10
    }
]
// obj of possible keys this canvas accepts
const keys = {
    up: false,
    down: false,
    left: false,
    right: false
}

// sets init game obj locations
const init = () => {
    player.x = canvas.width / 2;
    player.y = canvas.height - 150;
}
init();

// detect keypress globally and modify the keypress obj
document.addEventListener('keydown', (ev) => {
    let kc = ev.keyCode
    if (kc === 37) keys.left = true; 
    else if (kc === 38) keys.up = true;    
    else if (kc === 39) keys.right = true;
    else if (kc === 40) keys.down = true;
})
document.addEventListener('keyup', (ev) => {
    let kc = ev.keyCode
    if (kc === 37) keys.left = false; 
    else if (kc === 38) keys.up = false;    
    else if (kc === 39) keys.right = false;
    else if (kc === 40) keys.down = false;
})
// loads in the player sprite
let playerSprite = new Image();
playerSprite.src = "./assets/dog.png";
playerSprite.addEventListener('load', () => {
    // the game 'starts' after the player sprite loads in
    window.requestAnimationFrame(draw);
}, false)
let benefitObj1Sprite = new Image();
benefitObj1Sprite.src = "./assets/benefit/" + benefitObjs[0].img;

const dropBenefitObj = (x,y) => {
    ctx.drawImage(benefitObj1Sprite, x, y, benefitObj1Sprite.naturalWidth*.3, benefitObj1Sprite.naturalHeight*.3);
}
const isPlayerCollidedWithObj = () => {
    if(benefitObjs[0].y + benefitObj1Sprite.height <= playerSprite.height) {
        console.log("Hit");
    }
}

// main game loop
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerSprite, player.x, player.y, playerSprite.naturalWidth * .4, playerSprite.naturalHeight * .4);    
    if(keys.left) {
        if(isPlayerEdgeCollision()) {
            player.x = player.x;
        }
        else {
            player.x -= player.speed;
        }             
    }
    else if (keys.right) {
        if(isPlayerEdgeCollision()) {
            player.x = player.x
        }
        else {
            player.x += player.speed;
        }
    }
    benefitObjs[0].y+=0.5;
    dropBenefitObj(150, benefitObjs[0].y);
    isPlayerCollidedWithObj();
    window.requestAnimationFrame(draw);
}

draw();

const isPlayerEdgeCollision = () => {
    if(player.x <= 0) {
        return true;
    }
    else if(playerSprite.width - player.x <= 0) {
        return true;
    }
}