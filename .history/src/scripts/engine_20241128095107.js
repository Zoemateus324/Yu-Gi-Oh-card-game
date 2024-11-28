const state = {
    score: {
        playerScore: 0,
        computerScore: 0,

        scoreBox: document.getElementById('score_points'),
    },
    cardSprites: {
        avatar: document.getElementById('card_image'),
        name: document.getElementById('card_name'),
        type: document.getElementById('card_type'),
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    actions: {

        button: document.getElementById('next-duel'),
    },
};

const pathImages = ".src/assets/icons/";
const cardData = [{
    id: 0,
    name: "Blue eyes White Dragon",
    type: "Paper",
    img: `${pathImages}./src/assets/icons/dragon.png`,
}, ];



function init() {


}


init();