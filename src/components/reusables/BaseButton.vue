<template>
  <button
    v-bind="$attrs"
    :type="buttonType"
    class="active:rounded-2xl active:brightness-75 focus:outline-none focus:ring-4 focus:ring-pink-100 hover:brightness-[90%] px-5 py-3 shadow rounded-3xl font-bold"
  >
    <slot></slot>
    <p>
      {{ buttonLabel }}
    </p>
  </button>
</template>

<script>
export default {
  props: {
    buttonLabel: {
      default: "csdkmk",
      type: String,
    },
    buttonType: {
      default: "button",
      type: String,
    },
  },
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped></style>
