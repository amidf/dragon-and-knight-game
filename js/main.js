function toCorrectString(string) {

    let correctString = string.toLocaleLowerCase();
    correctString = correctString.split('');

    let firstLetter = correctString[0].toLocaleUpperCase();
    delete correctString[0];
    correctString.unshift(firstLetter);
    correctString = correctString.join('');

    return correctString;

}

function Creature(classCreature, name, health, varHealth, damage) {

    this.class = classCreature;
    this.name = toCorrectString(name);
    this.health = health;
    this.varHealth = health;
    this.damage = damage;

}

const game = {

    allKnights : [],
    allDragons : []

};

const test = {

    printProps : () => {

        console.clear();

        for ( let i = 0; i < game.allKnights.length; i++ ) {

            for ( let key in game.allKnights[i] ) {

                console.log(`${key} : ${game.allKnights[i][key]}`);

            }

            console.log('');

        }

        for ( let j = 0; j < game.allDragons.length; j++ ) {

            for ( let key in game.allDragons[j] ) {

                console.log(`${key} : ${game.allDragons[j][key]}`);

            }

        }

    }

};

const modalWindowUI = {

    $listClasses : $('.modalWindow select'),
    $nameInput : $('#nameCreature'),
    $healthInput : $('#healthCreature'),
    $damageInput : $('#damageCreature'),
    $createBtn : $('.createBtn'),
    $beginBtn : $('.beginBtn')

};

const modalWindow = {

    checkCreatures : () => {

        let knight = game.allKnights.length > 0;
        let dragon = game.allDragons.length > 0;

        if ( knight && dragon ) {
            return true;
        } else {
            return false;
        }

    },
    checkInputs : () => {
        const allInputs = $('.modalWindow input');
        let check = true;

        for ( let i = 0; i < allInputs.length; i++ ) {

            if ( $(allInputs[i]).val() === '' ) {
                check = false;
            }

        }

        if ( check ) {
            return true;
        } else {
            return false;
        }

    },
    clearInputs : () => {

        const allInputs = $('.modalWindow input');

        for ( let i = 0; i < allInputs.length; i++ ) {

            $(allInputs[i]).val('');

        }

    },
    offDisabled : () => {

        modalWindowUI.$beginBtn.removeAttr('disabled');

    }

};

modalWindowUI.$createBtn.on('click', () => {

    let classCreature = modalWindowUI.$listClasses.val();
    let nameCreature = modalWindowUI.$nameInput.val();
    let healthCreature = modalWindowUI.$healthInput.val();
    let damageCreature = modalWindowUI.$damageInput.val();
    let checkInputs = modalWindow.checkInputs();

    if ( checkInputs ) {
        if ( classCreature === 'knight' ) {
            game.allKnights.push(new Creature(classCreature, nameCreature, healthCreature, healthCreature, damageCreature));
        } else if ( classCreature === 'dragon' ) {
            game.allDragons.push(new Creature(classCreature, nameCreature, healthCreature, healthCreature, damageCreature));
        }
    } else {
        alert('One of inputs is empty');
    }

    test.printProps();

    let checkCreatures = modalWindow.checkCreatures();

    if ( checkCreatures ) {
        modalWindow.offDisabled();
    }

    modalWindow.clearInputs();

});