<script setup>
useHead({ title: 'Player' });

definePageMeta({
  middleware: ['player-access'],
});
</script>

<template>
  <div class="player-page">
    <h1 class="player-page__title">
      Player
    </h1>

    <p class="player-page__subtitle">
      To play music, click on one of the tracks in the list
    </p>

    <client-only>
      <AudioPlayer />
    </client-only>
  </div>
</template>

<style lang="sass" scoped>
.player-page
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  padding: 32px

  &__title
    font-size: 36px
    color: black
    margin-bottom: 16px

  &__subtitle
    font-size: 18px
    color: #7F7F7F
    margin-bottom: 32px
</style>

