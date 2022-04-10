<template>
  <div class="bg-[rgba(0,0,0,0.15)] rounded-full h-[40px] w-full p-1">
    <div class="flex items-center gap-1 h-full">
      <div
        class="bg-[#ffc2da] h-full w-[30px] px-1 rounded-full flex justify-center items-center"
      >
        <p class="text-[1rem] font-bold opacity-50">{{ current }}</p>
      </div>

      <div
        class="relative grow bg-primary-light h-[10px] rounded-full flex items-center"
      >
        <hr
          :width="progress"
          id="pg_bar"
          class="absolute rounded-full py-3 min-w-[15px] bg-standout-bg drop-shadow"
        />
      </div>

      <div
        class="bg-standout-bg bg-primary-light h-full w-[30px] px-1 rounded-full flex justify-center items-center"
      >
        <p class="text-[1rem] opacity-50 font-bold">{{ total }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    progress() {
      return `${Math.trunc((this.current / this.total) * 100)}%`;
    },
  },
  props: {
    current: Number,
    total: Number,
  },
};
</script>

<style>
#pg_bar {
  background: linear-gradient(
    271deg,
    var(--standout-bg),
    #ffc2da,
    var(--standout-bg)
  );
  border: none;
  background-size: 200% 200%;
  animation: gradient 0.5s ease-in-out infinite;
  animation-direction: alternate;
}
@keyframes gradient {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
