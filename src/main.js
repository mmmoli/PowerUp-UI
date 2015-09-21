require('./styles.css');

console.clear();

var powerBar = document.querySelector('#powerBar');

var mouseDownStream = Rx.Observable.fromEvent(document, 'mousedown');
var mouseUpStream = Rx.Observable.fromEvent(document, 'mouseup');

var tick = Rx.Observable.generate(
    0,
    function (x) { return true; },
    function (x) { return x + 1; },
    function (x) { return x; },
    Rx.Scheduler.requestAnimationFrame
);



var diffForceUpStream = mouseDownStream

        .flatMap(() => {
            return tick.takeUntil(mouseUpStream);
        })

        .map((value) => 0.1 * value)

    ;


var diffForceDownStream = mouseUpStream

        .flatMap(() => {
            return tick.takeUntil(mouseDownStream);
        })

        .map((value) => 0.02 * value)

    ;



var diffForceStream = diffForceUpStream.combineLatest(
    diffForceDownStream,
    (up, down) => {
        return up - down;
    }
).filter((value) => value >= 0);


diffForceStream.subscribe((value) => {

    value.reduce
    powerBar.style.height = `${value}%`;
});