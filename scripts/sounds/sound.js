function create_sound(audioCtx)
{

var out = audioCtx.destination;
var panner = audioCtx.createPanner();
var listener = audioCtx.listener;
panner.panningModel = 'HRTF';
panner.setPosition(100,100,100);

// create Oscillator and gain node
var modulator = audioCtx.createOscillator();
modulator.frequency.value = 1;

var gainNode = audioCtx.createGain();
gainNode.gain.value = 10;

var oscillator = audioCtx.createOscillator();
oscillator.frequency.value = 300;

modulator.connect(oscillator.frequency);
oscillator.connect(panner);
panner.connect(out);

var maxFreq = 6000;
var maxVol = 0.02;

var initialFreq = 3000;
var initialVol = 0.001;

oscillator.type = 'square';
oscillator.frequency.value = initialFreq;
oscillator.detune.value = 100;
oscillator.start();
modulator.start();

oscillator.onended = function() {
  console.log('Your tone has now stopped playing!');
}

gainNode.gain.value = initialVol;
return {osc:oscillator, gain:gainNode, pan:panner};
}

function update_sound(osc, gain, f,pan,x,y,z)
{
	f = (f % 500);
    osc.frequency.value = f;
    gain.gain.value = 0.02;
    pan.setPosition(x,y,z);
}


