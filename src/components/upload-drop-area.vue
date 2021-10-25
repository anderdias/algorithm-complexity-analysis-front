<template>
  <div>
    <section class="px-16 pt-16 h-full">
      <div class="flex flex-col content-center items-center">
        <div
          class="
            rounded
            border-dashed border-2 border-gray-300
            w-full
            py-20
            flex flex-col
            items-center
          "
          @dragover="dragover"
          @dragleave="dragleave"
          @drop="drop"
        >
          <p class="mb-3 font-semibold px-9 text-gray-900 flex flex-wrap justify-center">
            <span class="flex flex-col items-center">
              <i class="fas fa-cloud-upload-alt fa-3x text-gray-600"></i>
              Drag&Drop file here
              <span>or</span>
              <button
                class="
                  rounded-sm
                  px-3
                  py-1
                  border border-gray-700
                  hover:bg-gray-900 hover:text-white
                  text-gray-700
                  duration-200
                  focus:shadow-outline focus:outline-none
                "
                @click="onSearch"
              >
                Browse File
              </button>
              <input class="hidden" type="file" id="file" ref="file" @change="onSelectFile" />
            </span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UploadDropArea',
  methods: {
    onSearch() {
      this.$refs.file.value = '';
      this.$refs.file.click();
    },
    onSelectFile() {
      this.$emit('select', this.$refs.file.files[0]);
    },
    dragover(event) {
      event.preventDefault();
      if (!event.currentTarget.classList.contains('bg-green-100')) {
        event.currentTarget.classList.remove();
        event.currentTarget.classList.add('bg-green-100', 'border-green-600');
      }
    },
    dragleave(event) {
      event.currentTarget.classList.add();
      event.currentTarget.classList.remove('bg-green-100', 'border-green-600');
    },
    drop(event) {
      event.preventDefault();
      this.$emit('drop', event.dataTransfer.files[0]);

      event.currentTarget.classList.add();
      event.currentTarget.classList.remove('bg-green-100', 'border-green-600');
    },
  },
};
</script>
