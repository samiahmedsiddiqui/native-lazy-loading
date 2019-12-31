'use strict';

const parser = require('posthtml-parser');
const render = require('posthtml-render');

function contentTree(treeObj, applyOpt, compatibility, library) {
  const addClass = [];
  const defaultClass = 'native-lazy-loading';
  const loadingClass = 'lazy-loading';

  var checkCompClass = 0;
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
        treeObj.content[loopInit] = contentTree(treeObj.content[loopInit], applyOpt, compatibility, library);
      }
    }
  }

  if (treeObj.tag) {
    tagName = treeObj.tag.toLowerCase();
    if (tagName === 'iframe' || tagName === 'img') {
      if (treeObj.attrs.class) {
        classes = treeObj.attrs.class.replace(/\s\s+/g, ' ').split(' ');
        classesLength = classes.length;
      }

      if (!treeObj.attrs.loading) {
        for (loopInit = 0; loopInit < classesLength; loopInit += 1) {
          className = classes[loopInit];

          if (applyOpt.auto && typeof applyOpt.auto === 'object' && applyOpt.auto[className]) {
            loadingValue = 'auto';
          } else if (applyOpt.lazy && typeof applyOpt.lazy === 'object' && applyOpt.lazy[className]) {
            loadingValue = 'lazy';
          } else if (applyOpt.eager && typeof applyOpt.eager === 'object' && applyOpt.eager[className]) {
            loadingValue = 'eager';
          }
        }

        if (loadingValue !== '') {
          treeObj.attrs.loading = loadingValue;
          addClass.push(loadingClass);
        }
      }

      if (compatibility && compatibility === true) {
        if (library.notAllowed.length > 0) {
          for (loopInit = 0; loopInit < classesLength; loopInit += 1) {
            if (library.notAllowed[loopInit] === classes[loopInit]) {
              checkCompClass = 1;
              break;
            }
          }
        }

        if (checkCompClass === 0) {
          if (!treeObj.attrs['data-src'] && treeObj.attrs.src) {
            treeObj.attrs['data-src'] = treeObj.attrs.src;

            if (library.newSrc && library.newSrc !== '') {
              treeObj.attrs.src = library.newSrc;
            } else {
              delete treeObj.attrs.src;
            }
          }

          if (library.class && library.class !== '') {
            addClass.push(library.class);
          }
        }
      }

      if (addClass.length > 0) {
        addClass.unshift(defaultClass);
        if (treeObj.attrs.class) {
          treeObj.attrs.class += ' ' + addClass.join(' ');
        } else {
          treeObj.attrs.class = addClass.join(' ');
        }
      }
    }
  }

  return treeObj;
}

function nativeLazyLoading(html, options, compatibility, library) {
  if (typeof html !== 'undefined' && html !== '') {
    const htmlTree = parser(html);
    const treeLength = htmlTree.length;

    var checkComp = false;
    var classLength = 0;
    var className = '';
    var lib = {
      class: 'lazyload',
      newSrc: '',
      notAllowed: []
    };
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

    if (typeof compatibility === 'boolean') {
      checkComp = compatibility;
    }

    if (library && typeof library === 'object') {
      if (library.class) {
        lib.class = library.class;
      }

      if (library.newSrc) {
        lib.newSrc = library.newSrc;
      }

      if (library.notAllowed && library.notAllowed.length > 0) {
        lib.notAllowed = library.notAllowed;
      }
    }

    for (loopInit = 0; loopInit < treeLength; loopInit += 1) {
      if (htmlTree[loopInit].tag) {
        htmlTree[loopInit] = contentTree(htmlTree[loopInit], treeOptions, checkComp, lib);
      }
    }

    html = render(htmlTree, options);
  }

  return html;
}

module.exports = nativeLazyLoading;
