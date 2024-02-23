    // create scene, camera, renderer
    const changeGeometry = function(oldModel, newGeometry){
      oldModel.geometry = newGeometry;
      oldModel.material.needsUpdate = true;
      // oldModel.text = newText;
      let newModel = oldModel;
      return newModel;
    }

    // const loader = new THREE.GLTFLoader();
    // loader.load('new01.glb', function (gltf) {
    //   const model = gltf.scene;
    //   console.log(model);
    //   const textureLoader = new THREE.TextureLoader();
    //   const newTexture = textureLoader.load('666.png');
    //   gltf.scene.traverse(function (child) {
    //     if (child.isMesh) {
    //       child.material.map = newTexture;
    //       child.material.needsUpdate = true;
    //     }
    //   });
    //   scene.add(model);
    // });

    const changeTexture = function(oldModel, newImage){
      console.log('texture',oldModel.material.map);
      let textureLoader = new THREE.TextureLoader(); 
      let texture = textureLoader.load(newImage);
      oldModel.material.map = texture;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100, // This is the field of view in degrees 
      0.75*window.innerWidth / (0.9*window.innerHeight), // This represents the aspect ratio of the camera
      0.01, // This is the near clipping plane
      10000 // This is the far clipping plane
    );camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({alpha: true});renderer.setSize(1420, 955);
    document.getElementById('js-scene').appendChild(renderer.domElement);
    const textureLoader = new THREE.TextureLoader();
    // Add light on scene
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);
    // Set up OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // create objects on scene
      // Cylinder mesh
      const texture = textureLoader.load('4.png');
      const geometry = new THREE.CylinderGeometry(1, 1, 3, 32);
      const material = new THREE.MeshPhongMaterial({ map: texture });
      const cylinder = new THREE.Mesh(geometry, material);
      scene.add(cylinder);
      // console.log(cylinder);
      
    function handleModel(model){
      console.log(model);
      let testGeometry;
      if(model == 'cylinder')testGeometry = new THREE.CylinderGeometry(1, 1, 3, 32);
      if(model == 'cube')testGeometry = new THREE.BoxGeometry(1,1,1);
      changeGeometry( cylinder, testGeometry);
    }
    function handleTexture(Image){
      console.log(Image);
      let newImage;
      if(Image == 't1')newImage = '1.png';
      if(Image == 't2')newImage = '1.jpg';
      if(Image == 't3')newImage = '2.png';
      if(Image == 't4')newImage = '4.png';
      changeTexture(cylinder,newImage);
    }
    // Render function
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        // texture.needsUpdate = true
        renderer.render(scene, camera);
    }
    animate();