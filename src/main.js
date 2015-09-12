require('./styles.css');

let powerBar = document.querySelector('#powerBar');


let mouseDownStream = Rx.Observable.fromEvent(document, 'mousedown').map(true);
let mouseUpStream = Rx.Observable.fromEvent(document, 'mouseup').map(false);

let tick = Rx.Observable.interval(100);


//let shouldPowerUpStream = Rx.Observable.merge(mouseDownStream, mouseUpStream);
//

var chargeUpStream = mouseDownStream

        .flatMap(() => {
            return tick.takeUntil(mouseUpStream)
        })

        .map((x) => {

            // x represents a duration of time
            // that we should power up

            // Use x to determine potency
            // of the charge

            // Return the new charge value
            return x * 2;
        })

    ;

var chargeDownStream = mouseUpStream

        .flatMap(() => {
            return tick.takeUntil(mouseDownStream)
        })

        .map((x) => {

            // x represents a duration of time
            // that we should power up

            // Use x to determine potency
            // of the charge

            // Return the new charge value
            return x * -0.2;
        })

    ;


let chargeStream = Rx.Observable.merge(chargeUpStream, chargeDownStream)

        .scan((sum, x) => {
            return sum + x;
        })

        .filter(value => value >= 0)

    ;


chargeStream.subscribe((value) => {
    "use strict";
    console.log(value);
    powerBar.style.height = `${value * 0.4}%`;
});

//
//md
//    .flatMap(() => tick.takeUntil(mu))
//    .subscribe((power) => {
//        "use strict";

//    });
//


var source = Rx.Observable
    .range(1, 8)
    .flatMapLatest(function (x) {
        return Rx.Observable.from([x + 'a', x + 'b']);
    });

var subscription = source.subscribe(
    function (x) {
        console.log('Next: %s', x);
    },
    function (err) {
        console.log('Error: %s', err);
    },
    function () {
        console.log('Completed');
    });

