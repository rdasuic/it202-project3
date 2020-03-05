// this script loads in all the images
// loads in the player sprite
let playerSprite = new Image();
playerSprite.src = "./assets/dog.png";
playerSprite.addEventListener('load', () => {
    // the game 'starts' after the player sprite loads in
    window.requestAnimationFrame(draw);
}, false)
//loads in the first benefit obj
let benefitObj1Sprite = new Image();
benefitObj1Sprite.src = "./assets/benefit/sb.png";