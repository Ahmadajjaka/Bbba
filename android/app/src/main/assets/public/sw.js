/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "eae847370ac247c33c89657cc82c0f77"
  }, {
    "url": "pwa-512x512.png",
    "revision": "6057594be16fe904493a493a0477cd7e"
  }, {
    "url": "pwa-192x192.png",
    "revision": "784157f49dcb14c9e1975bb9fce320bf"
  }, {
    "url": "index.html",
    "revision": "2709c3c04c04b986a93df493727fc771"
  }, {
    "url": "icon.svg",
    "revision": "19212c5e0efec2c8aa981a5dd70168e5"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f933c7c84a6044d68a3cd3fc5d2705a1"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/purify.es-Dzkdzyfv.js",
    "revision": null
  }, {
    "url": "assets/index.es-DncEKQPr.js",
    "revision": null
  }, {
    "url": "assets/index-DnnL0ZoC.js",
    "revision": null
  }, {
    "url": "assets/index-DFKKUE2e.css",
    "revision": null
  }, {
    "url": "assets/html2canvas-DF9LhU7r.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f933c7c84a6044d68a3cd3fc5d2705a1"
  }, {
    "url": "icon.svg",
    "revision": "19212c5e0efec2c8aa981a5dd70168e5"
  }, {
    "url": "pwa-192x192.png",
    "revision": "784157f49dcb14c9e1975bb9fce320bf"
  }, {
    "url": "pwa-512x512.png",
    "revision": "6057594be16fe904493a493a0477cd7e"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "eae847370ac247c33c89657cc82c0f77"
  }, {
    "url": "manifest.webmanifest",
    "revision": "46d76a05be25ba529a51741e27a322c2"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/index.html"), {
    denylist: [/^\/api\//, /^\/health$/, /^\/\.well-known\//]
  }));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 20,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
