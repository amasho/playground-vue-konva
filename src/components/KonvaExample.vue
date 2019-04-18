<template>
  <div class="main">
    <div class="input-area">
      <div class="input">
        <v-text-field
          :v-model="imgWidth"
          label="width"
          :value="imgWidth"
          @keyup="onChangeWidth"
        ></v-text-field>
      </div>
      <div class="input">
        <v-text-field
          :v-model="imgHeight"
          label="height"
          :value="imgHeight"
          @keyup="onChangeHeight"
        ></v-text-field>
      </div>
    </div>

    <div class="img-area">
      <v-stage
        ref="stage"
        :config="{ width: this.imgWidth, height: this.imgHeight, draggable: true }"
      >
        <v-layer ref="layer">
          <v-image
            ref="image"
            :config="{ image: drawImage }"
          ></v-image>
        </v-layer>
      </v-stage>
    </div>

    <div class="slider-area">
      <v-slider
        :v-model="zoom"
        height="30px"
        color="light-blue"
        ticks="always"
        value="5"
        :step="1"
        :min="minZoom"
        :max="maxZoom"
        @change="onChangeZoom"
      ></v-slider>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawImage: null,
      imgWidth: 600,
      imgHeight: 400,
      transformerNode: null,
      minZoom: 1,
      maxZoom: 10,
      zoom: 1,
      rules: []
    }
  },
  created() {
    const i = new Image()
    i.src = 'https://pbs.twimg.com/media/D1HeoVCV4AANkU-.jpg'
    i.onload = () => (this.drawImage = i)
  },
  mounted() {
    this.transformerNode = this.$refs.image.getStage().getLayer()
  },
  methods: {
    onChangeWidth: function(e) {
      this.imgWidth = parseInt(e.target.value) || 0
    },
    onChangeHeight: function(e) {
      this.imgHeight = parseInt(e.target.value) || 0
    },
    onChangeZoom: function(e) {
      this.zoom = e / 5 || 0
      this.transformerNode.scale({ x: this.zoom, y: this.zoom })
      this.transformerNode.draw()
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .input-area {
    width: 100%;
    display: flex;
    justify-content: center;
    .input {
      width: 10%;
      margin: 0 20px;
    }
  }

  .slider-area {
    margin-top: 30px;
    width: 70%;
  }

  .img-area {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    border: 1px solid #ccc;
  }
}
</style>
