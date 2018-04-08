<template>
    <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>
</template>

<style lang="scss">
@import '../styles/config';

.spinner {
  margin: 100px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;

  > div {
    background-color: $color-primary-base;
    height: 100%;
    width: 6px;
    display: inline-block;

    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  .rect2 {
    animation-delay: -1.1s;
  }

  .rect3 {
    animation-delay: -1.0s;
  }

  .rect4 {
    animation-delay: -0.9s;
  }

  .rect5 {
    animation-delay: -0.8s;
  }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
  }
}
</style>
