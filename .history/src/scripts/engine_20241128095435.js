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
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [0],
    },

    {
        id: 1,
        name: "Exodia",
        type: "Paper",
        img: `${pathImages}exodia.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 2,
        name: "Blue eyes White Dragon",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [1],
        LoseOf: [2],
    },



];



function init() {


}


init();