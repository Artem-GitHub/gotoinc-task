<template>
  <footer class="footer">
    <div class="footer__info-wrap">
      <div class="footer__author">
        <span>Author:</span>

        <a
          href="https://github.com/Artem-GitHub"
          class="footer__link"
          target="_blank"
        >
          https://github.com/Artem-GitHub
        </a>
      </div>

      <p
        class="footer__text"
      >
        This is a test mini application created for example purposes only.
      </p>
    </div>
  </footer>  
</template>

<style lang="sass" scoped>
.footer
  display: flex
  align-items: center
  justify-content: center
  height: 120px
  background: black

  &__author
    font-size: 16px
    color: white
    margin-bottom: 16px

  &__link
    color: #399AFB

  &__text
    color: #808080
</style>
