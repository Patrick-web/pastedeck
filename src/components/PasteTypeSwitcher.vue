<template>
  <div
    class="flex lg:gap-10 lg:rounded-b-[30px] bg-base-color justify-evenly w-screen lg:w-auto overflow-hidden lg:relative fixed left-0 bottom-0 z-20"
  >
    <div
      @click="type = 'all'"
      class="group paste-type-switcher lg:hover:bg-active-color"
    >
      <div
        :class="[
          type == 'all' ? 'bg-active-color lg:group-hover:bg-white' : '',
          'px-5 py-2 rounded-full gap-2',
        ]"
      >
        <img class="w-[20px]" src="../assets/timeline-icon.svg" />
      </div>
      <p>All</p>
    </div>

    <div
      @click="type = 'images'"
      class="group paste-type-switcher lg:hover:bg-active-color"
    >
      <div
        :class="[
          type == 'images' ? 'bg-active-color lg:group-hover:bg-white' : '',
          'px-5 py-2 rounded-full gap-2',
        ]"
      >
        <img class="w-[20px]" src="../assets/image-icon.svg" />
      </div>
      <p>Images</p>
    </div>

    <div
      @click="type = 'text'"
      class="group paste-type-switcher lg:hover:bg-active-color"
    >
      <div
        :class="[
          type == 'text' ? 'bg-active-color lg:group-hover:bg-white' : '',
          'px-5 py-2 rounded-full gap-2',
        ]"
      >
        <img class="w-[20px]" src="../assets/text-icon.svg" />
      </div>
      <p>Text</p>
    </div>

    <div
      @click="type = 'code'"
      class="group paste-type-switcher lg:hover:bg-active-color"
    >
      <div
        :class="[
          type == 'code' ? 'bg-active-color lg:group-hover:bg-white' : '',
          'px-5 py-2 rounded-full gap-2',
        ]"
      >
        <img class="w-[20px]" src="../assets/code-icon.svg" />
      </div>
      <p>Code</p>
    </div>

    <div
      @click="type = 'files'"
      class="group paste-type-switcher lg:hover:bg-active-color"
    >
      <div
        :class="[
          type == 'files' ? 'bg-active-color lg:group-hover:bg-white' : '',
          'px-5 py-2 rounded-full gap-2',
        ]"
      >
        <img class="w-[20px]" src="../assets/file-icon.svg" />
      </div>
      <p>Files</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "all",
    };
  },
};
</script>

<style></style>
