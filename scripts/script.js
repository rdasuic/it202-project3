const canvas = document.querySelector("#game"), ctx = canvas.getContext("2d");
canvas.focus()
let player = {
    health: 100,
    x: 0,
    y: 0,
    score: 0,
    harmsHit: 0,
    benefitsHit: 0,
    speed: 1,
    lives: 9,
    width: playerSprite.width
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
        y: 0,
        x: 150,
        width: benefitObj1Sprite.width
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


const dropBenefitObj = (x,y) => {
    ctx.drawImage(benefitObj1Sprite, x, y, benefitObj1Sprite.naturalWidth*.3, benefitObj1Sprite.naturalHeight*.3);
}
const isPlayerCollidedWithObj = () => {

    if(!((benefitObjs[0].x > player.width + player.x) || (player.x > benefitObj1Sprite.width + benefitObjs[0].x)) && //checks x bounds
       (benefitObjs[0].y - canvas.height + playerSprite.height >= 0)) { //checks y bounds
        benefitObjs[0].y = 0;
        console.log("Hit");
    }
}

// main game loop
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerSprite, player.x, player.y, playerSprite.naturalWidth * .25, playerSprite.naturalHeight * .25);    
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
    benefitObjs[0].y+=0.2;
    dropBenefitObj(150, benefitObjs[0].y);
    isPlayerCollidedWithObj();
    // when the obj scrolls past the screen
    if(benefitObjs[0].y == canvas.height) {
        benefitObjs[0].y = 0;
    }
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