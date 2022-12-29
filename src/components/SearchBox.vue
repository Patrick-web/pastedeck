<template>
  <div class="w-full flex flex-col items-center px-5">
    <div class="relative w-[80%] sm:w-[30%]">
      <input
        type="text"
        placeholder="Search"
        class="m-2 p-2 px-4 w-full rounded-3xl bg-base-color active:rounded-full"
        v-model="query"
        @keypress.enter="search"
      />
      <BaseButton
        v-if="pastes.length > 0 || noResults"
        @click="
          pastes = [];
          noResults = false;
          query = '';
        "
        class="px-1 py-1 absolute right-0 top-[15%] hover:scale-110"
      >
        <img src="../assets/x-icon.svg" class="w-4" />
      </BaseButton>
    </div>
    <div
      v-if="noResults"
      class="w-full p-4 rounded-xl grid place-items-center bg-base-color"
    >
      <p class="text-lg font-bold">No Results</p>
    </div>
    <div
      ref="pastesWrapper"
      :class="[
        searching || pastes.length > 0
          ? 'max-h-[78vh] pt-5 pb-40 sm:pb-10 px-5 '
          : 'max-h-[0vh]',
        'pastesWrapper w-full  gap-4 grid justify-center items-start  xl:grid-cols-3 sm:grid-cols-2 overflow-y-auto bg-standout-bg rounded-2xl',
      ]"
    >
      <!-- skeleton-loaders -->
      <div
        class="skeleton-loaders gap-4 sm:w-[65vw] w-[100vw] grid xl:grid-cols-3 sm:grid-cols-3 h-full"
        v-if="searching"
      >
        <div
          v-for="i in 6"
          :key="i"
          class="skeleton-box w-full h-[200px] rounded-xl"
        ></div>
      </div>
      <!-- skeleton-loaders -->

      <!-- Uploaded Pastes -->
      <transition-group
        enter-active-class="animate__animated animate__fadeInDown"
      >
        <paste-card
          v-for="paste in pastes"
          :key="paste.id"
          :paste="paste"
          @openPaste="$emit('openPaste', paste)"
          @pasteToEdit="$emit('pasteToEdit', paste)"
          @pasteToDelete="$emit('pasteToDelete', paste)"
        />
      </transition-group>
      <!-- Uploaded Pastes -->
    </div>
  </div>
</template>

<script>
import PasteCard from "../components/PasteCard.vue";
import { searchForPaste } from "../supabase/index";
import BaseButton from "./reusables/BaseButton.vue";
export default {
  data() {
    return {
      query: "",
      pastes: [],
      searching: false,
      noResults: false,
    };
  },
  methods: {
    async search() {
      this.pastes = [];
      this.noResults = false;
      this.searching = true;
      console.log(this.query);
      const { data, error } = await searchForPaste(this.query);
      this.searching = false;
      if (error) {
        console.log(error);
        return;
      }
      console.table(data);
      this.pastes = data;
      if (data.length == 0) {
        this.noResults = true;
      }
    },
  },
  components: {
    PasteCard,
    BaseButton,
  },
};
</script>
