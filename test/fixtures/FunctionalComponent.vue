<template functional>
  <div id="app" class="functional-component">
    <div class="lorem-class">some test text</div>
    <button v-on:click="props.onClick('value passed to clickHandler')">Click Me!</button>
  </div>
</template>
