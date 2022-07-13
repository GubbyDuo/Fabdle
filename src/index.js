const maxCards = 1620;
let cardData = "";
window.onload = doStuff;

async function doStuff() {
    const cardInput = document.getElementById("cardSelectInput");
    const dropDownOptions = document.getElementsByClassName("datalist-option");
    let data = await getCards();
    let selectedCard = sendData(data);

    cardInput.addEventListener("input", function () {
        console.log(data.data);
        let inputValue = cardInput.value;
        let valuecounter = 0;
        let color = "";
        for (let i = 0; valuecounter < 5; i++) {
            if (data.data[i].name.toLowerCase().includes(inputValue)) {
                if (data.data[i].stats.resource) {
                    switch (data.data[i].stats.resource) {
                        case 1:
                            color = "red";
                            break;
                        case 2:
                            color = "yellow";
                            break;
                        case 3:
                            color = "blue";
                            break;
                    }
                    cardNameAndColor = data.data[i].name + "-" + color;
                } else {
                    cardNameAndColor = data.data[i].name;
                }
                dropDownOptions[valuecounter].value = cardNameAndColor;
                valuecounter++;
            }
        }
    });
}

async function getCards() {
    const response = await fetch(
        `https://api.fabdb.net/cards?per_page=${maxCards}`,
    );

    let data = await response.json();

    return data;
}

function sendData(data) {
    let selectingCard = true;
    while (selectingCard) {
        randomNum = Math.floor(Math.random() * maxCards);
        console.log(randomNum);
        selectedCard = data.data[randomNum];
        if (
            !selectedCard.keywords.includes("hero") &&
            !selectedCard.keywords.includes("ally") &&
            !selectedCard.keywords.includes("equipment")
        ) {
            console.log("Is not a hero.");
            selectingCard = false;
        }
    }
    return selectedCard;
}
