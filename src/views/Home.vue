<template>
  <div class="h-screen w-screen sm:px-8 md:px-16 sm:py-8 bg-gray-100">
    <h1>Prediction Complexity</h1>
    <div class="flex flex-col items-center content-center">
      <div class="w-96 bg-white rounded-t py-3 px-4">
        <upload-drop-area
          :file="file"
          @drop="handleFileUpload"
          @select="handleFileUpload"
          @search-file="handleFileUpload"
        />
        <section class="font-semibold text-gray-900 my-5">
          <h3>Regressão logistíca:</h3>
          <radio-button
            v-model="selectedValue"
            :options="optionRegression"
            @change="selectedComplexity"
          />
        </section>
        <attachment-box v-if="hasFile" :anexo="anexo" @click-delete="onClickDelete" />
      </div>
      <div class="w-96 flex flex-col">
        <button
          class="
            rounded-b
            px-3
            py-2
            bg-gray-700
            hover:bg-gray-900
            text-white
            duration-200
            focus:shadow-outline focus:outline-none
          "
          @click="submitFile"
        >
          Enviar
        </button>
      </div>
    </div>
    <body>
      <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900 flex flex-wrap justify-center">
        {{ messageComplexity }}
      </h1>
    </body>
  </div>
</template>

<script>
import axios from 'axios';
import UploadDropArea from '@/components/upload-drop-area.vue';
import AttachmentBox from '@/components/attachment-box.vue';
import RadioButton from '@/components/radio-button.vue';

export default {
  name: 'Home',
  components: {
    UploadDropArea,
    AttachmentBox,
    RadioButton,
  },
  data() {
    return {
      optionRegression: [
        { type: 'Binomial', value: 0 },
        { type: 'Multinomial', value: 1 },
      ],
      file: '',
      selectedValue: '',
      anexo: {},
      complexidade: '',
      mensagem: '',
      hasComplexity: false,
    };
  },
  computed: {
    hasFile() {
      return !!this.file;
    },
    messageComplexity() {
      return (this.hasComplexity && `${this.complexidade} - ${this.mensagem}`) || this.mensagem;
    },
  },
  mounted() {
    this.mensagem = 'Insira um arquivo .java';
  },
  watch: {
    file: {
      immediate: true,
      handler(file) {
        this.anexo = {
          name: file.name,
          fileSize: file.size,
        };
      },
    },
  },
  methods: {
    onClickDelete() {
      this.file = '';
      this.hasComplexity = false;
      this.mensagem = 'Insira um arquivo .java';
    },
    selectedComplexity(newValue) {
      this.selectedValue = +newValue;
    },
    handleFileUpload(file) {
      this.file = file;
    },
    submitFile() {
      const formData = new FormData();

      formData.append('file', this.file);
      formData.append('type', this.selectedValue);

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
          this.hasComplexity = true;
          // eslint-disable-next-line no-console
          console.log('SUCCESS!!');
        })
        .catch(({ response }) => {
          this.hasComplexity = false;
          this.mensagem = response.data.mensagem;
          // eslint-disable-next-line no-console
          console.log('FAILURE!!');
        });
    },
  },
};
</script>
