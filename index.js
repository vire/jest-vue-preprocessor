/* eslint-env node */
const fs = require('fs');
const path = require('path');
const vueCompiler = require('vue-template-compiler');
const vueNextCompiler = require('vue-template-es2015-compiler');
const transforms = require('./transforms');

const extractHTML = (template, templatePath) => {
  let resultHTML = '';

  if (template.content === '' && template.src !== '') {
    template.content = fs.readFileSync(path.resolve(path.dirname(templatePath), template.src), 'utf8');
  }

  if (!template.lang || template.lang === 'resultHTML') {
    resultHTML = template.content;
  } else if (template.lang === 'pug') {
    resultHTML = require('pug').compile(template.content)();
  } else {
    throw templatePath + ': unknown <template lang="' + template.lang + '">';
  }

  return resultHTML;
};

const extractScriptContent = (script, scriptPath) => {
  if( !script ) {
    throw 'No script available to transform';
  }
  if (script.content === '' && script.src !== '') {
    script.content = fs.readFileSync(path.resolve(path.dirname(scriptPath), script.src), 'utf8');
  }
  return script.content;
};

const stringifyRender = render => vueNextCompiler('function render () {' + render + '}');

const stringifyStaticRender = staticRenderFns => `[${staticRenderFns.map(stringifyRender).join(',')}]`;

module.exports = {
  process(src, filePath) {
    // code copied from https://github.com/locoslab/vue-typescript-jest/blob/master/preprocessor.js
    // LICENSE MIT
    // @author https://github.com/locobert
    // heavily based on vueify (Copyright (c) 2014-2016 Evan You)

    const { script, template } = vueCompiler.parseComponent(src, { pad: false });

    let render;
    let staticRenderFns;
    if (template) {
      const HTML = extractHTML(template, filePath);
      const res = HTML && vueCompiler.compile(HTML);
      render = stringifyRender(res.render);
      staticRenderFns = stringifyStaticRender(res.staticRenderFns);
    }

    let scriptContent = { code: '' };
    scriptContent = extractScriptContent(script, filePath);

    const transformKey = script.lang || 'babel';
    return transforms[transformKey](scriptContent, filePath, render, staticRenderFns);
  },
};
