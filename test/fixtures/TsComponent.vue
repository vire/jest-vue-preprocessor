<template>
  <div id="app">
    <div class="lorem-class">some test text</div>
    <button v-on:click="clickHandler('value passed to clickHandler')">Click Me!</button>
  </div>
</template>

<script lang="ts">
  import Vue = require('vue')
  import { Component, Prop } from 'vue-property-decorator'

  @Component
  export default class App extends Vue {
    name = 'app'
    @Prop() onClick: Function
    clickHandler(input) {
      this.onClick(input);
    }
  }
</script>

<style>
  body {
    color: red;
  }
</style>

