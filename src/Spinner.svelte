<div class="spinner w-20 h-20">
  <div class="ring1 absolute border-4 rounded-full w-full h-full"></div>
  <div class="ring2 absolute border-4 rounded-full w-full h-full"></div>
</div>

<style>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spinReverse {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .spinner {
    position: relative;
  }

  .ring1 {
    border-color: transparent white transparent transparent;
    animation: spin 3s linear infinite;
  }

  .ring2 {
    border-color: transparent #9f1239 transparent transparent;
    animation: spinReverse 2s linear infinite;
    animation-delay: -1s;
  }
</style>
