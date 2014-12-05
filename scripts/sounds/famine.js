var xline = T("sin", {freq:1, mul:200, add:800});
var freq  = T("sin", {freq:xline, mul:200, add:800});

var famine = T("sin", {freq:freq, mul:0.25}).play();

famine.play();