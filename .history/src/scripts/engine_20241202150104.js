const state = {
    audio: {
        backgroundAudio: false,
    },
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    playerSides: {
        player1: "player-cards",
        player1Box: document.querySelector("#player-cards"),
        player2: "computer-cards",
        player2Box: document.querySelector("#computer-cards"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },
};

const pathImages = "./src/assets/icons/";

const cardData = [{
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf: [2],
        loseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1],
    },
];

let currentAudio = null;

function init() {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.player2);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

async function drawCards(cardsNumber, fieldSide) {
    for (let i = 0; i < cardsNumber; i++) {
        const randomCard = await getRandomCard();
        const cardImage = await createCardImage(randomCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function createCardImage(card, fieldSide) {
    const cardImage = document.createElement("img");

    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", card.id);
    cardImage.classList.add("card");

    if (fieldSide === state.playerSides.player1) {
        cardImage.addEventListener("click", async() => {
            await setCardsField(cardImage.getAttribute("data-id"));
        });

        cardImage.addEventListener("mouseover", async() => {
            await drawSelectedCard(card.id);
        });
    }

    return cardImage;
}

async function setCardsField(cardId) {
    await removeAllCardsImages();
    const computerCard = await getRandomCard();
    const playerCard = cardData[cardId];

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    // Cria imagens dentro das divs, se necessário
    if (!state.fieldCards.player.querySelector('img')) {
        const playerCardImage = document.createElement('img');
        playerCardImage.setAttribute('height', '150px');
        state.fieldCards.player.appendChild(playerCardImage);
    }

    if (!state.fieldCards.computer.querySelector('img')) {
        const computerCardImage = document.createElement('img');
        computerCardImage.setAttribute('height', '150px');
        state.fieldCards.computer.appendChild(computerCardImage);
    }

    // Atribui os src das imagens
    state.fieldCards.player.querySelector('img').src = playerCard.img;
    state.fieldCards.computer.querySelector('img').src = computerCard.img;

    const duelResult = await checkDuelResult(playerCard, computerCard);

    await updateScore();
    await drawButton(duelResult);
}

async function resetDuel() {
    state.cardSprites.name.innerText = "Selecione";
    state.cardSprites.type.innerText = "uma carta";
    state.cardSprites.avatar.src = "";

    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.player2);
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function drawButton(result) {
    state.actions.button.innerText = result.toUpperCase();
    state.actions.button.style.display = "block";
}

async function checkDuelResult(playerCard, computerCard) {
    let duelResult = "draw";

    if (playerCard.winOf.includes(computerCard.id)) {
        duelResult = "win";
        state.score.playerScore++;
    }

    if (playerCard.loseOf.includes(computerCard.id)) {
        duelResult = "lose";
        state.score.computerScore++;
    }

    await playAudio(duelResult);
    return duelResult;
}

async function