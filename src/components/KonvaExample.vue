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
      <div class="input text">
        <v-text-field
          :v-model="text"
          label="text"
          :value="text"
          @keyup="onChangeText"
        ></v-text-field>
      </div>
      <div class="input text font-size">
        <v-text-field
          :v-model="textSize"
          label="font-size"
          :value="textSize"
          @keyup="onChangeTextSize"
        ></v-text-field>
      </div>
      <div class="input text color">
        <label for="font-color">color</label>
        <input
          id="font-color"
          type="color"
          @change="onChangeTextColor"
          value="#ff30cd"
        ></input>
      </div>
    </div>

    <div class="canvas-area">
      <v-stage
        ref="stage"
        :config="{ width: this.imgWidth, height: this.imgHeight }"
      >
        <v-layer
          ref="img-layer"
          :config="{ draggable: true }"
        >
          <v-image
            ref="image"
            :config="{ image: drawImage }"
          ></v-image>
        </v-layer>
        <v-layer
          ref="text-layer"
          :config="{ draggable: true }"
        >
          <v-text
            ref="text"
            :config="{ text: text, fontSize: textSize, fill: textFill }"
          ></v-text>
        </v-layer>
      </v-stage>
    </div>

    <div class="slider-area">
      <label for="scale">scale</label>
      <v-slider
        id="scale"
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
      text: '',
      textFill: '#000',
      textSize: 12,
      textStyle: 'normal',
      transformerNode: null,
      minZoom: 1,
      maxZoom: 10,
      zoom: 1,
      rules: []
    }
  },
  created() {
    const i = new Image()
    i.src = 'https://i.ytimg.com/vi/etUTQKP8a5I/maxresdefault.jpg'
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
    onChangeText: function(e) {
      this.text = e.target.value
    },
    onChangeTextColor: function(e) {
      this.textFill = e.target.value
    },
    onChangeTextSize: function(e) {
      this.textSize = parseInt(e.target.value)
    },
    onChangeTextStyle: function(e) {
      this.textStyle = e.target.value
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
  align-items: center;
  margin-top: 50px;

  .input-area {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .input {
      width: 100px;
      margin: 0 20px;
      &.text {
        width: 150px;
      }
      &.font-size {
        margin: 0 10px;
        width: 70px;
      }
      &.color {
        margin: 0;
        width: 50px;
      }
    }
  }

  .slider-area {
    margin-top: 30px;
    width: 600px;
  }

  .canvas-area {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    border: 1px solid #ccc;
  }
}
</style>
