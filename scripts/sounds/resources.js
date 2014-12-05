function create_sound_resources(audioCtx)
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
	oscillator.frequency.value = 220;

	modulator.connect(gainNode);
	gainNode.connect(oscillator.frequency);
	oscillator.connect(panner);
	panner.connect(out);

	modulator.type = 'sin';
	modulator.start();
	oscillator.type = 'sin';
	oscillator.start();


	oscillator.onended = function() {
	  console.log('Your tone has now stopped playing!');
	}

	return {osc:oscillator, gain:gainNode, pan:panner};
}

function update_position_resources(pan,x,y,z)
{
	console.log({x:x,y:y,z:z});
    pan.setPosition(x,y,z);
}

function stop_sound_resources(osc)
{
	oscillator.stop();
}

