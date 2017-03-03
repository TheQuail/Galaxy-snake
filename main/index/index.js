var container;
var camera, scene, renderer;
var geometry, group;
var mouseX = 10000,
    mouseY = 10000;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
/**
 * 标志着现在摄像机的位置
 * 0：
 * 1：
 * 2：
 * 3：
 * 4：
 * 5：
 * 6：
 * 7：
 * 8：
 */
var positionstat = 0;
var gui = new dat.GUI();

document.addEventListener('mousemove', onDocumentMouseMove, false);
init();
animate();
render();
gui.add(camera.position, 'x', -2000, 2000);
gui.add(camera.position, 'y', -2000, 2000);
gui.add(camera.position, 'z', -2000, 2000);
// gui.add(camera, 'bouncingSpeed', -2000, 0.5);

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
    group = new THREE.Group();

    for(var k = 0; k < 10; k++){
      for(var j = 0; j < 10; j++){
        for(var i = 0; i < 10; i++){
          var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({wireframe: true,color: 0x0000FF}));
          mesh.position.x = 0.5 * 2000 - 100 * i;
          mesh.position.y = 0.5 * 2000 - 100 * j;
          mesh.position.z = 0.5 * 2000 - 100 * k;
          mesh.matrixAutoUpdate = false;
          mesh.updateMatrix();
          group.add(mesh);
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
    render();
}

/**
 *
 *
 * @param {integer} target
 * @returns
 * 0:目标镜头和当前镜头位置相同，不做改变
 * 1:转换到目标镜头
 */
function render(target) {
    if (positionstat == target) {
        return 0;
    }
    switch (positionstat) {

    }
    // var time = Date.now() * 0.001;
    // var rx = Math.sin(time * 0.7) * 0.5,
    //     ry = Math.sin(time * 0.3) * 0.5,
    //     rz = Math.sin(time * 0.2) * 0.5;
    // camera.position.x -= 2;
    // camera.position.z -= 2;
    // camera.position.y += 100;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
<<<<<<< HEAD
}
function change_camera() {
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 2000;
  camera.position.x = 2000;
  camera.position.y = 2000;
}
=======
}
>>>>>>> origin/master
