var container;
var camera, scene, renderer;
var geometry, group;
var mouseX = 10000,
    mouseY = 10000;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
document.addEventListener('mousemove', onDocumentMouseMove, false);
init();
animate();
render();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 2000;
    camera.position.x = 2000;
    camera.position.y = 2000;
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 1, 10000);
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshNormalMaterial({
        wireframe: true
    });
    group = new THREE.Group();

    for(var k = 0; k < 10; k++){
      for(var j = 0; j < 10; j++){
        for(var i = 0; i < 10; i++){
          var mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = 0.5 * 2000 - 100 * i;
          mesh.position.y = 0.5 * 2000 - 100 * j;
          mesh.position.z = 0.5 * 2000 - 100 * k;
          mesh.matrixAutoUpdate = false;
          mesh.updateMatrix();
          group.add(mesh);
        }
      }
    }


    scene.add(group);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    // mouseX = (event.clientX - windowHalfX) * 10;
    // mouseY = (event.clientY - windowHalfY) * 10;
}

function animate() {
    requestAnimationFrame(animate);
    // render();
}

function render() {
    var time = Date.now() * 0.001;
    var rx = Math.sin(time * 0.7) * 0.5,
        ry = Math.sin(time * 0.3) * 0.5,
        rz = Math.sin(time * 0.2) * 0.5;
    // camera.position.x += (mouseX - camera.position.x) * .05;
    // camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);
    group.rotation.x = 0;
    group.rotation.y = 0;
    group.rotation.z = 0;
    renderer.render(scene, camera);
}
