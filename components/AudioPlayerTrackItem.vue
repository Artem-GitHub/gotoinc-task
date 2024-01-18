<script setup>
const emit = defineEmits(['audio-ended']);

const props = defineProps({
  audio: {
    type: Object,
    required: true,
  },
});

const pseudoButton = ref(null);
const canvasElement = ref(null);
const audioTimeDuration = ref(0);
const audioCurrentTimeInSeconds = ref(0);
let canvasContext = null;
let canvasWidth = 0;
let canvasHeight = 0;
let audioFile = null;
let audioContext = null;
let decodedAudioData = null;
let audioElement = null;
let tempTimeCount = 0;
const frequencyArrayData = [];

const store = usePlayerStore();

const currentAudioElement = computed(() => {
  return store.activeAudioElement.id === props.audio.id;
});

const audioTime = computed(() => {
  if (currentAudioElement.value)
    return audioCurrentTimeInSeconds.value;
  else return audioTimeDuration.value || 0;
});

watch(() => store.activeAudioElement.id, newValue => {
  clearProgressFrequency();
  tempTimeCount = 0;
});

onMounted(() => {
  getAudioFile();
  initCanvas();
});

onBeforeUnmount(() => {
  removeEvents();
  URL.revokeObjectURL(audioFile);
});

function initCanvas () {
  canvasContext = canvasElement.value.getContext('2d');
  canvasWidth = canvasElement.value.width;
  canvasHeight = canvasElement.value.height;
  canvasContext.fillStyle = '#DDDDDD';
};

function createAudioContext () {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
};

async function decodeAudioFile () {
  const arrayBuffer = await audioFile.arrayBuffer();
  decodedAudioData = await audioContext.decodeAudioData(arrayBuffer);
};

function getAverageOfChannels (widthUnit) {
  let сhannelAverage = null;
  const numberOfChannels = decodedAudioData.numberOfChannels;
  const iterationStep =  Math.floor(decodedAudioData.length / canvasWidth);
  const index = iterationStep * widthUnit;

  for (let channel = 0; channel < numberOfChannels; channel++) {
    сhannelAverage += decodedAudioData.getChannelData(channel)[index] / numberOfChannels;
  }

  return Math.abs(сhannelAverage);
};

function convertToPrimeNumber (number) {
  if (number < 2) return 1;
  else if (number === 2) return 3;
  else if (number > 2 && !Boolean(number % 2)) return number + 1;
  else return number;
};

function drawAudioBaseFrequency () {
  for (let widthUnit = 0; widthUnit < canvasWidth; widthUnit++) {
    const сhannelAverage = getAverageOfChannels(widthUnit);
    const frequencyHeight = convertToPrimeNumber(Math.floor(canvasHeight * сhannelAverage));
    const fromX = widthUnit;
    const fromY = Math.ceil((canvasHeight - frequencyHeight) / 2);
    const toY = frequencyHeight;

    canvasContext.fillRect(fromX, fromY, 1, toY);
    frequencyArrayData[fromX] = { fromY, toY };
  }
};

function drawAudioProgressFrequency (time) {
  const result = canvasWidth / audioTimeDuration.value;
  const widthUnit = Math.floor(time * result);
  // console.log(canvasWidth, audioTimeDuration.value, canvasWidth / audioTimeDuration.value);

  for (tempTimeCount; tempTimeCount < widthUnit; tempTimeCount++) {
    const { fromY, toY } = frequencyArrayData[tempTimeCount];
    const fromX = tempTimeCount;
    canvasContext.fillRect(fromX, fromY, 1, toY);
  }
};

function clearProgressFrequency () {
  canvasContext.fillStyle = '#DDDDDD';

  for (let widthUnit in frequencyArrayData) {
    const fromX = widthUnit;
    const { fromY, toY } = frequencyArrayData[widthUnit];
    canvasContext.clearRect(fromX, fromY, 1, canvasHeight);
    canvasContext.fillRect(fromX, fromY, 1, toY);
  }
};

