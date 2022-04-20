<template>
  <div class="relative w-full">
    <input
      :name="inputType"
      :type="inputType"
      :placeholder="inputLabel"
      class="peer bg-transparent h-10 border-black w-full border-b-[1px] text-gray-900 placeholder-transparent focus:outline-none focus:border-black focus:border-b-3"
      v-bind="$attrs"
      v-model="inputValue"
      @input="
        $emit('entry', inputValue);
        errorMsg = '';
      "
      @keyup.enter="
        $emit('enterPressed', inputValue);
        errorMsg = '';
      "
    />
    <label
      :for="inputType"
      class="pointer-events-none absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >{{ inputLabel }}</label
    >
    <p v-if="error" class="text-red-400 text-sm font-light">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    clearInput() {
      this.inputValue = "";
      this.$emit("entry", this.inputValue);
    },
  },
  props: {
    inputType: {
      default: "text",
      type: String,
    },
    inputLabel: {
      default: "",
      type: String,
    },
    defaultValue: {
      default: "",
      type: String,
    },
    error: {
      default: "",
      type: String,
    },
  },
  mounted() {
    this.inputValue = this.defaultValue;
    this.$emit("entry", this.inputValue);
    setTimeout(() => {
      this.inputValue = this.defaultValue;
    }, 0);
  },
  emits: ["entry", "enterPressed"],
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped></style>
