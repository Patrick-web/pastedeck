<template>
  <div @click.self="$emit('closeViewer')" class="modal">
    <div
      :class="[
        paste.paste_type == 'image' ? '' : 'animate__fadeInDown',
        'overflow-y-auto grid place-items-center rounded-xl max-h-[100%] w-[100%] sm:w-[60%] sm:px-5  animate__animated animate__faster',
      ]"
    >
      <p
        v-if="paste.paste_type == 'text'"
        class="font-light bg-app-bg p-5 rounded-xl whitespace-pre-wrap"
      >
        {{ paste.text_content }}
      </p>

      <p
        v-highlightjs="sourcecode"
        v-if="paste.paste_type == 'code'"
        class="font-light w-full whitespace-pre-wrap"
      >
          <code class="w-full h-full rounded-xl text-sm" >{{ paste.text_content }}</code>
      </p>
      <div v-if="paste.paste_type==='image'" class="h-[90vh] flex items-center justify-center"> 
        <img :src="paste.file_url" class="w-[90%] max-h-[90%] object-cover self-center animate__animated animate__faster animate__zoomIn"/>
      </div>
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
  name: "PasteViewer",
  props: {
    paste: Object,
  },
  mounted() {
    console.log(this.paste);
  },
};
</script>

<style lang="scss" scoped></style>
