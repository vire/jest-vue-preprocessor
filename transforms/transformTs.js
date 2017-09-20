/* eslint-env node */

const path = require('path');
const tsc = require('typescript');
const transformBabel = require('./transformBabel');

const getTsConfig = () => {
  try {
    return require(path.resolve(process.cwd(), 'tsconfig.json'));
  } catch (error) {
    return {};
  }
};

module.exports = function transformTs(src, filename, render, staticRenderFns) {
  const compilerOptions = Object.assign(
    {},
    getTsConfig().compilerOptions,
    {
      sourceMap: true
    }
  );

  try {
    const {
      outputText,
      sourceMapText
    } = tsc.transpileModule(src, { compilerOptions });

    return transformBabel(outputText, filename, render, staticRenderFns, JSON.parse(sourceMapText));
  } catch (error) {
    // eslint-disable-next-line
    console.error('Failed to compile src with `tsc` at `vue-preprocessor`');
  }
};
