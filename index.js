'use strict';

const parser = require('posthtml-parser');
const render = require('posthtml-render');

function contentTree(treeObj, applyOpt) {
  var classes = [];
  var classesLength = 0;
  var className = '';
  var contentLength = 0;
  var loopInit = 0;
  var loadingValue = applyOpt.defaultValue;
  var tagName = '';

  if (treeObj.content) {
    contentLength = treeObj.content.length;
    for (loopInit = 0; loopInit < contentLength; loopInit += 1) {
      if (treeObj.content[loopInit].tag) {
        treeObj.content[loopInit] = contentTree(treeObj.content[loopInit], applyOpt);
      }
    }
  }

  if (treeObj.tag) {
    tagName = treeObj.tag.toLowerCase();
    if (tagName === 'iframe' || tagName === 'img') {
      if (!treeObj.attrs.loading) {
        if (treeObj.attrs.class) {
          classes = treeObj.attrs.class.split(' ');
          classesLength = classes.length;
          for (loopInit = 0; loopInit < classesLength; loopInit += 1) {
            className = classes[loopInit];
            if (className === '') {
              continue;
            }

            if (applyOpt.auto && typeof applyOpt.auto === 'object' && applyOpt.auto[className]) {
              loadingValue = 'auto';
            } else if (applyOpt.lazy && typeof applyOpt.lazy === 'object' && applyOpt.lazy[className]) {
              loadingValue = 'lazy';
            } else if (applyOpt.eager && typeof applyOpt.eager === 'object' && applyOpt.eager[className]) {
              loadingValue = 'eager';
            }
          }
        }

        if (loadingValue !== '') {
          treeObj.attrs.loading = loadingValue;
        }
      }
    }
  }

  return treeObj;
}

function nativeLazyLoading(html, options,   ) {
  if (typeof html !== 'undefined' && html !== '') {
    const htmlTree = parser(html);
    const treeLength = htmlTree.length;


    var classLength = 0;
    var className = '';
    var loopInit = 0;
    var treeOptions = {
      defaultValue: 'lazy'
    };

    if (typeof options === 'object') {
      if (typeof options.defaultValue === 'string') {
        treeOptions.defaultValue = options.defaultValue;
      }

      if (options.auto && typeof options.auto === 'object' && options.auto[0]) {
        classLength = options.auto.length;
        if (classLength > 0) {
          treeOptions.auto = [];
          for (loopInit = 0; loopInit < classLength; loopInit += 1) {
            className = options.auto[loopInit];
            treeOptions.auto[className] = className;
          }
        }
      }

      if (options.lazy && typeof options.lazy === 'object' && options.lazy[0]) {
        classLength = options.lazy.length;
        if (classLength > 0) {
          treeOptions.lazy = [];
          for (loopInit = 0; loopInit < classLength; loopInit += 1) {
            className = options.lazy[loopInit];
            treeOptions.lazy[className] = className;
          }
        }
      }

      if (options.eager && typeof options.eager === 'object' && options.eager[0]) {
        classLength = options.eager.length;
        if (classLength > 0) {
          treeOptions.eager = [];
          for (loopInit = 0; loopInit < classLength; loopInit += 1) {
            className = options.eager[loopInit];
            treeOptions.eager[className] = className;
          }
        }
      }
    }

    for (loopInit = 0; loopInit < treeLength; loopInit += 1) {
      if (htmlTree[loopInit].tag) {
        htmlTree[loopInit] = contentTree(htmlTree[loopInit], treeOptions);
      }
    }

    html = render(htmlTree, options);
  }

  return html;
}

module.exports = nativeLazyLoading;
