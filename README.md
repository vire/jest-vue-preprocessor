# jest-vue-preprocessor
[![Build Status](https://travis-ci.org/vire/jest-vue-preprocessor.svg?branch=master)](https://travis-ci.org/vire/jest-vue-preprocessor) [![npm version](https://badge.fury.io/js/jest-vue-preprocessor.svg)](https://badge.fury.io/js/jest-vue-preprocessor) [![codecov](https://codecov.io/gh/vire/jest-vue-preprocessor/branch/master/graph/badge.svg)](https://codecov.io/gh/vire/jest-vue-preprocessor)

A [locoslab/vue-typescript-jest](https://github.com/locoslab/vue-typescript-jest) JavaScript port to allow Jest load [.vue files](https://vue-loader.vuejs.org/en/) in tests.

Portions both preprocessors are heavily based [vueify](https://github.com/vuejs/vueify) (Copyright (c) 2014-2016 Evan You).

### Installation

  1.  add package you your project
    
   *  `yarn add --dev jest-vue-preprocessor` or  `npm install --saveDev jest-vue-preprocessor`
 
  2.  modify package.json's **jest** section by adding/editing **moduleFileExtensions** and **transform** properites:

    ```json
    "jest": {
      "moduleFileExtensions": [
        "js",
        "vue"
      ],
      "transform": {
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
        ".*\\.(vue)$": "<rootDir>/node_modules/jest-vue-preprocessor"
      }
    }
    ```
  3.  Start writing test that can import `*.vue` components - see example **./tests/index.spec.js**
  4.  Profit!
