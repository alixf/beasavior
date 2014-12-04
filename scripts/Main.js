window.onload = function()
{

	//create a WebGL renderer, a camera, and a scene
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
	
    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    scene.add(camera);

	camera.position.z = 100;
	camera.position.y = 0;
    camera.lookAt(new THREE.Vector3(0,0,0));

    //create a new mesh with sphere geometry
    //var sphereMaterial = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('uv.png'), transparent : true, opacity : 0.5});
    var sphereMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('textures/earth.jpg') } );
	var sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 64, 64), sphereMaterial);

    var projector = new THREE.Projector();
	var mouseVector = new THREE.Vector3();
    
	//add the sphere to the scene
	scene.add(sphere);

    var u = 0.62;
    var v = 0.62;
    
    var PI = 3.14159;
    var theta = 2.0 * PI * u;
    var phi = PI * v;

    x = Math.cos(theta) * Math.sin(phi) * 50;
    y = Math.sin(theta) * Math.sin(phi) * 50;
    z = -Math.cos(phi) * 50;
	var newSphere = new THREE.Mesh(new THREE.SphereGeometry(5, 16, 16), new THREE.MeshBasicMaterial({color : 0xFF0000, transparent : true, opacity : 0.5}));
    newSphere.position.set(x, y, z);
    sphere.add(newSphere);
    
    
	window.addEventListener( 'mousemove', onMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
    
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
    
    var render = function ()
    {
        requestAnimationFrame(render);
        sphere.rotateY(0.005);
        renderer.render(scene, camera);
    };

    render();
};