function createAudioElement () {
  const audioUrl = URL.createObjectURL(audioFile);
  audioElement = new Audio(audioUrl);
};

function calculateAudioPlayProgress (time) {
  const result = time / audioTimeDuration.value * 100;
  store.audioPlayProgress = Math.floor(result);
};

function audioTimeUpdateEvent () {
  const currentTime = audioElement.currentTime;
  store.activeAudioCurrentTimeInSeconds = currentTime;
  audioCurrentTimeInSeconds.value = currentTime;
  calculateAudioPlayProgress(currentTime);
  canvasContext.fillStyle = '#399AFB';
  drawAudioProgressFrequency(currentTime);
};

function audioEndedEvent () {
  emit('audio-ended');
};

function addEvents () {
  audioElement.addEventListener('timeupdate', audioTimeUpdateEvent);
  audioElement.addEventListener('ended', audioEndedEvent);
};

function removeEvents () {
  audioElement.removeEventListener('timeupdate', audioTimeUpdateEvent);
  audioElement.removeEventListener('ended', audioEndedEvent);
};

function addAudioElementToList () {
  store.audioElemntsList.push({
    id: props.audio.id,
    audio: audioElement,
  });
};

function setAudioTimeDuration () {
  audioTimeDuration.value = decodedAudioData.duration;
};

async function getAudioFile () {
  try {
    audioFile = await $fetch(props.audio.src);
    createAudioContext();
    await decodeAudioFile();
    drawAudioBaseFrequency();
    createAudioElement();
    addEvents();
    addAudioElementToList();
    setAudioTimeDuration();
  } catch(error) {
    console.error(error);
  }
};

function toggleAudioPlayback () {
  if (!audioElement) return;

  if (!store.activeAudioElement.id || store.activeAudioElement.id !== props.audio.id) {
    if (store.activeAudioElement.id) {
      store.activeAudioElement.audio.pause();
      store.activeAudioElement.audio.currentTime = 0;
    }

    store.activeAudioElement = {
      id: props.audio.id,
      audio: audioElement,
    };
  }

  if (store.activeAudioElement.audio?.paused) {
    store.activeAudioElement.audio.play();
  } else {
    store.activeAudioElement.audio.pause();
  }
};
</script>

<template>
  <div
    class="track"
    :class="{ 'track--active': currentAudioElement }"
    @click="toggleAudioPlayback"
  >
    <div class="track__image">
      <img
        class="track__image-image"
        :src="props.audio.img"
      >

      <nuxt-icon
        v-show="store.activeAudioElement.audio?.paused && currentAudioElement"
        name="pause-fill"
      />
    </div>

    <canvas
      ref="canvasElement"
      class="track__canvas"
      width="460"
      height="52"
    />

    <div
      class="track__time"
    >
      {{ convertTimeToString(audioTime) }}
    </div>
  </div>
</template>

<style lang="sass" scoped>
.track
  display: flex
  justify-content: space-between
  align-items: center
  background: #F5F5F5
  height: 60px
  max-width: 600px
  padding: 4px 16px 4px 4px
  cursor: pointer

  &:hover
    background: #ECF0FC

  &--active
    background: #ECF0FC

  &__image
    display: flex
    justify-content: center
    align-items: center
    width: 52px
    height: 52px
    min-width: 52px
    min-height: 52px
    border-radius: 4px
    overflow: hidden
    background: #808080
    position: relative

    &-image
      width: 100%
      height: 100%
      object-fit: cover

    & .nuxt-icon
      display: block
      width: 40px
      height: 40px
      color: #399AFB
      background: white
      border-radius: 50%
      position: absolute
      top: 6px
      right: 6px

  &__playback-button
    width: 60px
    height: 60px
    background: green
    color: white
    border-radius: 50%

  &__time
    color: #808080
    font-size: 12px
</style>
