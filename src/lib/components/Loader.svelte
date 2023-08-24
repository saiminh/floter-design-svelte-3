<div class="loader">
  <div class="lds-circle"><div></div></div>
  <p>Loading...</p>
</div>

<style lang="scss">
.loader {
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  transform: translateY(100%);
  animation: fade-in .5s cubic-bezier(0.165, 0.84, 0.44, 1) .3s forwards;
  display: flex;
  align-items: center;
  padding: 15px var(--spacing-outer);
  z-index: 1000;
  background-color: var(--color-bg);

  & p {
    font-size: .75em;
    line-height: 1;
    margin: 0;
    display: inline-block;
  }
}
.lds-circle {
  display: flex;
  align-items: center;
  transform: translateZ(1px);
}
.lds-circle > div {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 8px;
  border-radius: 50%;
  background: var(--color-text);
  animation: lds-circle 6s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
@keyframes lds-circle {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>