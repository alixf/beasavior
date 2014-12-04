var xline = T("sin", {freq:1, mul:20, add:800});
var freq  = T("sin", {freq:xline, mul:650, add:90});

var epidemic = T("sin", {freq:freq, mul:0.25});

epidemic.play();