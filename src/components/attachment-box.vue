<template>
  <div
    class="
      flex
      items-center
      rounded
      shadow-md
      py-3
      px-4
      relative
      h-14
      bg-gray-100
      hover:bg-gray-200
      duration-200
      max-w-3x4
    "
  >
    <i class="far fa-file-code fa-2x text-gray-600"></i>
    <div class="ml-2 leading-4">
      <p>{{ newAnexo.name }}</p>
      <p>{{ newAnexo.extensao }} - {{ newAnexo.tamanho }}</p>
    </div>
    <div class="cursor-pointer ml-auto" title="Remove file" @click="$emit('click-delete')">
      <i class="fas fa-trash-alt fa-1x text-gray-600"></i>
    </div>
  </div>
</template>

<script>
import getFileSize from 'filesize';

export default {
  name: 'AttachmentBox',
  props: {
    anexo: Object,
  },
  data() {
    return {
      newAnexo: {},
    };
  },
  watch: {
    anexo: {
      immediate: true,
      handler(anexo) {
        this.newAnexo = {
          name: this.getOnlyName(anexo?.name),
          tamanho: getFileSize(anexo?.fileSize, {
            base: 10,
            separator: ',',
          }),
          extensao: this.getExtension(anexo?.name),
        };
      },
    },
  },
  methods: {
    getOnlyName(name) {
      return name?.split('.').shift();
    },
    getExtension(name) {
      return name?.split('.')?.pop().toUpperCase();
    },
  },
};
</script>

<style></style>
