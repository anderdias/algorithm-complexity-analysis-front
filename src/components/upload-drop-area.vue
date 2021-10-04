<template>
  <div class="bg-gray-800">
    <div class="container">
      <div class="dash-dropzone">
        <span class="dash-message">
          Files
          <input class="teste" type="file" id="file" ref="file" @change="handleFileUpload" />
        </span>
      </div>
      <button class="" @click="submitFile">Enviar</button>
      <h1>{{ complexidade }} - {{ mensagem }}</h1>
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
      complexidade: '',
      mensagem: '',
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

      axios
        .post('/calculatecomplexity', formData, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.complexidade = res.data.complexidade;
          this.mensagem = res.data.mensagem;
          // eslint-disable-next-line no-console
          console.log('SUCCESS!!');
        })
        .catch(() => {
          this.mensagem = 'Não foi selecionado nenhum arquivo!';
          // eslint-disable-next-line no-console
          console.log('FAILURE!!');
        });
    },
  },
};
</script>

<style>
/* .dash-dropzone {
  background-color: rgb(24, 26, 27);
  background-image: initial;
  border: 2px dashed #0087f7;
  border-color: rgb(0, 99, 181);
  cursor: pointer;
  min-height: 150px;
  padding: 20px;
  box-sizing: border-box;
}

.teste {
  visibility: hidden;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 0px;
  width: 0px;
}

.dash-message {
  text-align: center;
  margin: 2em 0;
  color: #e8e6e3;
} */
</style>
