
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor('rgb(20,20,40)');

//scene.fog = new THREE.FogExp2(0xffffff,0.1);

document.body.appendChild(renderer.domElement);

//-----------------------------Initiating Objects --------------------------------------------------------------
camera.position.set(0,50,50);

var clock = new THREE.Clock();
var control = new THREE.OrbitControls(camera);

//camera.lookAt(0,0,0);

//--------------------------------Loaders------------------------------------------------------------------------
var loader =  new THREE.TextureLoader();
var seaTexture = loader.load('textures/Sea.jpg');
seaTexture.wrapS = THREE.RepeatWrapping;
seaTexture.wrapT = THREE.RepeatWrapping;
seaTexture.repeat.set(1.5,1.5);
//--------------------------------Geometries--------------------------------------------------------------------

var box = getBox(1000,window.innerHeight/2,1000);
box.position.set(0,-box.geometry.parameters.height/2,0);

var plane = getPlane(1000,32,seaTexture);
plane.rotation.x = - Math.PI/2;
plane.name = 'plane';


//---------------------------------Lights------------------------------------------------------------------------

var ambientLight= getAmbientLight(2);




//-----------------------------Adding to Scene-------------------------------------------------------------------

scene.add(box);
scene.add(plane);
scene.add(ambientLight);

//--------------------------------functions----------------------------------------------------------------------

function getBox(l, w ,h)
{
	var geometry = new THREE.BoxGeometry(l,w,h);
	var material = new THREE.MeshPhongMaterial({color:'rgb(0,0,255,0.2)', wireframe:box,side:THREE.DoubleSide});
	var box = new THREE.Mesh(geometry,material);

	return box;
}

function getPlane(size,segments,texture)
{
	var geometry = new THREE.PlaneGeometry(size,size,segments,segments);
	var material = new THREE.MeshPhongMaterial({color:'rgb(0,0,255)',wireframe:false, side:THREE.DoubleSide, map:texture, bumpMap:texture});
	var mesh = new THREE.Mesh(geometry,material);

	return mesh;
}

function getAmbientLight(intensity)
{
	var light = new THREE.AmbientLight('rgb(10,30,50)',intensity);

	return light;
}

function animate(){

	var plane = scene.getObjectByName("plane");
	plane.position.y = 5;
	var planeVertices = plane.geometry.vertices;
	var elapsedTime = clock.getElapsedTime();
	for(var i=0; i<planeVertices.length; i++)
	{
		var vertex = planeVertices[i];
		vertex.z = Math.sin(elapsedTime + i ) *5 % 5;
	//	vertex.x = Math.sin(elapsedTime + i ) *2;
	//	vertex.y = Math.sin(elapsedTime + i ) *2;
	}
	plane.geometry.verticesNeedUpdate = true;

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
