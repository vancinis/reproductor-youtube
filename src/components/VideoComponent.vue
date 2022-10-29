<template>
  <div class="p-2 sm:p-5">
    <div class="relative">
      <img
        class="cursor-pointer w-full object-contain"
        :src="props.item.image"
        :alt="props.item.title"
        @click.prevent.exact="emit('openModal', props.item)"
      />
      <button
        class="bg-gray-800 opacity-90 text-white rounded-sm p-1 absolute top-1 right-1"
        @click.prevent.exact="emit('deleteModal', props.item)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["openModal", "deleteModal"]);
</script>
