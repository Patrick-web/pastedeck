<template>
  <div
    class="flex sm:gap-10 sm:min-h-[70px] sm:rounded-b-[30px] sm:mb-2 bg-base-color justify-evenly w-screen sm:w-auto overflow-hidden sm:relative fixed left-0 bottom-0 z-20"
  >
    <div
      @click="showPastes('all')"
      class="group paste-type-switcher sm:hover:bg-active-color"
    >
      <div
        :class="[
          type == 'all' ? 'bg-active-color' : '',
          'px-5 py-2 rounded-full gap-2',
        ]"
      >
        <img
          :class="[
            type == 'all' ? 'animate__animated animate__swing' : '',
            'w-[20px] sm:group-hover:animate-bounce icon',
          ]"
          src="../assets/timeline-icon.svg"
        />
      </div>
      <p>All</p>
    </div>

    <div
      @click="showPastes('image')"
      class="group paste-type-switcher sm:hover:bg-active-color"
    >
      <div
        :class="[
          type == 'image' ? 'bg-active-color' : '',
          'px-5 py-2 rounded-full gap-2',
        ]"
      >
        <img
          :class="[
            type == 'image' ? 'animate__animated animate__swing' : '',
            'w-[20px] sm:group-hover:animate-bounce icon',
          ]"
          src="../assets/image-icon.svg"
        />
      </div>
      <p>Images</p>
    </div>

    <div
      @click="showPastes('text')"
      class="group paste-type-switcher sm:hover:bg-active-color"
    >
      <div
        :class="[
          type == 'text' ? 'bg-active-color ' : '',
          'px-5 py-2 rounded-full gap-2',
        ]"
      >
        <img
          :class="[
            type == 'text' ? 'animate__animated animate__swing' : '',
            'w-[20px] sm:group-hover:animate-bounce icon',
          ]"
          src="../assets/text-icon.svg"
        />
      </div>
      <p>Text</p>
    </div>

    <div
      @click="showPastes('code')"
      class="group paste-type-switcher sm:hover:bg-active-color"
    >
      <div
        :class="[
          type == 'code' ? 'bg-active-color ' : '',
          'px-5 py-2 rounded-full gap-2',
        ]"
      >
        <img
          :class="[
            type == 'code' ? 'animate__animated animate__swing' : '',
            'w-[20px] sm:group-hover:animate-bounce icon',
          ]"
          src="../assets/code-icon.svg"
        />
      </div>
      <p>Code</p>
    </div>

    <div
      @click="showPastes('file')"
      class="group paste-type-switcher sm:hover:bg-active-color"
    >
      <div
        :class="[
          type == 'file' ? 'bg-active-color ' : '',
          'px-5 py-2 rounded-full gap-2',
        ]"
      >
        <img
          :class="[
            type == 'file' ? 'animate__animated animate__swing' : '',
            'w-[20px] sm:group-hover:animate-bounce icon',
          ]"
          src="../assets/file-icon.svg"
        />
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
  methods: {
    showPastes(type) {
      this.type = type;
      this.$emit("showPastesOfType", type);
    },
  },
  emits: ["showPastesOfType"],
};
</script>

<style></style>
