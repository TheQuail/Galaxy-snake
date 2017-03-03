var container;
var camera, scene, renderer;
var geometry, group;
var mouseX = 0,
    mouseY = 0;
var mouseXOnMouseDown = 0,
    mouseYOnMouseDown = 0;
var targetRotationX = 0,
    targetRotationY = 0;
var targetRotationXOnMouseDown = 0,
    targetRotationYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mousedown = false;
var previousMousePosition = {
    x: 0,
    y: 0
};

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

init();
animate();
render();
gui.add(camera.position, 'x', -2000, 2000);
gui.add(camera.position, 'y', -2000, 2000);
gui.add(camera.position, 'z', -2000, 2000);
gui.add(group.position, 'y', -2000, 2000);

// gui.add(camera, 'bouncingSpeed', -2000, 0.5);

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;
    camera.position.x = 500;
    camera.position.y = 500;
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 1, 10000);
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    group = new THREE.Group();
    for (var k = 0; k < 11; k++) {
        for (var j = 0; j < 11; j++) {
            for (var i = 0; i < 11; i++) {
                var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                    wireframe: true,
                    color: 0x0000FF
                }));
                mesh.position.x = 500 - 100 * i;
                mesh.position.y = 500 - 100 * j;
                mesh.position.z = 500 - 100 * k;
                mesh.matrixAutoUpdate = false;
                mesh.updateMatrix();
                mesh.rotation.x = Math.PI / 4;
                mesh.rotation.y = Math.PI / 4;
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
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
    mousedown = true;
}

function onDocumentMouseMove(event) {
    var deltaMove = {
        x: event.offsetX - previousMousePosition.x,
        y: event.offsetY - previousMousePosition.y
    };

    if (mousedown) {

        var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));

        group.quaternion.multiplyQuaternions(deltaRotationQuaternion, group.quaternion);
    }

    previousMousePosition = {
        x: event.offsetX,
        y: event.offsetY
    };
}

function onDocumentMouseUp(event) {
    mousedown = false;
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
    var cameratarget = scene.position;
    cameratarget.x = 500;
    cameratarget.y = 500;
    cameratarget.z = 500;
    if (positionstat == target) {
        return 0;
    }
    switch (positionstat) {

    }
    camera.lookAt(cameratarget);
    
    renderer.render(scene, camera);
}


function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}
