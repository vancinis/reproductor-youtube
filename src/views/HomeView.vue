<template>
  <div>
    <AddVideoComponent @addVideo="addVideoToList" />
    <VideoListComponent :items="items" @deleteVideo="deleteVideoFromList" />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import AddVideoComponent from "../components/AddVideoComponent.vue";
import VideoListComponent from "../components/VideoListComponent.vue";

import useModel from "../composables/useModel";

const { getVideos, addVideo, deleteVideo } = useModel();

const items = ref([]);

onMounted(async () => {
  items.value = await getVideos();
});

const addVideoToList = async (data) => {
  const result = await addVideo(data);
  if (result) {
    items.value = await getVideos();
  }
};

const deleteVideoFromList = async ({ id }) => {
  if (!id) {
    return null;
  }

  await deleteVideo(id);
  items.value = await getVideos();
};
</script>
