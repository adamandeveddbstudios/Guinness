let flagWrap = document.querySelector('section.flag'),
    scene, camera, renderer,
    lodder, geometry, material,
    flag, clock
      
function init(){
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffe4e1) // canvas bg
  
  // camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
  camera = new THREE.PerspectiveCamera( 75, flagWrap.clientWidth / flagWrap.clientHeight, 0.1, 1000 )

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  // renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setSize(flagWrap.clientWidth, flagWrap.clientHeight)
    
  flagWrap.appendChild( renderer.domElement )
  window.addEventListener('resize', onResize, false)
  
  loader = new THREE.TextureLoader()
  geometry = new THREE.PlaneGeometry(5, 3, 50, 30)
  material = new THREE.MeshBasicMaterial({
    // color: 0xff0000,
    // wireframe: true,
    map: loader.load('https://i.postimg.cc/7Z06qn9Q/danny-g-ht-YDlrr-Kfu-M-unsplash.jpg')
  })
  
  flag = new THREE.Mesh( geometry, material )
  scene.add( flag )
  camera.position.z = 5
  
  flag.rotation.set(-.1, 0, 0) // flag container를 살짝 비스듬이 놓이게 함
  
  clock  = new THREE.Clock()
  
  animate() // wave효과
}

function animate() {
  let position = geometry.getAttribute('position'),
      vertex = new THREE.Vector3()
 
  for(let i = 0; i < position.count; i++){
    vertex.fromBufferAttribute(position, i)
    
    let time = clock.getElapsedTime(),
        waveX1 = .15 * Math.sin(vertex.x * 2 + time),
        waveX2 = .25 * Math.sin(vertex.x * 3 + time * 2),
        waveY1 =  .1 * Math.sin(vertex.y + time),
        multi = (vertex.x + 2.5) / 5, // PlaneGeometry(width, ..)값을 가져와서 쓴 것임
        flagWave =  (waveX1 + waveX2) * multi
    
    position.setZ(i, waveX1 + waveY1)
  } 
  position.needsUpdate = true;
  
  // image rotate animation
  // flag.rotation.y += .01
  // flag.rotation.x += .01
  
  // Update
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

function onResize(){
  camera.aspect = flagWrap.clientWidth / flagWrap.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(flagWrap.clientWidth, flagWrap.clientHeight);
}

init()