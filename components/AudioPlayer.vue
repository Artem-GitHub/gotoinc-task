<script setup>
const controlsPanel = ref(null);
const store = usePlayerStore();

function audioEnded () {
  controlsPanel.value?.nextAudio();
};
</script>

<template>
  <div class="player">
    <div class="player__list">
      <template
        v-for="audio in store.audioList"
        :key="audio.id"
      >
        <AudioPlayerTrackItem
          :audio="audio"
          @audio-ended="audioEnded"
        />
      </template>
    </div>

    <AudioPlayerControls
      v-if="!!store.activeAudioElement?.id"
      ref="controlsPanel"
    />
  </div>
</template>

<style lang="sass" scoped>
.player
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between
  width: 100%
  max-width: 600px

  &__list
    display: flex
    flex-direction: column
    width: 100%
    row-gap: 4px
    max-height: 300px
    overflow-y: auto
    margin-bottom: 32px
</style>
