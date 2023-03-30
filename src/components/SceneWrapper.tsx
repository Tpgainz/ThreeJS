import { useRef, useEffect } from 'react';
import * as THREE from 'three';

type SceneProps = {
  color: THREE.ColorRepresentation | undefined
};

const MyScene = ({ color }: SceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const { width, height } = containerRef.current.getBoundingClientRect();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    const textureLoader = new THREE.TextureLoader();
    const geleeTexture = textureLoader.load('/gelee.png');

    const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color,
  map: geleeTexture,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

    camera.position.z = 5;

    // Cube rotate by 90 degree on each step on a random axis


    const animate = () => {
      requestAnimationFrame(animate);
      const rotationSpeed = 0.01;
      const xRotation = Math.random() * rotationSpeed;
        const yRotation = Math.random() * rotationSpeed;
        const zRotation = Math.random() * rotationSpeed;
        cube.rotation.x += xRotation;
        cube.rotation.y += yRotation;
        cube.rotation.z += zRotation;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        const { width, height } = containerRef.current?.getBoundingClientRect() || {
            width: 0,
            height: 0,
        };
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        containerRef.current?.removeChild(renderer.domElement);
    };
    }, [color]);


  return <div className='w-screen h-screen'
   ref={containerRef} />;
};

export default MyScene;