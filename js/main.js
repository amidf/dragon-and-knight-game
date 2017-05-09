// This function returns string with first letter in uppercase/
function toCorrectString(string) {

    let correctString = string.toLocaleLowerCase();
    correctString = correctString.split('');

    let firstLetter = correctString[0].toLocaleUpperCase();
    delete correctString[0];
    correctString.unshift(firstLetter);
    correctString = correctString.join('');

    return correctString;

}

// Constuctor for any creature.
function Creature(classCreature, name, health, varHealth, damage) {

    this.class = classCreature;
    this.name = toCorrectString(name);
    this.health = health;
    this.varHealth = health;
    this.damage = damage;

}

// Object game with main properties of the game.
const game = {

    allKnights : [],
    allDragons : []

};

// Object test contains methods for test app, such as printing all creatures in console.
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

// This object contains all Nodes from .modalWindow.
const modalWindowUI = {

    $listClasses : $('.modalWindow select'),
    $nameInput : $('#nameCreature'),
    $healthInput : $('#healthCreature'),
    $damageInput : $('#damageCreature'),
    $createBtn : $('.createBtn'),
    $beginBtn : $('.beginBtn')

};

// This object contains main functions for check correct inputs and check beginning game.
const modalWindow = {

    // Check can player begin the game or not. To begin he must create at least one creature of knight class and dragon class.
    checkCreatures : () => {

        let knight = game.allKnights.length > 0;
        let dragon = game.allDragons.length > 0;

        if ( knight && dragon ) {
            return true;
        } else {
            return false;
        }

    },
    // Check all inputs. If one of them is empty function return false.
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
    // Just clear inputs after creating creature.
    clearInputs : () => {

        const allInputs = $('.modalWindow input');

        for ( let i = 0; i < allInputs.length; i++ ) {

            $(allInputs[i]).val('');

        }

    },
    // Make .beginBtn is allowed.
    offDisabled : () => {

        modalWindowUI.$beginBtn.removeAttr('disabled');

    }

};

// Event listener for .createBtn which creates new creature.
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