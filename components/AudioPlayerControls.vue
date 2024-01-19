<script setup>
const downloadLink = ref(null);
const store = usePlayerStore();

function audioPlay () {
  store.activeAudioElement.audio.play();
};

function audioPause () {
  store.activeAudioElement.audio.pause();
};

function audioStop () {
  audioPause();
  store.activeAudioElement.audio.currentTime = 0;
};

function findIndexActiveAudioElement () {
  return store.audioList.findIndex(audio => audio.id === store.activeAudioElement.id);
};

function setNewActiveAudioElement (id) {
  const audioElement = store.audioElemntsList.find(audio => audio.id === id);
  store.activeAudioElement = audioElement;
  audioPlay();
};

function toggleAudioPlayback () {
  if (store.activeAudioElement.audio.paused) audioPlay();
  else audioPause();
};

function prevAudio () {
  const index = findIndexActiveAudioElement();
  let id = null;

  if (index === -1) return;

  audioStop();

  if (index) id = store.audioList[index - 1].id;
  else id = store.audioList[store.audioList.length - 1].id;

  setNewActiveAudioElement(id);
};

function nextAudio () {
  const index = findIndexActiveAudioElement();
  let id = null;

  if (index === -1) return;

  audioStop();

  if (index === store.audioList.length - 1) id = store.audioList[0].id;
  else id = store.audioList[index + 1].id;

  setNewActiveAudioElement(id);
};

function downloadAudio () {
  downloadLink.value.click();
};

function muteAudio () {
  store.activeAudioElement.audio.muted = !store.activeAudioElement.audio.muted;
};

defineExpose({ nextAudio });
</script>

<template>
  <div class="controls">
    <div class="actions">
      <button
        class="actions__download-button"
        @click="downloadAudio"
      >
        <nuxt-icon name="download" />
      </button>

      <button
        class="actions__switch-button actions__switch-button_prev"
        @click="prevAudio"
      >
        <nuxt-icon name="next" />
      </button>

      <button
        class="actions__playback-button"
        @click="toggleAudioPlayback"
      >
        <nuxt-icon
          v-show="store.activeAudioElement.audio.paused"
          name="play"
        />

        <nuxt-icon
          v-show="!store.activeAudioElement.audio.paused"
          name="pause"
        /> 
      </button>

      <button
        class="actions__switch-button"
        @click="nextAudio"
      >
        <nuxt-icon name="next" />
      </button>

      <button
        class="actions__audio-button"
        @click="muteAudio"
      >
        <nuxt-icon name="audio" />
      </button>
    </div>

    <div class="progress">
      <div class="progress__time">
        {{ convertTimeToString(store.activeAudioCurrentTimeInSeconds) }}
      </div>

      <div class="progress__bar">
        <span
          class="progress__bar_indicator"
          :style="{ width: store.audioPlayProgress + '%' }"
        />
      </div>

      <div class="progress__time">
        {{ convertTimeToString(store.activeAudioElement.audio.duration) }}
      </div>
    </div>

    <a
      v-show="false"
      ref="downloadLink"
      :href="store.activeAudioElement.audio?.src"
      :download="`audio${store.activeAudioElement.id}.mp3`"
    />
  </div>
</template>

<style lang="sass" scoped>
.controls
  display: flex
  flex-direction: column
  width: 100%
  max-width: 600px
  row-gap: 8px
  padding: 24px 8px
  position: fixed
  bottom: 0

.actions
  display: flex
  justify-content: center
  align-items: center
  column-gap: 12px

  &__playback-button
    width: 54px
    min-width: 54px
    height: 54px
    min-height: 54px
    background: #EBECEE
    border-radius: 50%
    color: white
    font-size: 18px

    &:hover
      background: #ECF0FC

    & .nuxt-icon
      display: inline-block
      width: 20px
      height: 20px
      color: #081327

  &__switch-button,
  &__audio-button,
  &__download-button
    width: 40px
    height: 40px
    background: white
    border-radius: 50%

    &_prev
      transform: rotate(180deg)

    & .nuxt-icon
      display: inline-block
      width: 20px
      height: 20px
      color: #7F7F7F

  &__audio-button,
  &__download-button
    & .nuxt-icon
      width: 16px
      height: 16px


.progress
  display: flex
  justify-content: center
  align-items: center
  column-gap: 12px

  &__time
    font-size: 14px
    color: #808080

  &__bar
    flex: 1
    height: 4px
    background: #DDDDDD
    border-radius: 2px

    &_indicator
      display: block
      height: 4px
      width: 0%
      background: #399AFB
      border-radius: 2px
</style>