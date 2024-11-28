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
const playersSides = {
    player1: "player-field-card",
    computer: "computer-field-card",
}
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
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [2],
    },
    {
        id: 2,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [0],
        LoseOf: [1],
    },



];

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
    }
}

function init() {
    drawCards(5, "player");
    drawCards(5, "computer");

}


init();