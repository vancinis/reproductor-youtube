<template>
  <div>
    <button
      class="bg-transparent border rounded-md text-blue-600 border-blue-600 mb-8 px-4 py-2 w-48 flex justify-center font-medium"
      @click.prevent.exact="$router.push('/')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
          clip-rule="evenodd"
        />
      </svg>

      Volver
    </button>
    <iframe
      v-if="item && item.url && urlId"
      width="100%"
      height="500"
      :src="`https://www.youtube.com/embed/${urlId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import useModel from "../composables/useModel";

const $route = useRoute();
const { getVideo } = useModel();

const item = ref(null);
const urlId = computed(() => {
  if (!item.value || !item.value.url) {
    return "";
  }

  const params = new URL(item.value.url).searchParams;
  return params.get("v");
});

onMounted(async () => {
  const result = await getVideo($route.params.id);
  item.value = result;
});
</script>
