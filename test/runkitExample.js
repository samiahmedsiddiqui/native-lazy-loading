const nativeLazyLoading = require('native-lazy-loading');
const html = `<img src="https://www.yasglobal.com/wp-content/themes/yasglobal/images-cus/logo.svg" alt="YAS Global Logo" title="YAS Global Logo" />
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

console.log('Before applying Native Lazy Loading: ', html);
console.log('After applying Native Lazy Loading: ', nativeLazyLoading(html));
