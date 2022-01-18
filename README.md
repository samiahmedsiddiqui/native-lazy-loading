# native-lazy-loading

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Open Issues][issues-image]][issues-url] [![License][license-image]][license-url]

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

If you are not using any third-party library so this plugin helps you to do that. This plugin replaces `src` with `data-src` to avoid an eager load in unsupported browsers. By default, it adds the `lazyload` class if you enable `compatibility`. You need to add the below-mentioned script before closing the `</body>` tag to use [lazysizes](https://github.com/aFarkas/lazysizes) in unsupported browsers. [Lazysizes](https://github.com/aFarkas/lazysizes) is a popular JavaScript lazy-loading library recommended by [web.dev](https://web.dev/).

#### `loading` attribute with `lazysizes`

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

If you don't like to use the `loading` attribute and want to disable it so just pass the  `defaultValue: ''`  as shown in [Disable Native Load and use `lazysizes` library](#disable-native-load-and-use-lazysizes-library) example. In this case, you need to add the below-mentioned script before closing the `</body>` tag.

#### Use `lazysizes` without `loading` attribute

```javascript
<script>
  // Dynamically import the LazySizes library
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js';
  document.body.appendChild(script);
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

| Attributes   |  Type  | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|--------------|:------:|:--------:|:-------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| auto         |  Array |    No    |         | Class array on which you like to apply `auto` value of `loading` attribute.                                                                                                                                                                                                                                                                                                                                                                                               |
| lazy         |  Array |    No    |         | Class array on which you like to apply `lazy` value of `loading` attribute.                                                                                                                                                                                                                                                                                                                                                                                               |
| eager        |  Array |    No    |         | Class array on which you like to apply `eager` value of `loading` attribute.                                                                                                                                                                                                                                                                                                                                                                                              |
| defaultValue | String |    No    |  `lazy` | This is applicable on all the other image and iframe tags which don't have any class **OR** which have class but not matched with any of the defined classes.<br><br>For further details, please check the [example 2](#add-loadinglazy-attribute-on-all-images-and-iframes-except-on-no-lazy-and-header-images-class) and [example 3](#add-loadinglazy-attribute-on-only-images-and-iframes-which-contains-lazyload-class) under *Examples with loading attribute only*. |

### `library` Attributes

| Attributes |  Type  | Required |   Default  | Description                                                                                                                                                                                                                                                                                                                                                  |
|------------|:------:|:--------:|:----------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| class      | String |    No    | `lazyload` | Every lazyload library works on its defined class. You can set the class name from here.                                                                                                                                                                                                                                                                     |
| newSrc     | String |    No    |            | To load placeholder image like `loading.gif`, you can use this attribute.                                                                                                                                                                                                                                                                                    |
| notAllowed |  Array |    No    |            | To avoid using any third-party lazyload library in any specific image and/or iframe tag you can add its class name in this attribute.<br><br>No `compatibility` changes will be made on the matched classes. For further clarification check [this example](#add-loadinglazy-attribute-on-all-images-and-iframes-with-custom-class-except-on-no-lazy-class). |

## Examples with `loading` attribute only

### Add `loading="lazy"` attribute on all images and iFrames

```javascript
const nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
<div class="white logos">
  <div class="container">
    <div class="testimonials">
      <div class="item">
        <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WP Engine Logo" title="WP Engine Logo" class="testing-lazyload" />
      </div>
    </div>

    <iframe src="https://www.w3schools.com" name="w3schools" class="testing-lazyload"></iframe>
  </div>
</div>`;

html = nativeLazyLoading(html);

console.log(html);
```

### Add `loading="lazy"` attribute on all images and iFrames except that contains `no-lazy` or `header-images` class

```javascript
const nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
<div class="white logos">
  <div class="container">
    <div class="testimonials">
      <div class="item">
        <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WP Engine Logo" title="WP Engine Logo" class="testing-lazyload" />
      </div>
    </div>

    <iframe src="https://www.w3schools.com" name="w3schools" class="testing-lazyload"></iframe>
  </div>
</div>`;

html = nativeLazyLoading(html, {
  auto: ['no-lazy', 'header-images']
});

console.log(html);
```

**NOTE:** `auto` means the same as not including the attribute.

### Add `loading="lazy"` attribute on only images and iFrames which contains `testing-lazyload` class

```javascript
const nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
<div class="white logos">
  <div class="container">
    <div class="testimonials">
      <div class="item">
        <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WP Engine Logo" title="WP Engine Logo" class="testing-lazyload" />
      </div>
    </div>

    <iframe src="https://www.w3schools.com" name="w3schools" class="testing-lazyload"></iframe>
  </div>
</div>`;

html = nativeLazyLoading(html, {
  lazy: ['testing-lazyload'],
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
        <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WP Engine Logo" title="WP Engine Logo" class="testing-lazyload" />
      </div>
    </div>

    <iframe src="https://www.w3schools.com" name="w3schools" class="testing-lazyload"></iframe>
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
        <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WP Engine Logo" title="WP Engine Logo" class="testing-lazyload" />
      </div>
    </div>

    <iframe src="https://www.w3schools.com" name="w3schools" class="testing-lazyload"></iframe>
  </div>
</div>`;

html = nativeLazyLoading(html, {}, true, {
  class: 'lazy'
});

console.log(html);
```

### Add `loading="lazy"` attribute on all images and iFrames with custom class except on `no-lazy` class

```javascript
const nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
<div class="white logos">
  <div class="container">
    <div class="testimonials">
      <div class="item">
        <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WP Engine Logo" title="WP Engine Logo" class="testing-lazyload" />
      </div>
    </div>

    <iframe src="https://www.w3schools.com" name="w3schools" class="testing-lazyload"></iframe>
  </div>
</div>`;

html = nativeLazyLoading(html, {}, true, {
  class: 'lazy',
  notAllowed: ['no-lazy']
});

console.log(html);
```

**NOTE:** Make sure to add the [script](#loading-attribute-with-lazysizes) as mentioned in the description before closing the `</body>` tag if you are willing to use `lazysizes` for unsupported versions/browsers.

## Examples without `loading` attribute

### Disable Native Load and use `lazysizes` library

```javascript
const nativeLazyLoading = require('native-lazy-loading');
var html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
<div class="white logos">
  <div class="container">
    <div class="testimonials">
      <div class="item">
        <img src="/wordpress-logo.svg" style="margin-top: -9px;" alt="WordPress Logo" title="WordPress Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/drupal-logo.svg" style="margin-top: -9px;" alt="Drupal Logo" title="Drupal Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentful-logo.svg" style="margin-top: -9px;" alt="Contentful Logo" title="Contentful Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WP Engine Logo" title="WP Engine Logo" class="testing-lazyload" />
      </div>
    </div>

    <iframe src="https://www.w3schools.com" name="w3schools" class="testing-lazyload"></iframe>
  </div>
</div>`;

html = nativeLazyLoading(
  html, {
    defaultValue: ''
  },
  true
);

console.log(html);
```

**NOTE:** Make sure to add the [script](#use-lazysizes-without-loading-attribute) as mentioned in the description before closing the `</body>` tag.

## Return

HTML with adding `loading` attribute on image and iFrame tags. Also, change `src` with `data-src` if `compatibility` set to `true` and apply the `lazysizes` class for unsupported browsers, if you like to apply a separate class then you can define it in `library` object.

## Tested

This package is tested with the `Node.js` and `React` Application.

[npm-image]: https://img.shields.io/npm/v/native-lazy-loading.svg
[npm-url]: https://www.npmjs.com/package/native-lazy-loading
[downloads-image]: https://img.shields.io/npm/dt/native-lazy-loading.svg

[travis-image]: https://app.travis-ci.com/samiahmedsiddiqui/native-lazy-loading.svg?branch=main
[travis-url]: https://app.travis-ci.com/github/samiahmedsiddiqui/native-lazy-loading

[appveyor-url]: https://ci.appveyor.com/project/samiahmedsiddiqui/native-lazy-loading
[appveyor-image]: https://img.shields.io/appveyor/ci/samiahmedsiddiqui/native-lazy-loading.svg?label=appveyor

[issues-image]: https://img.shields.io/github/issues/samiahmedsiddiqui/native-lazy-loading
[issues-url]: https://github.com/samiahmedsiddiqui/native-lazy-loading/issues

[license-image]: https://img.shields.io/github/license/samiahmedsiddiqui/native-lazy-loading
[license-url]: https://github.com/samiahmedsiddiqui/native-lazy-loading/blob/main/LICENSE
