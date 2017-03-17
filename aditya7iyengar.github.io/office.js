if ( ! Detector.webgl ) {
  Detector.addGetWebGLMessage();
  document.getElementById( 'container' ).innerHTML = "";

}

var container, stats;
var camera, scene, renderer;
var camera_cf;

var parameters = {
  width: 2000,
  height: 2000,
  widthSegments: 250,
  heightSegments: 250,
  depth: 1500,
  param: 4,
  filterparam: 1
}


init();
animate();

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.5, 3000000);
  camera.position.set(20000, 1500, 20000);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.userPan = true;
  controls.userPanSpeed = 0.0;
  controls.maxDistance = 50000.0;
  controls.maxPolarAngle = Math.PI * 2;
  controls.center.set( 0, 500, 0 );

  var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
  light.position.set( -1, 0, -1 );
  scene.add(light);

  var light2 = new THREE.SpotLight(0xffffff);
  light2.position.set(-1,-1, -1);
  scene.add(light2);

  var carpet_tex = THREE.ImageUtils.loadTexture("textures/office_carpet.jpg");
  /* for repeat to work, the image size must be 2^k */

  /* repeat the texture 4 times in both direction */

  var floor =  new THREE.Mesh(
    new THREE.BoxGeometry(48000,48000,50),
    new THREE.MeshPhongMaterial({color:0xfefefefe, ambient:0x1d6438a, map:carpet_tex})
  );
  floor.rotation.x = -Math.PI *0.5;
  floor.position.x = - 4000;
  floor.position.y = - 1250;
  scene.add(floor);

  var outer_box = new THREE.Mesh(
    new THREE.BoxGeometry(48000, 48000, 5000),
    new THREE.MeshPhongMaterial({color:0xfefefefe, ambient:0x1d6438})
  );
  outer_box.material.side = THREE.BackSide;
  outer_box.rotation.x = -Math.PI *0.5;
  outer_box.position.x = - 4000;
  outer_box.position.y = 1250;
  scene.add(outer_box);

  var room1 = new THREE.Mesh(
    new THREE.BoxGeometry(12000, 12000, 5000),
    new THREE.MeshPhongMaterial({color:0xfefefefe, ambient:0x1d6438})
  );
  room1.rotation.x = -Math.PI *0.5;
  room1.position.x = - 22000;
  room1.position.y = 1250;
  room1.position.z = - 18000;
  scene.add(room1);
}


//

function animate() {

    requestAnimationFrame( animate );
    render();

}


function render() {
  var time = performance.now() * 0.001;

  controls.update();
  renderer.render( scene, camera );

}
