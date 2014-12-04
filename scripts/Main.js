window.onload = function()
{
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

	//create a WebGL renderer, a camera, and a scene
	var renderer = new THREE.WebGLRenderer();

	var camera =
		new THREE.PerspectiveCamera(
			VIEW_ANGLE,
			ASPECT,
			NEAR,
			FAR);

	var scene = new THREE.Scene();

	//add the camera to the scene
	scene.add(camera);

	//the camera starts at 0,0,0 so we must pull it back a bit
	camera.position.z = 300;

	//set renderer size, thus launching it
	renderer.setSize(WIDTH, HEIGHT);

	//attach the renderer to the container inside the DOM
	$container.append(renderer.domElement);

	//and now I'm gonna make a sphere
	
	//sphere vars
	var radius = 50, segments = 16, rings = 16;

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
};