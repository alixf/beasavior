window.onload = function()
{
    var cities = 
    [
        {name : "London", x : 0.5023, y : 0.2141},
        {name : "Moscow", x: 0.5992, y: 0.2146},
        {name : "Beijing", x: 0.8031, y: 0.3147},
        {name : "Los Angeles", x: 0.1720, y: 0.2927},
        {name : "Vancouver", x: 0.1659, y: 0.2219},
        {name : "Mexico", x: 0.2452, y: 0.4026},
        {name : "Bogota", x: 0.3112, y: 0.4929},
        {name : "Moscow", x: 0.5992, y: 0.2146},
        {name : "Valparaiso", x: 0.3112, y: 0.6514},
        {name : "Punta Arenas", x: 0.3026, y: 0.7908},
        {name : "Madrid", x: 0.4869, y: 0.2805},
        {name : "Bombay", x: 0.7091, y: 0.4172},
        {name : "Cairo", x: 0.5944, y: 0.3342},
        {name : "Dakar", x: 0.4564, y: 0.3879},
        {name : "Singapour", x: 0.7860, y: 0.4856},
        {name : "Sydney", x: 0.9191, y: 0.6907},
        {name : "New York", x: 0.2904, y: 0.2854},
        {name : "Lima", x: 0.2806, y: 0.5491},
        {name : "Sao Paulo", x: 0.3698, y: 0.6296},
        {name : "Johannesburg", x: 0.5858, y: 0.6614},
        {name : "Manille", x: 0.8355, y: 0.4124}
    ];
    
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audio = create_sound(audioCtx,0,0,0);
    
	var container = $("#WebGL");
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.width(), container.height());
    container.append(renderer.domElement);

    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera( 75, container.width()/container.height(), 0.1, 2100);
    //var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.001, 1000 );
    scene.add(camera);
    
    var skydome = new Skydome(THREE.ImageUtils.loadTexture('textures/skydome.jpg'));
    scene.add(skydome);
    var vector = new THREE.Vector3();
    var raycaster = new THREE.Raycaster();


	camera.position.z = 1000;
	camera.lookAt(new THREE.Vector3(0,0,0));

    //create a new mesh with sphere geometry
    var sphereMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('textures/earth.jpg'), transparent : true, opacity : 1.0 } );
	var radius = 300;
    var earth = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64), sphereMaterial);
	scene.add(earth);
    
	

    var area1 = new Area(0.5, 0.26, "cool");
    var area2 = new Area(0.914, 0.705, "crisis");
    earth.add(area1);
    earth.add(area2);
    //earth.add(area3);

    var path = new Path(area1.position, area2.position);
    earth.add(path);
    
    container.on('mousemove', onMouseMove);
	//window.addEventListener('resize', onWindowResize, false);

    
    var controls = new THREE.OrbitControls(camera, container[0]);
	controls.target.set(0, 0, 0);
	controls.rotateSpeed = 0.4;
	controls.zoomSpeed   = 1.2;
	controls.panSpeed    = 0.3;
	controls.noRotate    = false;
	controls.noZoom      = false;
	controls.noPan       = true;
	controls.minDistance = 800;
	controls.maxDistance = 1000;

    var mouse = {x:0.0, y:0.0};

	function generateArea(){
		var ret;
		var id = Math.floor((Math.random() * 10) + 0);
		var crisisOrCool = Math.floor((Math.random()*100)+0);
		if(crisisOrCool >= 65)
			crisisOrCool = "cool";
		else crisisOrCool = "crisis";

		return ret = {id : id, crisisOrCool : crisisOrCool};
	}

	function areaUnavailable(area){
		var randomAreaInfos = generateArea();
		newArea = new Area(cities[randomAreaInfos.id].x, cities[randomAreaInfos.id].y, randomAreaInfos.crisisOrCool);
		console.log("area is already a node. rerolling");
	}

	function rerollArea(area){
		var newArea;
		earth.children.forEach(function(entry){
		   		if(entry.name == area.name){
		   			return false;
				}
			});
		return true;
	}
    
	function onMouseMove(e)
    {
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    };
    
    function onWindowResize(e)
    {
		containerWidth = window.innerWidth;
		containerHeight = window.innerHeight;
		renderer.setSize(containerWidth, containerHeight);
		camera.aspect = containerWidth / containerHeight;
		camera.updateProjectionMatrix();
	}

	function addNewNode(){
		var randomAreaInfos = generateArea();
		var area = new Area(cities[randomAreaInfos.id].x, cities[randomAreaInfos.id].y, randomAreaInfos.crisisOrCool);
		while(areaUnavailable(area)){
			area = rerollArea;
		}
		earth.add(area);
	}
    
    earth.rotateY(1.5);
    
    var lastTime = (new Date()).getTime();
    var chrono = 0;
    var render = function()
    {
        //console.log(document.querySelector('#slider1').value);
        
        // Compute time
        var time = (new Date()).getTime();
        var dt = (time - lastTime) / 1000.0;
        lastTime = time;
        chrono += dt;


        
        skydome.rotateY(dt * 0.033);
        
        requestAnimationFrame(render);
        update_sound(audio.osc, audio.gain, 440, audio.pan, (area2.position.x-camera.position.x)/200,(area2.position.y-camera.position.y)/200,(area2.position.z-camera.position.z)/200);

        vector.set(mouse.x, mouse.y, 0.1).unproject(camera);
        raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());
        var intersections = raycaster.intersectObjects(scene.children, true);
        for(i = 0; i < intersections.length; ++i)
        {
            if(intersections[i].object.hover != null)
                intersections[i].object.hover();
        }
        
    	controls.update();
	   	
    	if(chrono > 15){
    		addNewNode();
    		chrono = 0;
    	}

	   	earth.children.forEach(function(entry){
	   		if(entry.update != null)
	   			entry.update(dt);
		});

       	renderer.render(scene, camera);
    };

    render();

};

