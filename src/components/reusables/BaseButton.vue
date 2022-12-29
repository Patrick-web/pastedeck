<template>
  <button
    v-bind="$attrs"
    :type="buttonType"
    class="active:rounded-2xl active:brightness-75 hover:brightness-[90%] px-5 py-3 rounded-3xl font-bold"
  >
    <slot></slot>
    <p v-if="label">
      {{ label }}
    </p>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    type: {
      default: "button",
      type: String,
    },
  },
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped></style>
