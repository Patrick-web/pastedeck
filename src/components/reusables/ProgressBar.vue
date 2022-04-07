<template>
  <div class="bg-[rgba(0,0,0,0.15)] rounded-full h-[25px] w-full p-1">
    <div class="flex items-center gap-1 h-full">
      <div
        class="bg-base-color h-full px-1 rounded-full flex justify-center items-center"
      >
        <p class="text-[0.8rem] font-light">{{ current }}</p>
      </div>

      <div class="relative grow bg-primary-light h-[5px] rounded-full">
        <hr
          :width="progress"
          class="absolute rounded-full h-[300%] center-y-abs bg-standout-bg"
        />
      </div>

      <div
        class="bg-standout-bg bg-primary-light h-full px-1 rounded-full flex justify-center items-center"
      >
        <p class="text-[0.8rem] font-light">{{ total }}</p>
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

<style></style>
