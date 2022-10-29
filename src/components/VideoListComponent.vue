<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-3 mt-5 sm:mt-10">
    <VideoComponent
      v-for="item in props.items"
      :key="item.id"
      :item="item"
      @openModal="toggleInfoModal"
      @deleteModal="toggleDeleteModal"
    />
    <ModalComponent ref="modalComponent">
      <div
        v-if="currentItem && currentItem.id"
        class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left grid grid-cols-2 gap-2 h-52 items-center"
      >
        <div
          class="mx-auto relative flex items-center justify-center cursor-pointer"
          @click.prevent.exact="$router.push('/details/' + currentItem.id)"
        >
          <img
            :src="currentItem.image"
            :alt="currentItem.title"
            class="object-contain h-32"
          />
          <div class="absolute text-red-500 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-12 h-12"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="absolute bg-gray-800 w-full h-full opacity-50 z-0"></div>
        </div>
        <div>
          <h3
            class="text-lg font-medium leading-6 text-gray-900"
            id="modal-title"
          >
            {{ currentItem.title }}
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-800">
              {{ currentItem.description.slice(0, 250) }}
            </p>
          </div>
        </div>
      </div>
    </ModalComponent>
    <ModalComponent
      ref="deleteComponent"
      text="¿Seguro que quieres eliminar este video?"
      @action="deleteVideo"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import VideoComponent from "@/components/VideoComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["deleteVideo"]);

const currentItem = ref(null);
const modalComponent = ref(null);
const deleteComponent = ref(null);

const toggleInfoModal = (item) => {
  currentItem.value = item;
  modalComponent.value.showModal = true;
};

const toggleDeleteModal = (item) => {
  currentItem.value = item;
  deleteComponent.value.showModal = true;
};

const deleteVideo = () => {
  emit("deleteVideo", currentItem.value);
  currentItem.value = null;
  deleteComponent.value.showModal = false;
};
</script>
