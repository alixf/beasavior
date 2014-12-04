window.onload = function()
{
<<<<<<< .merge_file_a09120
	//I'm gonna set a scene!

	//scene size
	var WIDTH = 400, HEIGHT = 300;

	//setting some camera attributes
	var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

	//get the DOM element to attach to
	var container = $('#container');
=======
>>>>>>> .merge_file_a08680

	//create a WebGL renderer, a camera, and a scene
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
	
    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    scene.add(camera);

	camera.position.z = 100;

<<<<<<< .merge_file_a09120
	//create the sphere's material
	var sphereMaterial = new THREE.MeshBasicMaterial(
		{
			color: 0xCC0000
		});

	//create a new mesh with sphere geometry
	var sphere = new THREE.Mesh(
		new THREE.SphereGeometry(
			radius,
			segments,
			rings),
		sphereMaterial);

	//add the sphere to the scene
	scene.add(sphere);
=======
    //create a new mesh with sphere geometry
    var sphereMaterial = new THREE.MeshBasicMaterial({color : 0xffffff, transparent : true, opacity : 0.5});
	var sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 64, 64), sphereMaterial);

	//add the sphere to the scene
	scene.add(sphere);
    
    var render = function ()
    {
        requestAnimationFrame( render );

        renderer.render(scene, camera);
    };

    render();
>>>>>>> .merge_file_a08680
};