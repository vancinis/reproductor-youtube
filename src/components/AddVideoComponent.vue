<template>
  <div class="mx-auto">
    <h2 class="font-medium text-2xl">Añadir nuevo video</h2>
    <div class="flex my-2 justify-center">
      <input
        class="px-4 w-9/12 sm:w-10/12 outline-none border border-l border-t border-b border-gray-400 rounded-l-md"
        type="text"
        placeholder="Coloca la url del video"
        v-model="url"
        @keyup.enter="addVideo"
      />
      <button
        class="w-3/12 sm:w-2/12 text-white bg-blue-600 px-4 py-2 rounded-r-md"
        @click.prevent.exact="addVideo"
      >
        Añadir
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import useYoutube from "../composables/useYoutube";

const emit = defineEmits(["addVideo"]);

const url = ref("");
const { getVideoDetails } = useYoutube();

const addVideo = async () => {
  const details = await getVideoDetails(url.value);
  if (!details || !details.snippet || !details.snippet?.title) {
    alert("Debes colocar una url valida");
    return;
  }

  emit("addVideo", {
    url: url.value,
    title: details.snippet.title,
    description: details.snippet.description,
    image:
      details.snippet.thumbnails?.maxres?.url ||
      details.snippet.thumbnails?.high?.url ||
      details.snippet.thumbnails?.default?.url ||
      "",
  });

  url.value = "";
};
</script>
