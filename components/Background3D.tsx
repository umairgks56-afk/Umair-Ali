
import React, { useRef, useEffect, useContext } from 'react';
import * as THREE from 'three';
import { ThemeContext } from '../App';

const Background3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Dynamic Grid
    const gridHelper = new THREE.GridHelper(40, 40, '#ef4444', '#ef4444');
    gridHelper.position.y = -5;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.05;
    scene.add(gridHelper);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: '#ef4444',
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Architectural Elements
    const floatingGroup = new THREE.Group();
    const prismMat = new THREE.MeshStandardMaterial({ 
      color: '#ef4444', 
      wireframe: true, 
      transparent: true, 
      opacity: 0.15 
    });

    const prismGeo = new THREE.OctahedronGeometry(1, 0);
    for (let i = 0; i < 8; i++) {
      const prism = new THREE.Mesh(prismGeo, prismMat);
      prism.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      prism.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      prism.scale.setScalar(Math.random() * 0.5 + 0.5);
      floatingGroup.add(prism);
    }
    scene.add(floatingGroup);

    const mainKnotGeo = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 20);
    const mainKnotMat = new THREE.MeshPhysicalMaterial({ 
      color: '#ef4444', 
      wireframe: true,
      emissive: '#ef4444',
      emissiveIntensity: 0.2,
      metalness: 0.9,
      roughness: 0.1,
    });
    const mainKnot = new THREE.Mesh(mainKnotGeo, mainKnotMat);
    mainKnot.position.set(0, 0, -8);
    scene.add(mainKnot);

    const pointLight = new THREE.PointLight('#ef4444', 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    scene.add(ambientLight);

    camera.position.z = 8;

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      floatingGroup.children.forEach((child, i) => {
        child.rotation.x += 0.005;
        child.rotation.y += 0.003;
        child.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
      });

      mainKnot.rotation.x += 0.002;
      mainKnot.rotation.y += 0.001;
      mainKnot.position.y = Math.sin(Date.now() * 0.0005) * 0.5;

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.02;
      camera.position.z = 8 + (scrollY * 0.002);
      
      camera.lookAt(0, 0, -5);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      prismGeo.dispose();
      prismMat.dispose();
      mainKnotGeo.dispose();
      mainKnotMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-[-1] ${isDark ? 'opacity-60' : 'opacity-10'}`} 
    />
  );
};

export default Background3D;
