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
};