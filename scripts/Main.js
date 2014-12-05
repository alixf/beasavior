window.onload = function()
{
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audio = create_sound(audioCtx,0,0,0);
	//create a WebGL renderer, a camera, and a scene
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var scene = new THREE.Scene();
    
    //var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.001, 1000 );
    scene.add(camera);

	camera.position.z = 1000;
	//camera.position.y = 500;
    camera.lookAt(new THREE.Vector3(0,0,0));

    //create a new mesh with sphere geometry
    //var sphereMaterial = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('uv.png'), transparent : true, opacity : 0.5});
    var sphereMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('textures/earth.jpg') } );
	var radius = 300;
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64), sphereMaterial);

    
    var projector = new THREE.Projector();
	var mouseVector = new THREE.Vector3();
    
	//add the sphere to the scene
	scene.add(sphere);

    
	var newSphere = new THREE.Mesh(new THREE.SphereGeometry(radius/10, 16, 16), new THREE.MeshBasicMaterial({color : 0xFF0000, transparent : true, opacity : 0.5}));
    sphere.add(newSphere);
    
    
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    


	function onMouseMove(e)
    {
       /* mouseVector.x = 2 * (e.clientX / window.innerWidth) - 1;
		mouseVector.y = 1 - 2 * ( e.clientY / window.innerHeight );

		var raycaster = projector.pickingRay(mouseVector.clone(), camera);
        intersects = raycaster.intersectObjects(cubes.children);

		scene.children.forEach(function(o)
        {
			o.material.color.setRGB(o.grayness, o.grayness, o.grayness);
		});
        
        for(var i = 0; i < intersects.length; i++)
        {
			var intersection = intersects[i], obj = intersection.object;
			obj.material.color.setRGB(1.0 - i / intersects.length, 0, 0);
		}*/
    };
    
    function onWindowResize(e)
    {
		containerWidth = window.innerWidth;
		containerHeight = window.innerHeight;
		renderer.setSize( containerWidth, containerHeight );
		camera.aspect = containerWidth / containerHeight;
		camera.updateProjectionMatrix();
	}
    
    function getXYZFromUV(u, v, radius)
    {
        var u = 1.5 - u;
        var v = 1 - v; 
        var theta = 2.0 * Math.PI * u;
        var phi = Math.PI * v;
        x = Math.cos(theta) * Math.sin(phi) * radius;
        y = Math.sin(theta) * Math.sin(phi) * radius;
        z = -Math.cos(phi) * radius;
        return new THREE.Vector3(x, z, y);
    }
    
    i = 0;
    var render = function()
    {
        i++;
        requestAnimationFrame(render);
        sphere.rotateY(0.01);
        
        var newPosition = getXYZFromUV(0.917, 0.690, radius);
        newSphere.position.set(newPosition.x, newPosition.y, newPosition.z);
        update_sound(audio.osc, audio.gain, i, audio.pan, newPosition.x,newPosition.y,newPosition.z);
        renderer.render(scene, camera);
    };

    render();
};