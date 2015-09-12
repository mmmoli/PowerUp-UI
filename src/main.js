require('./styles.css');

let powerBar = document.querySelector('#powerBar');


let md = Rx.Observable.fromEvent(document, 'mousedown').map(true);
let mu = Rx.Observable.fromEvent(document, 'mouseup').map(false);

md.subscribe((power) => {
    "use strict";
    console.log(power);
});

powerBar.style.height = `${20}%`;
