/* eslint-env node */
const vueCompiler = require('vue-template-compiler');
const vueNextCompiler = require('vue-template-es2015-compiler');
const babelCore = require('babel-core');
const cosmiconfig = require('cosmiconfig');

const getBabelConfig = () => {
  let explorer = cosmiconfig('babel');
  return new Promise(resolve => {
    explorer.load(process.cwd())
      .then(result => {
        resolve(result.config);
      })
      .catch(() => {
        resolve({
          presets: ['es2015'],
          plugins: ['transform-runtime'],
        });
      });
  });
};

const transformBabel = src => {
  return new Promise((resolve, reject) => {
    try {
      getBabelConfig()
        .then((config) => {
          let result = babelCore.transform(src, config).code;
          resolve(result);
        });
    } catch (error) {
      let errMsg = 'Failed to compile scr with `babel` at `vue-preprocessor`';
      // eslint-disable-next-line
      console.error(errMsg);
      reject(errMsg);
    }
  });

};

const extractHTML = (template, templatePath) => {
  let resultHTML = '';

  if (!template.lang || template.lang === 'resultHTML') {
    resultHTML = template.content;
  } else if (template.lang === 'pug') {
    resultHTML = require('pug').compile(template.content)();
  } else {
    throw templatePath + ': unknown <template lang="' + template.lang + '">';
  }

  return resultHTML;
};

const generateOutput = (script, renderFn, staticRenderFns) => {
  let output = '';
  output +=
    '/* istanbul ignore next */;(function(){\n' + script + '\n})()\n' +
    '/* istanbul ignore next */if (module.exports.__esModule) module.exports = module.exports.default\n';
  output += '/* istanbul ignore next */var __vue__options__ = (typeof module.exports === "function"' +
    '? module.exports.options: module.exports)\n';
  if (renderFn && staticRenderFns) {
    output +=
      '/* istanbul ignore next */__vue__options__.render = ' + renderFn + '\n' +
      '/* istanbul ignore next */__vue__options__.staticRenderFns = ' + staticRenderFns + '\n';
  }
  return output;
};

const stringifyRender = render => vueNextCompiler('function render () {' + render + '}');

const stringifyStaticRender = staticRenderFns => `[${staticRenderFns.map(stringifyRender).join(',')}]`;

module.exports = {
  process(src, filePath) {
    // code copied from https://github.com/locoslab/vue-typescript-jest/blob/master/preprocessor.js
    // LICENSE MIT
    // @author https://github.com/locobert
    // heavily based on vueify (Copyright (c) 2014-2016 Evan You)
    return new Promise(resolve => {
      const { script, template } = vueCompiler.parseComponent(src, { pad: true });
      transformBabel(script.content).then(transformedScript => {

        let render;
        let staticRenderFns;
        if (template) {
          const HTML = extractHTML(template, filePath);
          const res = HTML && vueCompiler.compile(HTML);
          render = stringifyRender(res.render);
          staticRenderFns = stringifyStaticRender(res.staticRenderFns);
        }

        resolve(generateOutput(transformedScript, render, staticRenderFns));
      });
    });
  }
};
