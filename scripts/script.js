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

const canvas = document.querySelector("#game"), ctx = canvas.getContext("2d");


