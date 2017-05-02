let knight = {
    name: 'Knight',
    health: 230,
    varHealth: 230,
    damage: 50
};

let dragon = {
    name: 'Dragon',
    health: 230,
    varHealth: 230,
    damage: 50
};

const view = {

    $beginBtn        : document.querySelector('.beginBtn'),
    $endBtn          : document.querySelector('.endBtn'),
    $knightHealth    : document.querySelector('.knight .health-line'),
    $knightText      : document.querySelector('.knight .bar-text'),
    $knightCard      : document.querySelector('.knight-card .details'),
    $dragonHealth    : document.querySelector('.dragon .health-line'),
    $dragonText      : document.querySelector('.dragon .bar-text'),
    $dragonCard      : document.querySelector('.dragon-card .details'),
    $console         : document.querySelector('.console')

};

(function () {
    
    let objs = [knight, dragon];
    let cards = [view.$knightCard, view.$dragonCard];
    
    for ( let i = 0; i < objs.length; i++ ) {

        for (let prop in objs[i]) {
            
            const li = document.createElement('li');
            const spanName = document.createElement('span');
            const spanValue = document.createElement('span');
            
            let name = prop.split('');
            let firstLetter = name[0].toUpperCase();
            delete name[0];
            name.unshift(firstLetter);
            name = name.join('');
            
            spanName.textContent = `${name}: `;
            spanValue.textContent = `${objs[i][prop]}`;
            
            cards[i].appendChild(li);
            li.appendChild(spanName);
            li.appendChild(spanValue);
        
        }  
    }
    
})();


function fight() {
    
    let knightDamage = Math.floor(Math.random() * knight.damage) + 1;
    let dragonDamage = Math.floor(Math.random() * dragon.damage) + 1;

    const winMsg = document.createElement('p');
    winMsg.className = 'win-msg';

    const knightMsg = document.createElement('p');
    knightMsg.className = 'knight-msg';

    const dragonMsg = document.createElement('p');
    dragonMsg.className = 'dragon-msg';

    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'empty';

    let firstChild = view.$console.childNodes[0];
    
    if ( (knight.varHealth - dragonDamage) <= 0 ) {
        knight.varHealth = 0;

        winMsg.textContent = 'Dragon won!';

        view.$console.insertBefore(winMsg, firstChild);

        firstChild = view.$console.childNodes[0];

        view.$console.insertBefore(emptyMsg, firstChild);

    } else if ( (dragon.varHealth - knightDamage) <= 0 ) {
        dragon.varHealth = 0;

        winMsg.textContent = 'Knight won!';

        view.$console.insertBefore(winMsg, firstChild);

        firstChild = view.$console.childNodes[0];

        view.$console.insertBefore(emptyMsg, firstChild);
    } else {
        knight.varHealth -= dragonDamage;
        dragon.varHealth -= knightDamage;

        knightMsg.textContent = `Knight inflicted damage on ${knightDamage} points.`;
        dragonMsg.textContent = `Dragon inflicted damage on ${dragonDamage} points.`;

        view.$console.insertBefore(knightMsg, firstChild);
        firstChild = view.$console.childNodes[0];

        view.$console.insertBefore(dragonMsg, firstChild);

        firstChild = view.$console.childNodes[0];

        view.$console.insertBefore(emptyMsg, firstChild);
    }
    
    view.$dragonHealth.style.width = (dragon.varHealth * 100) / dragon.health + '%';
    view.$dragonText.textContent = `${dragon.varHealth} HP`;
    
    view.$knightHealth.style.width = (knight.varHealth * 100) / knight.health + '%';
    view.$knightText.textContent = knight.varHealth + '  HP';
}

view.$beginBtn.addEventListener('click', () => {
    
    if ( knight.varHealth === 0 || dragon.varHealth === 0 ) {
        view.$endBtn.click();
    } else {
        fight();
    }
    
});

view.$endBtn.addEventListener('click', () => {
    knight.varHealth = knight.health;
    dragon.varHealth = dragon.health;
        
    view.$knightHealth.style.width = 100 + '%';
    view.$knightText.textContent = knight.health + ' HP';
        
    view.$dragonHealth.style.width = 100 + '%';
    view.$dragonText.textContent = dragon.health + ' HP';

    const restartMsg = document.createElement('p');
    const firstChild = view.$console.childNodes[0];

    restartMsg.className = 'restart-msg';
    restartMsg.textContent = 'The Game was restarted!';

    view.$console.insertBefore(restartMsg, firstChild);
});

view.$knightText.textContent = knight.health + ' HP';
view.$dragonText.textContent = dragon.health + ' HP';

