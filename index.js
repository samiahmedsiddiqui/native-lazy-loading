'use strict';

function nativeLazyLoading(html, options) {
  if (typeof html !== 'undefined' && html !== '') {
    const iframeRegex = /(<iframe (.*?) >)/gmi;
    const imgRegex = /(<img (.*?) \/>)/gmi;
    const matchedIframe = html.match(iframeRegex);
    const matchedIframeLength = matchedIframe.length;
    const matchedImg = html.match(imgRegex);
    const matchedImgLength = matchedImg.length;

    var avoidLoading = 0;
    var breakAttr = [];
    var breakAttrLength = [];
    var loopInit;
    var loopInnerInit;
    var newIframeTag;
    var newImgTag;

    for (loopInit = 0; loopInit < matchedImgLength; loopInit += 1) {
      breakAttr = matchedImg[loopInit].split(' ');
      breakAttrLength = breakAttr.length;
      avoidLoading = 0;
      for (loopInnerInit = 0; loopInnerInit < breakAttrLength; loopInnerInit += 1) {
        if (breakAttr[loopInnerInit].startsWith('loading=')) {
          avoidLoading = 1;
          break;
        }
      }

      if (avoidLoading === 0) {
        newImgTag = matchedImg[loopInit].split('/>')[0] + ' loading="lazy" />';
        html = html.replace(matchedImg[loopInit], newImgTag);
      }
    }

    for (loopInit = 0; loopInit < matchedIframeLength; loopInit += 1) {
      breakAttr = matchedIframe[loopInit].split(' ');
      breakAttrLength = breakAttr.length;
      avoidLoading = 0;
      for (loopInnerInit = 0; loopInnerInit < breakAttrLength; loopInnerInit += 1) {
        if (matchedIframe[loopInnerInit].startsWith('loading=')) {
          avoidLoading = 1;
          break;
        }
      }

      if (avoidLoading === 0) {
        newIframeTag = matchedIframe[loopInit].split('>')[0] + ' loading="lazy" >';
        html = html.replace(matchedIframe[loopInit], newIframeTag);
      }
    }
  }

  return html;
}

module.exports = nativeLazyLoading;
