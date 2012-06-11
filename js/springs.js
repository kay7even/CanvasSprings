// Generated by CoffeeScript 1.3.3
(function() {
  var addDot, anchor, anchor_clicked, checkCollision, distance, dots, draw, mouse, returnValidNumber, update, updateDots;

  dots = {};

  mouse = {
    position: {
      x: 0,
      y: 0
    }
  };

  window.springL = 10;

  window.springConstant = 3;

  window.restLength = 200;

  window.mass = 10;

  window.dampening = 5.0;

  window.gravity = 10;

  window.nummber_of_dots = 20;

  anchor_clicked = false;

  anchor = {
    position: {
      x: Math.ceil(Math.random() * $(document).width()),
      y: Math.ceil(Math.random() * $(document).height())
    },
    size: 70,
    color: "rgba(".concat(Math.round(Math.random() * 255), ",", Math.round(Math.random() * 255), ",", Math.round(Math.random() * 255), ", 1)")
  };

  canvas;


  $(function() {
    var canvas, ctx, dot, x;
    dots = (function() {
      var _i, _ref, _results;
      _results = [];
      for (x = _i = 0, _ref = window.nummber_of_dots; 0 <= _ref ? _i < _ref : _i > _ref; x = 0 <= _ref ? ++_i : --_i) {
        _results.push(dot = {
          anchor: false,
          color: "rgba(".concat(Math.round(Math.random() * 255), ",", Math.round(Math.random() * 255), ",", Math.round(Math.random() * 255), ", .75)"),
          position: {
            x: Math.ceil(Math.random() * $(document).width()),
            y: Math.ceil(Math.random() * $(document).height())
          },
          velocity: {
            x: 0,
            y: 0
          },
          acceleration: {
            x: 0,
            y: 0
          }
        });
      }
      return _results;
    })();
    canvas = $("#canvas")[0];
    canvas.width = $(document).width();
    canvas.height = $(document).height();
    console.log(canvas);
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 10, 10);
    return setInterval(draw, 1000 / 60);
  });

  $(canvas).mousemove(function(event) {
    if (anchor_clicked === true) {
      anchor.position.x = event.clientX;
      return anchor.position.y = event.clientY;
    }
  });

  $(canvas).mouseup(function(event) {
    anchor_clicked = false;
    return anchor.size = 70;
  });

  $(canvas).mousedown(function(event) {
    console.log(distance(anchor.position, {
      x: event.clientX,
      y: event.clientY
    }));
    if (distance(anchor.position, {
      x: event.clientX,
      y: event.clientY
    }) < anchor.size) {
      anchor_clicked = true;
      return anchor.size = 80;
    }
  });

  /*
  $(canvas).click((event) ->
      
      for dot in dots
  
          deltaX = dot.position.x - event.clientX
          deltaY = dot.position.y - event.clientY
          
          angle = Math.atan2(deltaX,deltaY)
          
          dot.velocity.x += Math.sin(angle) * 1000
          dot.velocity.y += Math.cos(angle) * 1000
      
  )
  */


  checkCollision = function(dotA, dotB) {
    return false;
  };

  distance = function(positionA, positionB) {
    return Math.sqrt(Math.pow(positionA.x - positionB.x, 2) + Math.pow(positionA.y - positionB.y, 2));
  };

  addDot = function() {};

  updateDots = function() {
    var dot, new_dots, x;
    if (window.nummber_of_dots !== dots.length) {
      if (window.nummber_of_dots > dots.length) {
        new_dots = (function() {
          var _i, _ref, _ref1, _results;
          _results = [];
          for (x = _i = _ref = dots.length, _ref1 = window.nummber_of_dots; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; x = _ref <= _ref1 ? ++_i : --_i) {
            _results.push(dot = {
              anchor: false,
              color: "rgba(".concat(Math.round(Math.random() * 255), ",", Math.round(Math.random() * 255), ",", Math.round(Math.random() * 255), ", .75)"),
              position: {
                x: Math.ceil(Math.random() * $(document).width()),
                y: Math.ceil(Math.random() * $(document).height())
              },
              velocity: {
                x: 0,
                y: 0
              },
              acceleration: {
                x: 0,
                y: 0
              }
            });
          }
          return _results;
        })();
        dots = dots.concat(new_dots, dots);
      }
      if (window.nummber_of_dots < dots.length) {
        return dots = dots.splice(0, window.nummber_of_dots);
      }
    }
  };

  update = function() {
    var cosO, dist, dot, sinO, springStretch, _i, _len, _results;
    updateDots();
    _results = [];
    for (_i = 0, _len = dots.length; _i < _len; _i++) {
      dot = dots[_i];
      sinO = (dot.position.x - anchor.position.x) / window.springL;
      cosO = (dot.position.y - anchor.position.y) / window.springL;
      if (dot === void 0 || anchor === void 0) {
        dist = 0;
      } else {
        dist = distance(dot.position, anchor.position);
      }
      springStretch = dist - window.restLength;
      dot.acceleration.x = -(window.springConstant / window.mass) * springStretch * sinO - (window.dampening / window.mass) * dot.velocity.x;
      dot.acceleration.y = window.gravity - (window.springConstant / window.mass) * springStretch * cosO - (window.dampening / window.mass) * dot.velocity.y;
      dot.acceleration.x = returnValidNumber(dot.acceleration.x);
      dot.acceleration.y = returnValidNumber(dot.acceleration.y);
      dot.velocity.x += dot.acceleration.x * 0.01;
      dot.velocity.y += dot.acceleration.y * 0.01;
      dot.velocity.x = returnValidNumber(dot.velocity.x);
      dot.velocity.y = returnValidNumber(dot.velocity.y);
      dot.position.x += dot.velocity.x * 0.01;
      _results.push(dot.position.y += dot.velocity.y * 0.01);
    }
    return _results;
  };

  returnValidNumber = function(value) {
    if (!isFinite(value) || isNaN(value)) {
      value = 0;
    }
    return value;
  };

  draw = function() {
    var ctx, dot, _i, _len;
    update();
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (_i = 0, _len = dots.length; _i < _len; _i++) {
      dot = dots[_i];
      ctx.beginPath();
      ctx.fillStyle = dot.color;
      ctx.arc(dot.position.x, dot.position.y, 40, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.strokeStyle = dot.color;
      ctx.moveTo(dot.position.x, dot.position.y);
      ctx.lineTo(anchor.position.x, anchor.position.y);
      ctx.stroke();
    }
    ctx.fillStyle = anchor.color;
    ctx.beginPath();
    ctx.arc(anchor.position.x, anchor.position.y, anchor.size, 0, Math.PI * 2, true);
    ctx.closePath();
    return ctx.fill();
  };

}).call(this);