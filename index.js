"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const htmlParser = __importStar(require("posthtml-parser"));
const posthtml_render_1 = require("posthtml-render");
function contentTree(treeObj, applyOpt, compatibility, library) {
    const addClass = [];
    const defaultClass = 'native-lazy-loading';
    const loadingClass = 'lazy-loading';
    let checkCompClass = 0;
    let classes = [];
    let classesLength = 0;
    if (treeObj.content) {
        let contentLength = 0;
        if (typeof treeObj.content === 'object') {
            contentLength = treeObj.content.length;
        }
        for (let loopInit = 0; loopInit < contentLength; loopInit += 1) {
            if (treeObj.content[loopInit] && treeObj.content[loopInit].tag) {
                treeObj.content[loopInit] = contentTree(treeObj.content[loopInit], applyOpt, compatibility, library);
            }
        }
    }
    if (treeObj.tag) {
        let tagName = treeObj.tag;
        if (typeof tagName === 'string') {
            tagName = tagName.toLowerCase();
        }
        if (!treeObj.attrs) {
            treeObj.attrs = {};
        }
        if (tagName === 'iframe' || tagName === 'img') {
            if (treeObj.attrs.class && typeof treeObj.attrs.class === 'string') {
                classes = treeObj.attrs.class.replace(/\s\s+/g, ' ').split(' ');
                classesLength = classes.length;
            }
            if (!treeObj.attrs.loading) {
                let loadingValue = applyOpt.defaultValue;
                for (let loopInit = 0; loopInit < classesLength; loopInit += 1) {
                    const className = classes[loopInit];
                    if (applyOpt.auto && applyOpt.auto.indexOf(className) !== -1) {
                        loadingValue = 'auto';
                    }
                    else if (applyOpt.lazy && applyOpt.lazy.indexOf(className) !== -1) {
                        loadingValue = 'lazy';
                    }
                    else if (applyOpt.eager && applyOpt.eager.indexOf(className) !== -1) {
                        loadingValue = 'eager';
                    }
                }
                if (loadingValue !== '') {
                    treeObj.attrs.loading = loadingValue;
                    addClass.push(loadingClass);
                }
            }
            if (compatibility && compatibility === true) {
                if (library.notAllowed && library.notAllowed.length > 0) {
                    const notAllowedLength = library.notAllowed.length;
                    for (let loopInit = 0; loopInit < classesLength; loopInit += 1) {
                        for (let loopNotAllowed = 0; loopNotAllowed < notAllowedLength; loopNotAllowed += 1) {
                            if (library.notAllowed[loopNotAllowed] === classes[loopInit]) {
                                checkCompClass = 1;
                                break;
                            }
                        }
                    }
                }
                if (checkCompClass === 0) {
                    if (!treeObj.attrs['data-src'] && treeObj.attrs.src) {
                        treeObj.attrs['data-src'] = treeObj.attrs.src;
                        if (library.newSrc && library.newSrc !== '') {
                            treeObj.attrs.src = library.newSrc;
                        }
                        else {
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
                }
                else {
                    treeObj.attrs.class = addClass.join(' ');
                }
            }
        }
    }
    return treeObj;
}
function nativeLazyLoading(html, options, compatibility, library) {
    if (typeof html !== 'undefined' && html !== '') {
        const htmlTree = htmlParser.parser(html);
        const lib = {
            class: 'lazyload',
            newSrc: '',
            notAllowed: []
        };
        const treeOptions = {
            defaultValue: 'lazy'
        };
        let checkComp = false;
        let classLength = 0;
        let loopInit = 0;
        if (typeof options === 'object') {
            if (typeof options.defaultValue === 'string') {
                treeOptions.defaultValue = options.defaultValue;
            }
            if (options.auto && typeof options.auto === 'object' && options.auto.length > 0) {
                classLength = options.auto.length;
                treeOptions.auto = [];
                for (loopInit = 0; loopInit < classLength; loopInit += 1) {
                    treeOptions.auto.push(options.auto[loopInit]);
                }
            }
            if (options.lazy && typeof options.lazy === 'object' && options.lazy.length > 0) {
                classLength = options.lazy.length;
                treeOptions.lazy = [];
                for (loopInit = 0; loopInit < classLength; loopInit += 1) {
                    treeOptions.lazy.push(options.lazy[loopInit]);
                }
            }
            if (options.eager && typeof options.eager === 'object' && options.eager.length > 0) {
                classLength = options.eager.length;
                treeOptions.eager = [];
                for (loopInit = 0; loopInit < classLength; loopInit += 1) {
                    const className = options.eager[loopInit];
                    treeOptions.eager.push(className);
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
        const finalHTMLTree = htmlTree.map(function (treePart) {
            let mappedPart = treePart;
            if (typeof treePart === 'object') {
                mappedPart = contentTree(treePart, treeOptions, checkComp, lib);
            }
            return mappedPart;
        });
        html = (0, posthtml_render_1.render)(finalHTMLTree);
    }
    return html;
}
module.exports = nativeLazyLoading;
