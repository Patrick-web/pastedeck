<template>
  <div
    class="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm grid place-items-center"
  >
    <div
      class="w-[80%] lg:w-[30%] max-h-[50%] p-5 bg-base-color flex flex-col items-center justify-center gap-5 rounded-3xl animate__animated animate__fadeInUp animate__faster"
    >
      <base-input
        inputLabel="Enter password"
        defaultValue=""
        :error="passwordError"
        @entry="(value) => (password = value)"
        @enterPressed="validate"
        ref="passwordInput"
        autofocus
      />
      <loader-2 v-if="loading" />
      <base-button
        @click="validate"
        buttonLabel="Done"
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
