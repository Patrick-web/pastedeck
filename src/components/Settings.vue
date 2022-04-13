<template>
  <button
    @click="$emit('openSettings')"
    :class="[
      showSettings ? '-top-[50px] -right-[-50px]' : '-top-[5px] -right-[15px]',
      'fixed p-2 bg-standout-bg z-40 rounded-full w-[60px] rotate-[-45deg]',
    ]"
  >
    <img class="w-5" src="../../src/assets/settings-icon.svg" alt="" />
  </button>
  <div
    v-if="showSettings"
    @click.self="$emit('closeSettings')"
    class="fixed w-screen h-screen py-5 inset-0 z-40 backdrop-blur flex justify-center items-center bg-[rgba(0,0,0,0.25)]"
  >
    <div
      class="w-[80%] lg:w-[30%] max-h-[50%] p-5 bg-base-color rounded-[40px] animate__animated animate__fadeInUp animate__faster"
    >
      <p class="text-center lg:text-3xl text-2xl font-bold mb-5">Settings</p>
      <button
        @click="toggleDarkMode(!darkOn)"
        :class="[
          darkOn ? 'bg-active-color' : 'bg-primary-color',
          'w-full rounded-[25px] p-5 flex items-center gap-5',
        ]"
      >
        <div class="h-[30px] overflow-hidden">
          <transition
            enter-active-class="animate__animated animate__faster animate__slideInDown"
            leave-active-class="animate__animated animate__faster animate__slideOutUp"
          >
            <img
              v-if="darkOn"
              class="w-6 icon"
              src="../assets/moon-icon.svg"
              alt="moon icon"
            />
          </transition>
          <transition
            enter-active-class="animate__animated animate__faster animate__slideInUp"
            leave-active-class="animate__animated animate__faster animate__slideOutDown"
          >
            <img
              class="w-6"
              v-if="!darkOn"
              src="../assets/sun-icon.svg"
              alt="sun icon"
            />
          </transition>
        </div>
        <div class="flex flex-col items-start text-d">
          <p class="font-normal">Dark Mode</p>
          <p class="font-light text-sm">
            {{ darkOn == "light" ? "Off" : "On" }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkOn: false,
    };
  },
  methods: {
    toggleDarkMode(state) {
      this.darkOn = state;
      if (this.darkOn) {
        localStorage.setItem("darkOn", true);
        document.querySelector(".app").classList.add("darkOn");
      } else {
        document.querySelector(".app").classList.remove("darkOn");
        localStorage.removeItem("darkOn");
      }
    },
  },
  mounted() {
    const darkOn = localStorage.getItem("darkOn");
    if (darkOn) {
      this.toggleDarkMode(true);
    } else {
      this.toggleDarkMode(false);
    }
  },
  props: {
    showSettings: Boolean,
  },
};
</script>
<style lang="scss">
.darkOn {
  .text-d {
    color: black;
  }
}
</style>
