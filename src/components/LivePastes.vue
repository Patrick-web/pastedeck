<template>
  <div @click.self="$emit('hideLivePastes')" class="modal">
    <div class="bg-app-bg rounded-3xl gap-4 items-start justify-start p-4 sm:w-[65vw] w-[100vw] grid xl:grid-cols-3 sm:grid-cols-3 h-full"> 
      <transition-group
        enter-active-class="animate__animated animate__fadeInDown"
      >
        <paste-card
          v-for="paste in livePastes"
          :key="paste.id"
          :paste="paste"
          @openPaste="setPasteToView(paste)"
          @pasteToEdit="setPasteToEdit(paste)"
          @pasteToDelete="setPasteToDelete(paste)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import PasteCard from "./PasteCard.vue";

export default {
  props:{
    livePastes: Array
  },
  components:{
    PasteCard,
  },
  emits:['hideLivePastes']
}
</script>
