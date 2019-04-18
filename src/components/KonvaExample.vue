<template>
  <div class="main">
    <div class="input-area">
      <div class="input">
        <v-text-field
          :v-model="imgWidth"
          label="width"
          value="300"
          @keyup="onChangeWidth"
        ></v-text-field>
      </div>
      <div class="input">
        <v-text-field
          :v-model="imgHeight"
          label="height"
          value="300"
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
        height="20px"
        color="light-blue"
        :min="-10"
        :max="10"
        thumb-label="always"
        ticks="always"
        @change="onChangeZoom"
      ></v-slider>

      <!-- append-icon="zoom_in"
        prepend-icon="zoom_out"
        @click:append="zoomIn"
        @click:prepend="zoomOut" -->
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
      zoom: 1,
      rules: [v => v >= 10]
    }
  },
  created() {
    const i = new Image()
    i.src = 'https://pbs.twimg.com/media/D1HeoVCV4AANkU-.jpg'
    i.onload = () => (this.drawImage = i)
  },
  mounted() {
    this.transformerNode = this.$refs.image.getStage()
  },
  methods: {
    onChangeWidth: function(e) {
      this.imgWidth = parseInt(e.target.value) || 0
    },
    onChangeHeight: function(e) {
      this.imgHeight = parseInt(e.target.value) || 0
    },
    onChangeZoom: function(e) {
      this.zoom = parseInt(e) / 10 || 0
      this.transformerNode.scale({ x: this.zoom, y: this.zoom })
      this.transformerNode.draw()
    },
    zoomIn: function(e) {
      console.log(e)
    },
    zoomOut: function(e) {}
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
    margin-top: 20px;
    width: 50%;
  }

  .img-area {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    border: 1px solid #ccc;
  }
}
</style>
