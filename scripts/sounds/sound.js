function create_sound(audioCtx)
{

var out = audioCtx.destination;
var panner = audioCtx.createPanner();
var listener = audioCtx.listener;
panner.panningModel = 'HRTF';
panner.setPosition(100,100,100);

// create Oscillator and gain node
var modulator = audioCtx.createOscillator();
modulator.frequency.value = 2;

var gainNode = audioCtx.createGain();
gainNode.gain.value = 25;

var oscillator = audioCtx.createOscillator();
oscillator.frequency.value = 440;

modulator.connect(gainNode);
gainNode.connect(oscillator.frequency);
oscillator.connect(panner);
panner.connect(out);

modulator.type = 'sawtooth';
modulator.start();
oscillator.type = 'sawtooth';
oscillator.start();


oscillator.onended = function() {
  console.log('Your tone has now stopped playing!');
}

return {osc:oscillator, gain:gainNode, pan:panner};
}

function update_sound(osc, gain, f,pan,x,y,z)
{
	f = (f % 500);
	//console.log({x:x,y:y,z:z});
    //osc.frequency.value = f;
    //gain.gain.value = 0.02;
    pan.setPosition(x,y,z);
}


