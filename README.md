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
- `eager`: Load the resource immediately, regardless of where it's located on the page.

This feature introduced starting with Chrome 76. The `loading` attribute should not affect code that currently lazy-loads your assets in any way. It is important to continue to use a third-party library along with `loading="lazy"` is to provide a polyfill for browsers that do not yet support the attribute. 

If you are not using any third-party library so this plugin helps you to do that. This plugin replace `src` with `data-src` to avoid an eager load in unsupported browsers. By default, it adds the `lazyload` class if you enable `compatibility`. You need to add the below-mentioned script before closing the `</body>` tag to use [lazysizes](https://github.com/aFarkas/lazysizes) in unsupported browsers. [lazysizes](https://github.com/aFarkas/lazysizes) is a popular JavaScript lazy-loading library recommended by [web.dev](https://web.dev/). 

```javascript
<script>
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('.native-lazy-loading');
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
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

## Parameters

| Attributes    |              Type             | Required |       Default       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|:-----------------------------:|:--------:|:-------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| html          |             String            |    Yes   |                     | HTML in which `loading` attribute needs to be applied on `image` and `iframe` tags.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| options       | [Object](#options-attributes) |    No    |   `loading="lazy"`  | By default, it adds `loading="lazy"` in images and iframe tags. If you like to apply different `loading` attributes **OR** only apply `loading` attributes in a specific image and iframe then you use this attribute.<br><br>You can find more details in [Examples with loading attribute only](#examples-with-loading-attribute-only).                                                                                                                                                                                                                    |
| compatibility |            Boolean            |    No    |       `false`       | Just pass `true` if you like to apply `lazysizes` or any other third-party lazyload for the unsupported browsers/versions with the help of this package. <br><br>By enabling this, It will do the following things:<br><br>1. Change `src` to `data-src`<br>2. Add custom class like `lazyload` by default which is used by `lazysizes`.<br>3. Add placeholder image if set in `library` attribute.<br><br>Check [Examples with `loading` attribute and unsupported browsers](#examples-with-loading-attribute-and-unsupported-browsers) for further details |
| library       | [Object](#library-attributes) |    No    | `class: 'lazyload'` | This option is used if you like to use any third party lazyload other than `lazysizes` to handle browsers that don't yet support `native lazy-loading`.                                                                                                                                                                                                                                                                                                                                                                                                      |

### `options` Attributes

| Attributes   |  Type  | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
|--------------|:------:|:--------:|:-------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| auto         |  Array |    No    |         | Class array on which you like to apply `auto` value of `loading` attribute.                                                                                                                                                                                                                                                                                                                                          |
| lazy         |  Array |    No    |         | Class array on which you like to apply `lazy` value of `loading` attribute.                                                                                                                                                                                                                                                                                                                                          |
| eager        |  Array |    No    |         | Class array on which you like to apply `eager` value of `loading` attribute.                                                                                                                                                                                                                                                                                                                                         |
| defaultValue | String |    No    |  `lazy` | This is applicable on all the other image and iframe tags which don't have any class **OR** which have class but not matched with any of the defined classes.<br><br>For further details check the [example 2](#add-loadinglazy-attribute-on-all-images-and-iframes-except-on-no-lazy-and-header-images-class) and [example 3](#add-loadinglazy-attribute-on-only-images-and-iframes-which-contains-lazyload-class). |

### `library` Attributes

| Attributes |  Type  | Required |   Default  | Description                                                                                                                                                                                                                                                                                                                                                                                             |
|------------|:------:|:--------:|:----------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| class      | String |    No    | `lazyload` | Every lazyload library works on its defined class. You can set the class name from here.                                                                                                                                                                                                                                                                                                                |
| newSrc     | String |    No    |            | To load placeholder image like `loading.gif`, you can use this attribute.                                                                                                                                                                                                                                                                                                                               |
| notAllowed |  Array |    No    |            | To avoid all the changes in any specific image and iframe tag you can add their class name in this attribute.<br><br>No changes will be made on the matched classes. For further clarification check [Add loading="lazy" attribute on all images and iFrames with custom class except on no-lazy class](#add-loadinglazy-attribute-on-all-images-and-iframes-with-custom-class-except-on-no-lazy-class) |

## Examples with `loading` attribute only

### Add `loading="lazy"` attribute on all images and iFrames

```javascript
const nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
            <div class="white logos">
              <div class="container">
                <div class="testimonials">
                  <div class="item">
                    <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WPs Engine Logo" title="WP Engine Logo" class="lazyload" />
                  </div>
                </div>

                <iframe src="https://www.w3schools.com" name="w3schools"  class="lazyload"></iframe>
              </div>
            </div>`;

html = nativeLazyLoading(html);

console.log(html);
```

### Add `loading="lazy"` attribute on all images and iFrames except on `no-lazy` and `header-images` class

```javascript
const nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
            <div class="white logos">
              <div class="container">
                <div class="testimonials">
                  <div class="item">
                    <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WPs Engine Logo" title="WP Engine Logo" class="lazyload" />
                  </div>
                </div>

                <iframe src="https://www.w3schools.com" name="w3schools"  class="lazyload"></iframe>
              </div>
            </div>`;

html = nativeLazyLoading(html, {
  auto: ['no-lazy', 'header-images']
});

console.log(html);
```

**NOTE:** `auto` means the same as not including the attribute.

### Add `loading="lazy"` attribute on only images and iFrames which contains `lazyload` class

```javascript
const nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
            <div class="white logos">
              <div class="container">
                <div class="testimonials">
                  <div class="item">
                    <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WPs Engine Logo" title="WP Engine Logo" class="lazyload" />
                  </div>
                </div>

                <iframe src="https://www.w3schools.com" name="w3schools"  class="lazyload"></iframe>
              </div>
            </div>`;

html = nativeLazyLoading(html, {
  lazy: ['lazyload'],
  defaultValue: ''
});

console.log(html);
```

## Examples with `loading` attribute and unsupported browsers

### Add `loading="lazy"` attribute on all images and iFrames with `lazysizes` class

```javascript
const nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
            <div class="white logos">
              <div class="container">
                <div class="testimonials">
                  <div class="item">
                    <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WPs Engine Logo" title="WP Engine Logo" class="lazyload" />
                  </div>
                </div>

                <iframe src="https://www.w3schools.com" name="w3schools"  class="lazyload"></iframe>
              </div>
            </div>`;

html = nativeLazyLoading(html, {}, true);

console.log(html);
```

### Add `loading="lazy"` attribute on all images and iFrames with custom class

```javascript
const nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
            <div class="white logos">
              <div class="container">
                <div class="testimonials">
                  <div class="item">
                    <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WPs Engine Logo" title="WP Engine Logo" class="lazyload" />
                  </div>
                </div>

                <iframe src="https://www.w3schools.com" name="w3schools"  class="lazyload"></iframe>
              </div>
            </div>`;

html = nativeLazyLoading(html, {}, true, {
  class: 'lazy'
});

console.log(html);
```

### Add `loading="lazy"` attribute on all images and iFrames with custom class except on `no-lazy` class

```javascript
const nativeLazyLoading = require('../index');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
            <div class="white logos">
              <div class="container">
                <div class="testimonials">
                  <div class="item">
                    <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="lazyload" />
                  </div>
                  <div class="item">
                    <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WPs Engine Logo" title="WP Engine Logo" class="lazyload" />
                  </div>
                </div>

                <iframe src="https://www.w3schools.com" name="w3schools"  class="lazyload"></iframe>
              </div>
            </div>`;

html = nativeLazyLoading(html, {}, true, {
  class: 'lazy',
  notAllowed: ['no-lazy']
});

console.log(html);
```

**NOTE:** Make sure to add the script as mentioned in the description before clsoing the `</body>` tag if you are willing to use `lazysizes` for unsupported versions/browsers.

## Return

HTML with adding `loading` attribute on image and iFrame tags. Also, change `src` with `data-src` if `compatibility` set to `true` and apply the `lazysizes` class for unsupported browsers, if you like to apply separate class then you can define it in `library` object.

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
