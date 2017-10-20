export default {
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
  name: 'app',
  methods: {
    clickHandler(input) {
      this.onClick(input);
    },
  },
};
