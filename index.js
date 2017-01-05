const vueCompiler = require('vue-template-compiler');
const vueNextCompiler = require('vue-template-es2015-compiler');
const babelCore = require('babel-core');

const transformBabel = src => {
  const transformOptions = {
    presets: ['es2015'],
    plugins: ['transform-runtime'],
  };

  let result;
  try {
    result = babelCore.transform(src, transformOptions).code;
  } catch (error) {
    // eslint-disable-next-line
    console.error('Failed to compile scr with `babel` at `vue-preprocessor`');
  }
  return result;
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
    ';(function(){\n' + script + '\n})()\n' +
    'if (module.exports.__esModule) module.exports = module.exports.default\n';
  output += 'var __vue__options__ = (typeof module.exports === "function"' +
    '? module.exports.options: module.exports)\n';
  if (renderFn && staticRenderFns) {
    output +=
      '__vue__options__.render = ' + renderFn + '\n' +
      '__vue__options__.staticRenderFns = ' + staticRenderFns + '\n';
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
    const { script, template } = vueCompiler.parseComponent(src, { pad: true});
    const transformedScript = transformBabel(script.content);
    let render;
    let staticRenderFns;
    if (template) {
      const HTML = extractHTML(template, filePath);
      const res = HTML && vueCompiler.compile(HTML);
      render = stringifyRender(res.render);
      staticRenderFns = stringifyStaticRender(res.staticRenderFns);
    }
    
    return generateOutput(transformedScript, render, staticRenderFns);
  }
};
