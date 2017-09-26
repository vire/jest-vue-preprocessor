/* eslint-env node */

const template = require('babel-template');
const babelCore = require('babel-core');
const t = babelCore.types;
const findBabelConfig = require('find-babel-config');

const defaultConfig = {
  presets: ['es2015'],
  plugins: ['transform-runtime'],
};

function appendRenderPlugin(render, staticRenderFns) {
  const buildVueOptions = template(`
    var __vue__options__ = (
      typeof module.exports === "function"
      ? module.exports.options : module.exports
    );
    __vue__options__.render = ${render};
    __vue__options__.staticRenderFns = ${staticRenderFns};
  `);

  return () => {
    if (!render || !staticRenderFns) {
      return {};
    }

    return {
      visitor: {
        Program: {
          exit(path) {
            path.pushContainer('body', buildVueOptions());
          }
        },
        MemberExpression(path) {
          if (path.get('object.name').node === 'exports' &&
            path.get('property.name').node === 'default'
          ) {
            path.replaceWith(
              t.memberExpression(t.identifier('module'), t.identifier('exports'))
            );
          }
        }
      }
    };
  };
}

module.exports = function transformBabel (src, filename, render, staticRenderFns, inputSourceMap) {
  const { config = defaultConfig } = findBabelConfig.sync(process.cwd());

  const combinedTransformOptions = Object.assign({}, config, {
    sourceMaps: true,
    inputSourceMap,
    filename,
    plugins: (config.plugins || []).concat([
      appendRenderPlugin(render, staticRenderFns)
    ])
  });

  let result;
  try {
    result = babelCore.transform(src, combinedTransformOptions);
  } catch (error) {
    // eslint-disable-next-line
    console.error('Failed to compile scr with `babel` at `vue-preprocessor`');
  }
  return result;
};
