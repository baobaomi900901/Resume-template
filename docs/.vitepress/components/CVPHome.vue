<script setup lang="ts">
// import VPHomeHero from "./CVPHomeHero.vue";
// import VPHomeFeatures from "./CVPHomeFeatures.vue";
// import VPHomeContent from "./CVPHomeContent.vue";
import { useData } from "vitepress";
import { ref, nextTick } from "vue";
import * as THREE from "three";
import loading from "../../components/loading.vue";
import FontFaceObserver from "fontfaceobserver";

const { frontmatter: fm } = useData();

const name = ref("");
const text = ref("");
const tagline = ref("");
const image = ref();
const actions = ref([]);
const features = ref([]);

const textContainer = ref();
let easeFactor = 0.02;
let scene, camera, renderer, planeMesh;
let mousePosition = { x: 0.5, y: 0.5 };
let targetMousePosition = { x: 0.5, y: 0.5 };
let prevPosition = { x: 0.5, y: 0.5 };

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;

  void main() {
    vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);

    vec2 mouseDirection = u_mouse - u_prevMouse;

    vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

    vec2 uvOffset = strength * -mouseDirection * 0.4;
    vec2 uv = vUv - uvOffset;

    vec4 color = texture2D(u_texture, uv);
    gl_FragColor = color;
  }
`;
function createTextTexture(text, font, size, color, fontWeight = "100") {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const canvasWidth = window.innerWidth * 2;
  const canvasHeight = window.innerHeight * 2;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.fillStyle = color || "#1b1b1f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const fontSize = size || Math.floor(canvasWidth * 2);

  ctx.fillStyle = "#fff";
  ctx.font = `${fontWeight} ${fontSize}px "${font || "Blanquotey"}"`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;

  const scaleFactor = Math.min(1, (canvasWidth * 1) / textWidth);
  const aspectCorrection = canvasWidth / canvasHeight;

  ctx.setTransform(
    scaleFactor,
    0,
    0,
    scaleFactor / aspectCorrection,
    canvasWidth / 2,
    canvasHeight / 2
  );

  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = fontSize * 0.005;
  for (let i = 0; i < 3; i++) {
    ctx.strokeText(text, 0, 0);
  }
  ctx.fillText(text, 0, 0);

  return new THREE.CanvasTexture(canvas);
}

function initializeScene(texture) {
  scene = new THREE.Scene();

  const aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera(
    -1,
    1,
    1 / aspectRatio,
    -1 / aspectRatio,
    0.1,
    1000
  );
  camera.position.z = 1;

  let shaderUniforms = {
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_prevMouse: { type: "v2", value: new THREE.Vector2() },
    u_texture: { type: "t", value: texture },
  };

  planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: shaderUniforms,
      vertexShader,
      fragmentShader,
    })
  );

  scene.add(planeMesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x1b1b1f, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  textContainer.value.appendChild(renderer.domElement);
}

function reloadTexture() {
  const newTexture = createTextTexture(
    "  MOBY  ",
    "Blanquotey",
    null,
    "#ffffff",
    "100"
  );
  planeMesh.material.uniforms.u_texture.value = newTexture;
}

function animateScene() {
  requestAnimationFrame(animateScene);

  mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
  mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

  planeMesh.material.uniforms.u_mouse.value.set(
    mousePosition.x,
    1.0 - mousePosition.y
  );

  planeMesh.material.uniforms.u_prevMouse.value.set(
    prevPosition.x,
    1.0 - prevPosition.y
  );

  renderer.render(scene, camera);
}

function handleMouseMove(event) {
  easeFactor = 0.035;
  let rect = textContainer.value.getBoundingClientRect();
  prevPosition = { ...targetMousePosition };

  targetMousePosition.x = (event.clientX - rect.left) / rect.width;
  targetMousePosition.y = (event.clientY - rect.top) / rect.height;
}

function handleMouseEnter(event) {
  easeFactor = 0.01;
  let rect = textContainer.value.getBoundingClientRect();

  mousePosition.x = targetMousePosition.x =
    (event.clientX - rect.left) / rect.width;
  mousePosition.y = targetMousePosition.y =
    (event.clientY - rect.top) / rect.height;
}

function handleMouseLeave() {
  easeFactor = 0.01;
  targetMousePosition = { ...prevPosition };
}

function onWindowResize() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  camera.left = -1;
  camera.right = 1;
  camera.top = 1 / aspectRatio;
  camera.bottom = -1 / aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  reloadTexture();
}

nextTick(() => {
  name.value = fm.value.hero.name;
  text.value = fm.value.hero.text;
  tagline.value = fm.value.hero.tagline;
  image.value = fm.value.hero.image.src;
  actions.value = fm.value.hero.actions;
  features.value = fm.value.features;

  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Foldit:wght@100..900&display=swap";
  link.rel = "stylesheet";

  const link2 = document.createElement("link");
  link2.href = "https://fonts.cdnfonts.com/css/blanquotey";
  link2.rel = "stylesheet";
  document.head.appendChild(link);
  document.head.appendChild(link2);

  const font = new FontFaceObserver("Foldit");
  const font2 = new FontFaceObserver("blanquotey");
  Promise.all([font.load(), font2.load()]).then(
    function () {
      console.log("Both fonts have loaded");
      initializeScene(
        createTextTexture("  MOBY  ", "Blanquotey", null, "#1b1b1f", "100")
      );
      animateScene();
    },
    function () {
      console.log("One or more fonts failed to load");
    }
  );
  textContainer.value.addEventListener("mousemove", handleMouseMove);
  textContainer.value.addEventListener("mouseenter", handleMouseEnter);
  textContainer.value.addEventListener("mouseleave", handleMouseLeave);

  window.addEventListener("resize", onWindowResize, false);
});
</script>

<template>
  <loading></loading>
  <div class="VPHome">
    <div ref="textContainer" class="textContainer"></div>
    <slot name="home-hero-before" />
    <div>{{ name }}</div>
    <div>{{ text }}</div>
    <div>{{ tagline }}</div>
    <img :src="image" />
    <div v-for="item in actions" :key="item?.text" :class="item?.theme">
      <a :href="item?.link">
        <div><img :src="item?.img" /></div>
        <div>{{ item?.text }}</div>
      </a>
    </div>

    <div v-for="item in features" :key="item?.title" :class="item?.theme">
      <a :href="item?.link">
        <div><img :src="item?.img" /></div>
        <div>{{ item?.title }}</div>
        <div>{{ item?.details }}</div>
      </a>
    </div>

    <!-- <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content />
    </VPHomeContent>
    <Content v-else /> -->
  </div>
</template>

<style lang="less" scoped>
@import url("https://fonts.cdnfonts.com/css/blanquotey");
.VPHome {
  margin-bottom: 96px;
  position: relative;

  .brand {
    background: red;
  }
  .alt {
    background: blue;
  }

  .textContainer {
    font-family: "blanquotey", sans-serif;

    // position: absolute;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    canvas {
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

@media (min-width: 768px) {
  .VPHome {
    margin-bottom: 128px;
  }
}
</style>
