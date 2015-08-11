"use strict";

var appName = document
  .getElementsByName('application-name')[0]
  .getAttribute('content');

if (appName == "Humani.se Mail") {
  var javascripts = ['jquery-2.1.4.min.js','gmail.js','main.js'];
  var stylesheets = ['styles.css'];

  for(let path of javascripts) {
    let element = document.createElement('script');
    element.src = chrome.extension.getURL(`javascripts/${path}`);
    (document.head || document.documentElement).appendChild(element);
  }

  for(let path of stylesheets) {
    let element = document.createElement('link');
    element.rel = "stylesheet";
    element.media = "all";
    element.href = chrome.extension.getURL(`stylesheets/${path}`);
    (document.head || document.documentElement).appendChild(element);
  }
}
