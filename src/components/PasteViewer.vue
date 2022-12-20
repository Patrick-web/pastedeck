<template>
    <div
      @click.self="$emit('closeViewer')"
      class="fixed top-0 left-0 w-screen h-screen backdrop-blur sm:py-5 inset-0 z-40 flex justify-center items-center bg-[rgba(0,0,0,0.25)]"
    >
      <div
        :class="[
          paste.paste_type == 'image' ? '' : 'animate__fadeInDown',
          'overflow-y-auto rounded-xl max-h-[100%] w-[100%] sm:w-[60%] sm:px-5  animate__animated animate__faster',
        ]"
      >
        <p
          v-if="paste.paste_type == 'text'"
          class="font-light bg-app-bg p-5 rounded-xl"
        >
          {{ paste.text_content }}
        </p>

        <pre
          v-highlightjs="sourcecode"
          v-if="paste.paste_type == 'code'"
          class="font-light w-full h-full"
        >
          <code class="w-full h-full rounded-xl text-sm" >{{ paste.text_content }}</code>
        </pre>
      </div>
      <button
        @click="$emit('closeViewer')"
        class="w-[40px] h-[40px] flex items-center justify-center top-5 left-[48%] rounded-full flex justify-center fixed bg-red-500 z-[60] drop-shadow-2xl z-[80] animate__animated animate__fast animate__slideInUp'"
      >
        <img class="w-[20px] icon" src="../assets/x-icon.svg" />
      </button>
    </div>
</template>

<script>
  export default {
    name:"PasteViewer",
    props: {
      paste: Object,
    },
    mounted(){
      console.log(this.paste)
    }
  }
</script>

<style lang="scss" scoped>

</style>
