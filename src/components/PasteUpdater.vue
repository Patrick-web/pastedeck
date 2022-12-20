<template>
  <div
    @click.self="$emit('closeUpdater')"
    class="fixed top-0 left-0 w-screen h-screen backdrop-blur sm:py-5 inset-0 z-40 flex justify-center items-center bg-[rgba(0,0,0,0.25)]"
  >
   <div
     class='flex flex-col items-center gap-2 rounded-xl h-[100%] w-[100%] sm:w-[60%] sm:px-5  bg-app-bg p-5 animate__animated animate__faster animate__zoomIn'
   >
      <p class="text-2xl font-bold">Update this ? </p>
        <textarea
          v-model="pasteText"
          placeholder="Empty paste?"
          class="w-full h-full outline-none p-2 font-light bg-primary-light rounded-2xl"
        ></textarea>
      <div class="flex gap-4 items-center justify-center"> 
        <button
          @click="updatePaste"
          class="bg-btn-color border-2 border-btn-color px-8 py-2 rounded-[40px] font-medium hover:rounded-xl sm:hover:saturate-150"
        >
          <loader v-if="uploading" />
          <p v-else>Update</p>
        </button>
        <button
          @click="$emit('closeUpdater')"
          class="border-2 border-amber-500 text-amber-500 px-8 py-2 rounded-[40px] font-medium hover:rounded-xl sm:hover:saturate-150"
        >
          Cancel
        </button>
      </div>
      </div>
  </div>
</template>

<script>
import { updateTextBasedPaste } from "../supabase/index.js";
import Loader from "./reusables/Loader.vue"

export default {
  data() {
    return {
      pasteText: this.pasteToEdit.text_content,
      uploading: false,
    };
  },
  methods:{
    async updatePaste(){
      console.log("Updating")
      this.uploading = true
      await updateTextBasedPaste(this.pasteText, this.pasteToEdit.id) 
      this.uploading = false
      this.$emit('closeUpdater')
    }
  },
  props:{
    pasteToEdit: Object,
  },
  emits:['closeUpdater'],
  mounted(){
    console.log(this.pasteToEdit)  
  },
  components:{
    Loader,
  }
}
</script>


