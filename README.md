# native-lazy-loading

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Dependency Status][dependency-image]][dependency-url]

Add the `loading` attribute to completely defer the loading of offscreen images and iframes that can be reached by scrolling:

```html
<img src="image.png" loading="lazy" alt="…" width="200" height="200">
<iframe src="https://example.com" loading="lazy"></iframe>
```

Here are the supported values for the loading attribute:

- `auto`: Default lazy-loading behavior of the browser, which is the same as not including the attribute.
- `lazy`: Defer loading of the resource until it reaches a calculated distance from the viewport.
- `eager`: Load the resource immediately, regardless of where it's located on the page  

This feature introduced starting with Chrome 76. The `loading` attribute should not affect code that currently lazy-loads your assets in any way. It is important to continue to use a third-party library along with `loading="lazy"` is to provide a polyfill for browsers that do not yet support the attribute. 

If you are not using any third-party library so this plugin helps you to do that. This plugin replace `src` with `data-src` to avoid an eager load in unsupported browsers. By default, it adds the `lazyload` class if you enable ``. You need to add the below-mentioned script before closing the `</body>` tag to use [lazysizes](https://github.com/aFarkas/lazysizes) in unsupported browsers. [lazysizes](https://github.com/aFarkas/lazysizes) is a popular JavaScript lazy-loading library recommended by [web.dev](https://web.dev/). 

```javascript
<script>
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.getElementsByClassName('native-lazy-loading');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Dynamically import the LazySizes library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js';
    document.body.appendChild(script);
  }
</script>
```

## Install

Via `npm`
```bash
npm install native-lazy-loading
```

Via Yarn
```bash
yarn add native-lazy-loading
```

## Usage

Import Package in `Node.js`.

```javascript
var nativeLazyLoading = require('native-lazy-loading');
```

Import Package in `React`.

```javascript
import nativeLazyLoading from 'native-lazy-loading';
```

## Examples with `loading` attribute only

### Add `loading="lazy"` attribute on all images and iFrames in `Node.js`

```javascript
var nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" />
            <div class="white logos">
              <div class="container">
                <div class="testimonials">
                  <div class="item">
                    <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" />
                  </div>
                  <div class="item">
                    <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" />
                  </div>
                  <div class="item">
                    <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" />
                  </div>                  
                  <div class="item">
                    <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" />
                  </div>
                  <div class="item">
                    <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" />
                  </div>
                  <div class="item">
                    <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" />
                  </div>
                  <div class="item">
                    <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" />
                  </div>
                  <div class="item">
                    <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WPs Engine Logo" title="WP Engine Logo" />
                  </div>
                </div>

                <iframe src="https://www.w3schools.com" name="w3schools"></iframe>
              </div>
            </div>`;

html = nativeLazyLoading(html);
```

### Add `loading="lazy"` attribute on all images and iFrames except on `no-lazy` and `header-images` class in `Node.js`

```javascript
var nativeLazyLoading = require('native-lazy-loading', {
  auto: ['no-lazy', 'header-images'],
});
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" />
            <div class="white logos">
              <div class="container">
                <div class="testimonials">
                  <div class="item">
                    <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" />
                  </div>
                  <div class="item">
                    <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" />
                  </div>
                  <div class="item">
                    <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" />
                  </div>                  
                  <div class="item">
                    <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" />
                  </div>
                  <div class="item">
                    <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" />
                  </div>
                  <div class="item">
                    <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" />
                  </div>
                  <div class="item">
                    <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" />
                  </div>
                  <div class="item">
                    <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WPs Engine Logo" title="WP Engine Logo" />
                  </div>
                </div>

                <iframe src="https://www.w3schools.com" name="w3schools"></iframe>
              </div>
            </div>`;

html = nativeLazyLoading(html);
```
**NOTE:** `auto` means the same as not including the attribute.

### Add `loading="lazy"` attribute on only images and iFrames which contains `lazyload` class

```javascript
var nativeLazyLoading = require('native-lazy-loading', {
  lazy: ['lazyload'],
  defaultValue: ''
});
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" />
            <div class="white logos">
              <div class="container">
                <div class="testimonials">
                  <div class="item">
                    <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" />
                  </div>
                  <div class="item">
                    <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" />
                  </div>
                  <div class="item">
                    <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" />
                  </div>                  
                  <div class="item">
                    <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" />
                  </div>
                  <div class="item">
                    <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" />
                  </div>
                  <div class="item">
                    <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" />
                  </div>
                  <div class="item">
                    <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" />
                  </div>
                  <div class="item">
                    <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WPs Engine Logo" title="WP Engine Logo" />
                  </div>
                </div>

                <iframe src="https://www.w3schools.com" name="w3schools"></iframe>
              </div>
            </div>`;

html = nativeLazyLoading(html);
```

## Examples with `loading` attribute and unsupported browsers

## Parameters


## Return

HTML with adding `loading` attribute on image and iFrame tags.

## Tested

This package is tested with the `Node.js` and `React` Application. 

[npm-image]: https://img.shields.io/npm/v/native-lazy-loading.svg
[npm-url]: https://www.npmjs.com/package/native-lazy-loading
[downloads-image]: https://img.shields.io/npm/dm/native-lazy-loading.svg

[travis-image]: https://img.shields.io/travis/com/samiahmedsiddiqui/native-lazy-loading.svg?label=travis-ci
[travis-url]: https://travis-ci.com/samiahmedsiddiqui/native-lazy-loading

[appveyor-url]: https://ci.appveyor.com/project/samiahmedsiddiqui/native-lazy-loading
[appveyor-image]: https://img.shields.io/appveyor/ci/samiahmedsiddiqui/native-lazy-loading.svg?label=appveyor

[dependency-image]: https://img.shields.io/david/samiahmedsiddiqui/native-lazy-loading.svg
[dependency-url]: https://david-dm.org/samiahmedsiddiqui/native-lazy-loading
