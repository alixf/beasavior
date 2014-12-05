var xline = T("sin", {freq:1, mul:200, add:80});
var freq  = T("sin", {freq:xline, mul:200, add:80});

var earthquake = T("pulse", {freq:freq, mul:0.10});

earthquake.play();