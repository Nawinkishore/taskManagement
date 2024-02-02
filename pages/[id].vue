<template>
  <div>
    <div
      class="flex flex-col w-full gap-14 items-center justify-center h-full p-3"
    >
      <p>Create</p>
      <input type="text" class="border-2" />
      <p>update</p>

      <input type="text" class="border-2" />
      <p>delete</p>

      <input type="text" class="border-2" />
     

      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicId: this.$route.params.id,
    };
  },
};
</script>
