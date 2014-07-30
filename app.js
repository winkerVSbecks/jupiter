var squishing = false;

var type = 'svg'; //'webgl' 'canvas'
var two = new Two({
  type: Two.Types[type],
  fullscreen: true
}).appendTo(document.body);

Two.Resolution = 32;

var curves = [
  // new Squiggle(10, 0, two.height / 2 - 40),
  new Squiggle(10, 0, two.height / 2, true)
  // new Squiggle(10, 0, two.height / 2 + 40)
];

two
  .bind('update', function(frameCount) {
    if (!squishing) {
      squishing = true;
      for (var i = curves.length - 1; i >= 0; i--) {
        curves[i].squish(frameCount);
      };
    }
  }).play();

// Random number in range
function randomNumber(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}