<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        Files
        <input type="file" id="file" ref="file" @change="handleFileUpload()" />
      </label>
      <button @click="submitFile()">Enviar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UploadDropArea',
  data() {
    return {
      file: '',
    };
  },
  methods: {
    handleFileUpload() {
      // eslint-disable-next-line prefer-destructuring
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();

      formData.append('file', this.file);
      formData.append('type', 1);

      // eslint-disable-next-line no-debugger
      debugger;

      axios
        .post('http://127.0.0.1:5000/calculatecomplexity', formData, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('SUCCESS!!');
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('FAILURE!!');
        });
    },
  },
};
</script>

<style scoped></style>
