'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const nativeLazyLoading = require('../index');

const testHTML = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" class="no-lazy"/>
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
        <img src="/contentstack-logo.svg" style="margin-top: -9px;" alt="ContentStack Logo" title="ContentStack Logo" />
      </div>
      <div class="item">
        <img src="/netlify-logo.svg" style="margin-top: -9px;" alt="Netlify Logo" title="Netlify Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/heroku-logo.svg" style="margin-top: -9px;" alt="Heroku Logo" title="Heroku Logo" class="testing-lazyload" />
      </div>
      <div class="item">
        <img src="/pantheon-logo.svg" style="margin-top: -9px;" alt="Pantheon Logo" title="Pantheon Logo" />
      </div>
      <div class="item">
        <img src="/wpengine-logo.svg" style="margin-top: -9px;" alt="WP Engine Logo" title="WP Engine Logo" class="testing-lazyload" />
      </div>
    </div>

    <iframe src="https://www.w3schools.com" name="w3schools" class="testing-lazyload"></iframe>
  </div>
</div>`;

describe('Test `loading="eager"` attribute', () => {
  it('Add loading="eager" attribute on all images and iFrames', () => {
    const expectedOutput = fs.readFileSync(
      path.resolve(__dirname, 'expected-output/eager-all.html'),
      'utf8',
      (err, data) => {
        if (err) {
          console.error(err)
          return;
        }

        return data;
      }
    );

    assert.strictEqual(nativeLazyLoading(testHTML, {
      defaultValue: 'eager'
    }), expectedOutput);
  });

  it('Add loading="eager" attribute on all images and iFrames except that contains no-lazy or header-images class', () => {
    const expectedOutput = fs.readFileSync(
      path.resolve(__dirname, 'expected-output/eager-exception.html'),
      'utf8',
      (err, data) => {
        if (err) {
          console.error(err)
          return;
        }

        return data;
      }
    );

    assert.strictEqual(nativeLazyLoading(testHTML, {
      auto: ['no-lazy', 'header-images'],
      defaultValue: 'eager'
    }), expectedOutput);
  });

  it('Add loading="eager" attribute on only images and iFrames that contains testing-lazyload class', () => {
    const expectedOutput = fs.readFileSync(
      path.resolve(__dirname, 'expected-output/particular-eager.html'),
      'utf8',
      (err, data) => {
        if (err) {
          console.error(err)
          return;
        }

        return data;
      }
    );

    assert.strictEqual(nativeLazyLoading(testHTML, {
      eager: ['testing-lazyload'],
      defaultValue: ''
    }), expectedOutput);
  });
});
