<template>
  <div class="default-layout">
    <TheHeader />

    <main class="main">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<style lang="sass" scoped>
.default-layout
  display: flex
  flex-direction: column
  min-height: 100vh

  .main
    flex: 1
    display: flex
    flex-direction: column
</style>
