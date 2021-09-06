import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js";

var q =
	"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMjU4fQ&auto=format&fit=crop&w=827&q=80";

var e =
	"https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&auto=format&fit=crop&w=1033&q=80";

var p =
	"https://images.unsplash.com/photo-1504333638930-c8787321eee0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

var a =
	"https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=696&q=80";

var s_group = new THREE.Group();
var s_galax = new THREE.Group();

function main() {
	const canvas = document.querySelector("#canvas");
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: true
	});
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(18);
	//--
	camera.near = 1;
	camera.far = 2000;
	camera.position.z = -10;
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	//--
	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 0, 0);
	controls.update();
	controls.enableZoom = false;
	//--
	scene.fog = new THREE.Fog(0x391809, 9, 15);
	scene.add(s_group);
	scene.add(s_galax);
	//--
	function createLights() {
		const l_ambient = new THREE.HemisphereLight(0xffffff, 0x00a1a2, 1);
		const r_ambient = new THREE.DirectionalLight(0x333333, 4);
		r_ambient.position.set(5, 5, 5);
		r_ambient.lookAt(0, 0, 0);
		r_ambient.castShadow = true;
		r_ambient.shadow.mapSize.width = 512;
		r_ambient.shadow.mapSize.height = 512;
		r_ambient.shadow.camera.near = 0.5;
		r_ambient.shadow.camera.far = 500;
		scene.add(r_ambient);
	}
	//--

	function e_material(value) {
		value == undefined ? (value = a) : (value = value);
		const o = new THREE.TextureLoader().load(value);
		return o;
	}

	function e_envMap() {
		const t_envMap = new THREE.TextureLoader().load(a);
		t_envMap.mapping = THREE.EquirectangularReflectionMapping;
		t_envMap.magFilter = THREE.LinearFilter;
		t_envMap.minFilter = THREE.LinearMipmapLinearFilter;
		t_envMap.encoding = THREE.sRGBEncoding;
		//---
		return t_envMap;
	}
	var c_mat, a_mes, b_mes, c_mes, d_mes;
	function createElements() {
		const a_geo = new THREE.IcosahedronBufferGeometry(1, 5);
		const b_geo = new THREE.TorusKnotBufferGeometry(0.6, 0.25, 100, 15);
		const c_geo = new THREE.TetrahedronGeometry(1, 3);
		const d_geo = new THREE.TorusGeometry(2, 0.4, 3, 60);

		c_mat = new THREE.MeshStandardMaterial({
			envMap: e_envMap(),
			map: e_material(e),
			aoMap: e_material(e),
			bumpMap: e_material(q),
			lightMap: e_material(p),
			emissiveMap: e_material(q),
			metalnessMap: e_material(e),
			displacementMap: e_material(p),
			flatShading: false,
			roughness: 0.0,
			emissive: 0x333333,
			metalness: 1.0,
			refractionRatio: 0.94,
			emissiveIntensity: 0.1,
			bumpScale: 0.01,
			aoMapIntensity: 0.0,
			displacementScale: 0.0
		});
	}
	const options = {
		material: {
			s: "Smooth"
		},
		geometry: {
			g: "Planet"
		}
	};

	function createPoints(value, size) {
		const geometry = new THREE.BufferGeometry();
		const positions = [];
		const n = size ? size : 20,
			n2 = n / 2;
		for (let i = 0; i < (value ? value : 15000); i++) {
			const x = Math.random() * n - n2;
			const y = Math.random() * n - n2;
			const z = Math.random() * n - n2;
			positions.push(x, y, z);
		}
		geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(positions, 3)
		);
		geometry.computeBoundingSphere();
		const material = new THREE.PointsMaterial({ size: 0.02 });
		const points = new THREE.Points(geometry, material);
		s_galax.add(points);
	}

	function animation() {
		requestAnimationFrame(animation);
		let time = Date.now() * 0.003;
		s_group.rotation.y -= 0.001;
		s_group.rotation.x += 0.0005;
		s_galax.rotation.z += 0.001 / 4;
		s_galax.rotation.x += 0.0005 / 4;
		camera.lookAt(scene.position);
		camera.updateMatrixWorld();
		renderer.render(scene, camera);
	}

	function onWindowResize() {
		const w = window.innerWidth;
		const h = window.innerHeight;
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		renderer.setSize(w, h);
	}
	createElements();
	createPoints();
	createLights();
	onWindowResize();
	animation();
	window.addEventListener("resize", onWindowResize, false);
}

window.addEventListener("load", main, false);
