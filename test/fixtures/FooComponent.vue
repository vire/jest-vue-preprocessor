<template>
  <div id="app">
    <div class="lorem-class">some test text</div>
    <button v-on:click="clickHandler('value passed to clickHandler')">Click Me!</button>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      clickHandler(input) {
        return input + 1;
      }
    }
  }
</script>

<style>
  body {
    color: red;
  }
</style>
