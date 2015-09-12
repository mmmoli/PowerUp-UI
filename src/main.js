require('./styles.css');

let powerBar = document.querySelector('#powerBar');


let md = Rx.Observable.fromEvent(document, 'mousedown').map(true);
let mu = Rx.Observable.fromEvent(document, 'mouseup').map(false);

let source = Rx.Observable.interval(100);

md
    .flatMapLatest(() => source.takeUntil(mu))
    .subscribe((power) => {
        "use strict";
        powerBar.style.height = `${power * 0.4}%`;
    });


