<template>
  <button
    @click="showAuthForm = true"
    :class="[
      showAuthForm
        ? 'sm:bottom-[-50px] bottom-[80px] right-[-100px] sm:right-[-50px]'
        : 'bottom-[80px] sm:bottom-[-5px] right-[-20px] sm:right-[-15px]',
      'fixed p-2 bg-standout-bg z-40 rounded-full w-[60px] sm:rotate-[45deg]',
    ]"
  >
    <img
      class="w-6 sm:rotate-[-45deg]"
      src="../../src/assets/unlock-icon.svg"
      alt=""
    />
  </button>
  <div
    v-if="showAuthForm"
    @click.self="showAuthForm = false"
    class="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm grid place-items-center"
  >
    <div
      class="w-[80%] sm:w-[30%] max-w-[50%] max-h-[50%] p-5 bg-base-color flex flex-col items-center justify-center gap-5 rounded-3xl animate__animated animate__fadeInUp animate__faster"
    >
      <base-input
        inputLabel="Enter password"
        :defaultValue="adminKey"
        :error="passwordError"
        @entry="(value) => (password = value.toLowerCase())"
        @enterPressed="validate"
        ref="passwordInput"
        autofocus
        type="password"
      />
      <loader-2 v-if="loading" />
      <base-button
        @click="validate"
        label="Done"
        class="bg-btn-color px-10 py-2"
      />
    </div>
  </div>
</template>

<script>
import Loader2 from "@/components/reusables/Loader2.vue";
import { getPasswordInfo } from "@/supabase/index.js";
export default {
  components: { Loader2 },
  data() {
    return {
      password: "",
      passwordError: "",
      loading: false,
      adminKey: "",
      authenticated: false,
      showAuthForm: false,
    };
  },
  methods: {
    async validate() {
      this.loading = true;
      const { data, error } = await getPasswordInfo(this.password);
      if (error) {
        console.log(error.message);
        this.passwordError = "The password does not exist. Please check it";
        this.loading = false;
        return;
      }
      this.$emit("getPastes", data);
      this.$refs.passwordInput.clearInput();
    },
  },
  emits: ["getPastes"],
};
</script>

<style lang="scss" scoped></style>
