function create_sound_crisis(audioCtx)
{

var out = audioCtx.destination;
var panner = audioCtx.createPanner();
var listener = audioCtx.listener;
panner.panningModel = 'HRTF';
panner.setPosition(100,100,100);

var lowshelf = audioCtx.createBiquadFilter(),
    mid = audioCtx.createBiquadFilter(),
    highshelf = audioCtx.createBiquadFilter();

 lowshelf.type = 3;
 mid.type = 5;
 highshelf.type = 4;

// create Oscillator and gain node
var modulator = audioCtx.createOscillator();
modulator.frequency.value = 2;

var gainNode = audioCtx.createGain();
gainNode.gain.value = 25;

var oscillator = audioCtx.createOscillator();
oscillator.frequency.value = 440;

modulator.connect(gainNode);
gainNode.connect(oscillator.frequency);
oscillator.connect(lowshelf);
lowshelf.connect(mid);
mid.connect(highshelf);
highshelf.connect(panner);
panner.connect(out);

modulator.type = 'sawtooth';
modulator.start();
oscillator.type = 'sawtooth';
oscillator.start();


oscillator.onended = function() {
  console.log('Your tone has now stopped playing!');
}

return {osc:oscillator, gain:gainNode, pan:panner, low:lowshelf, mid:mid, high:highshelf};
}

function update_position_crisis(pan,x,y,z)
{
    pan.setPosition(x,y,z);
}

function update_eq_crisis(low,mid,high,value_low,value_mid,value_high)
{
    low.gain.value = value_low;
    mid.gain.value = value_mid;
    high.gain.value = value_high;
}

function stop_sound_crisis(osc)
{
	oscillator.stop();
}

