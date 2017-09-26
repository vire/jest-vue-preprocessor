<template>
  <div id="app">
    <div class="lorem-class">some test text</div>
    <button v-on:click="clickHandler('value passed to clickHandler')">Click Me!</button>
  </div>
</template>

<script>
  export default {
    props: {
      onClick: {
        type: Function,
        required: true
      }
    },
    name: 'app',
    methods: {
      clickHandler(input) {
        this.onClick(input);
      },
    }
  }
</script>

<style>
  body {
    color: red;
  }
</style>
