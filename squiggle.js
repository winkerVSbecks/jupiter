var Squiggle = function(thickness, rotation, yLoc, simple) {
  noise.seed(Math.random());
  var l = two.makeLine(two.width / 8, two.height / 2, 7 * two.width / 8, two.height / 2);
  l.translation.set(two.width / 2, yLoc);
  l.subdivide();
  var v = l.vertices;
  l.remove();

  var pts = [];
  for (var i = 0; i < v.length; i++) {
    var a = new Two.Anchor(v[i].x, v[i].y);
    pts.push(a);
  }

  this.simple = simple;

  // make curve with the points of this line
  this.c = two.makeCurve(pts, true);
  this.c.stroke = '#FFFFFF'; //#EFD050
  this.c.noFill();
  this.c.linewidth = thickness;
  this.c.cap = 'round';
  this.c.join = 'round';
  this.c.rotation = rotation;
  this.c.translation.set(two.width / 2, yLoc);
};


// Squish using noise function
Squiggle.prototype.squish = function(time) {
  for (var i = 0; i < this.c.vertices.length; i++) {
    var d = this.c.vertices[i];
    // From base
    // d.x = v[i].x + 25 * Math.random();
    // d.y = v[i].y + 10 * randomNumber(-1, 1);

    // Cumulative
    // d.y = d.y + 1 * randomNumber(-1, 1);

    // Noise Based
    if (this.simple)
      var value = noise.simplex3(this.c.vertices[i].x / 100, this.c.vertices[i].y / 100, time);
    else
      var value = noise.perlin3(this.c.vertices[i].x / 100, this.c.vertices[i].y / 100, time);

    d.y = (d.y + value);
  }
  squishing = false;
};