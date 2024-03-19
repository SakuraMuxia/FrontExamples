var value1 = 0, value2 = 0, value3 = 0;

for ( var i = 1; i <= 3; i++) {
  var i2 = i;
  (function() {
    var i3 = i;
    setTimeout(function() {
      value1 += i;
      value2 += i2;
      value3 += i3;
    }, 1);
  })();
}

setTimeout(function() {
        console.log(value1, value2, value3);
}, 100);