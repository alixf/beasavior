window.onload = function()
{
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audio = create_sound(audioCtx,0,0,0);
	//create a WebGL renderer, a camera, and a scene
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2100 );
    //var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.001, 1000 );
    scene.add(camera);
    
    var skydome = new Skydome(THREE.ImageUtils.loadTexture('textures/skydome.jpg'));
    scene.add(skydome);
    console.log("hi");
    var vector = new THREE.Vector3();
    var raycaster = new THREE.Raycaster();


	camera.position.z = 1000;
	camera.lookAt(new THREE.Vector3(0,0,0));

    //create a new mesh with sphere geometry
    var sphereMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('textures/earth.jpg') } );
	var radius = 300;
    var earth = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64), sphereMaterial);
	scene.add(earth);

    var area1 = new Area(0.5, 0.26, "cool");
    var area2 = new Area(0.914, 0.705, "crisis");
    earth.add(area1);
    earth.add(area2);
    
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    
    var controls = new THREE.OrbitControls(camera);
	controls.target.set(0, 0, 0);
	controls.rotateSpeed = 0.4;
	controls.zoomSpeed   = 1.2;
	controls.panSpeed    = 0.3;
	controls.noRotate    = false;
	controls.noZoom      = false;
	controls.noPan       = true;
	controls.minDistance = 500;
	controls.maxDistance = 1200;

    var mouse = {x:0.0, y:0.0};
	function onMouseMove(e)
    {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    };
    
    function onWindowResize(e)
    {
		containerWidth = window.innerWidth;
		containerHeight = window.innerHeight;
		renderer.setSize(containerWidth, containerHeight);
		camera.aspect = containerWidth / containerHeight;
		camera.updateProjectionMatrix();
	}
    
    earth.rotateY(1.5);
    
    var lastTime = (new Date()).getTime();

    var render = function()
    {
        // Compute time
        var time = (new Date()).getTime();
        var dt = (time - lastTime) / 1000.0;
        lastTime = time;
        
        requestAnimationFrame(render);
        update_sound(audio.osc, audio.gain, 440, audio.pan, (area2.position.x-camera.position.x)/200,(area2.position.y-camera.position.y)/200,(area2.position.z-camera.position.z)/200);

        vector.set(mouse.x, mouse.y, 0.1).unproject(camera);
        raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());
        console.log(camera.position.x-area2.position.x);
        var intersections = raycaster.intersectObjects(scene.children, true);
        for(i = 0; i < intersections.length; ++i)
        {
            if(intersections[i].object.hover != null)
                intersections[i].object.hover();
        }
        
    	controls.update();
	   	
        area1.update(dt);
        area2.update(dt);
        
       	renderer.render(scene, camera);
    };

    render();
};