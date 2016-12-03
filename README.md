# jest-vue-preprocessor
[![Build Status](https://travis-ci.org/vire/jest-vue-preprocessor.svg?branch=master)](https://travis-ci.org/vire/jest-vue-preprocessor) [![codecov](https://codecov.io/gh/vire/jest-vue-preprocessor/branch/master/graph/badge.svg)](https://codecov.io/gh/vire/jest-vue-preprocessor)

A [locoslab/vue-typescript-jest](https://github.com/locoslab/vue-typescript-jest) JavaScript port to allow Jest load [.vue files](https://vue-loader.vuejs.org/en/) in tests.

Portions both preprocessors are heavily based [vueify](https://github.com/vuejs/vueify) (Copyright (c) 2014-2016 Evan You).

### Installation

  * install package `yarn add --dev jest-vue-preprocessor` or `npm install --saveDev jest-vue-preprocessor`
  * modify package.json's `jest` section:
    ```json
    "jest": {
      "moduleFileExtensions": [
        "js",
        "vue"
      ],
      "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$",
      "transform": {
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
        ".*\\.(vue)$": "<rootDir>/index.js"
      }
    }
    ```
