import {
  __publicField
} from "./chunk-JVWSFFO4.js";

// node_modules/@alloc/fontfaceobserver-es/dist/fontfaceobserver.mjs
function addListener(element, event, listener) {
  element.addEventListener(event, listener);
}
function append(parent, child) {
  parent.appendChild(child);
}
function createElement(tagName) {
  return document.createElement(tagName);
}
function createText(text) {
  return document.createTextNode(text);
}
function remove(element) {
  element.parentNode && element.parentNode.removeChild(element);
}
function style(element, style2) {
  element.style.cssText = style2;
}
function waitForBody(callback) {
  return callback();
}
var Ruler = class {
  constructor(text) {
    var style2 = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
    this.element = createElement("div");
    this.element.setAttribute("aria-hidden", "true");
    append(this.element, createText(text));
    this.collapsible = createElement("span");
    this.expandable = createElement("span");
    this.collapsibleInner = createElement("span");
    this.expandableInner = createElement("span");
    this.lastOffsetWidth = -1;
    style(this.collapsible, style2);
    style(this.expandable, style2);
    style(this.expandableInner, style2);
    style(
      this.collapsibleInner,
      "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;"
    );
    append(this.collapsible, this.collapsibleInner);
    append(this.expandable, this.expandableInner);
    append(this.element, this.collapsible);
    append(this.element, this.expandable);
  }
  /**
   * @return {Element}
   */
  getElement() {
    return this.element;
  }
  /**
   * @param {string} font
   */
  setFont(font) {
    style(
      this.element,
      "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:" + font + ";"
    );
  }
  /**
   * @return {number}
   */
  getWidth() {
    return this.element.offsetWidth;
  }
  /**
   * @param {string} width
   */
  setWidth(width) {
    this.element.style.width = width + "px";
  }
  /**
   * @private
   *
   * @return {boolean}
   */
  reset() {
    var offsetWidth = this.getWidth(), width = offsetWidth + 100;
    this.expandableInner.style.width = width + "px";
    this.expandable.scrollLeft = width;
    this.collapsible.scrollLeft = this.collapsible.scrollWidth + 100;
    if (this.lastOffsetWidth !== offsetWidth) {
      this.lastOffsetWidth = offsetWidth;
      return true;
    } else {
      return false;
    }
  }
  /**
   * @private
   * @param {function(number)} callback
   */
  onScroll(callback) {
    if (this.reset() && this.element.parentNode !== null) {
      callback(this.lastOffsetWidth);
    }
  }
  /**
   * @param {function(number)} callback
   */
  onResize(callback) {
    var that = this;
    function onScroll() {
      that.onScroll(callback);
    }
    addListener(this.collapsible, "scroll", onScroll);
    addListener(this.expandable, "scroll", onScroll);
    this.reset();
  }
};
var _a;
var FontFaceObserver = (_a = class {
  constructor(family, descriptors = {}, context = window) {
    this["family"] = family;
    this["style"] = descriptors.style || "normal";
    this["weight"] = descriptors.weight || "normal";
    this["stretch"] = descriptors.stretch || "normal";
    this["context"] = context;
  }
  /**
   * @private
   *
   * @param {string} family
   * @return {string}
   */
  getStyle(family) {
    return [
      this["style"],
      this["weight"],
      _a.supportStretch() ? this["stretch"] : "",
      "100px",
      family
    ].join(" ");
  }
  /**
   * Returns the current time in milliseconds
   *
   * @return {number}
   */
  getTime() {
    return (/* @__PURE__ */ new Date()).getTime();
  }
  /**
   * @param {string=} text Optional test string to use for detecting if a font is available.
   * @param {number=} timeout Optional timeout for giving up on font load detection and rejecting the promise (defaults to 3 seconds).
   * @return {Promise.<fontface.FontFaceObserver.}
   */
  load(text, timeout) {
    var that = this;
    var testString = text || "BESbswy";
    var timeoutId = 0;
    var timeoutValue = timeout || _a.DEFAULT_TIMEOUT;
    var start = that.getTime();
    return new Promise(function(resolve, reject) {
      if (_a.supportsNativeFontLoading(that["context"]) && !_a.hasSafari10Bug(that["context"])) {
        var loader = new Promise(function(resolve2, reject2) {
          var check = function() {
            var now = that.getTime();
            if (now - start >= timeoutValue) {
              reject2(new Error("" + timeoutValue + "ms timeout exceeded"));
            } else {
              that["context"].document.fonts.load(that.getStyle('"' + that["family"] + '"'), testString).then(function(fonts) {
                if (fonts.length >= 1) {
                  resolve2();
                } else {
                  setTimeout(check, 25);
                }
              }, reject2);
            }
          };
          check();
        });
        var timer = new Promise(function(resolve2, reject2) {
          timeoutId = setTimeout(function() {
            reject2(new Error("" + timeoutValue + "ms timeout exceeded"));
          }, timeoutValue);
        });
        Promise.race([timer, loader]).then(function() {
          clearTimeout(timeoutId);
          resolve(that);
        }, reject);
      } else {
        waitForBody(function() {
          var rulerA = new Ruler(testString);
          var rulerB = new Ruler(testString);
          var rulerC = new Ruler(testString);
          var widthA = -1;
          var widthB = -1;
          var widthC = -1;
          var fallbackWidthA = -1;
          var fallbackWidthB = -1;
          var fallbackWidthC = -1;
          var container = createElement("div");
          function removeContainer() {
            if (container.parentNode !== null) {
              remove(container.parentNode, container);
            }
          }
          function check() {
            if (widthA != -1 && widthB != -1 || widthA != -1 && widthC != -1 || widthB != -1 && widthC != -1) {
              if (widthA == widthB || widthA == widthC || widthB == widthC) {
                if (_a.hasWebKitFallbackBug()) {
                  if (widthA == fallbackWidthA && widthB == fallbackWidthA && widthC == fallbackWidthA || widthA == fallbackWidthB && widthB == fallbackWidthB && widthC == fallbackWidthB || widthA == fallbackWidthC && widthB == fallbackWidthC && widthC == fallbackWidthC) {
                    return;
                  }
                }
                removeContainer();
                clearTimeout(timeoutId);
                resolve(that);
              }
            }
          }
          container.dir = "ltr";
          rulerA.setFont(that.getStyle("sans-serif"));
          rulerB.setFont(that.getStyle("serif"));
          rulerC.setFont(that.getStyle("monospace"));
          append(container, rulerA.getElement());
          append(container, rulerB.getElement());
          append(container, rulerC.getElement());
          append(that["context"].document.body, container);
          fallbackWidthA = rulerA.getWidth();
          fallbackWidthB = rulerB.getWidth();
          fallbackWidthC = rulerC.getWidth();
          function checkForTimeout() {
            var now = that.getTime();
            if (now - start >= timeoutValue) {
              removeContainer();
              reject(new Error("" + timeoutValue + "ms timeout exceeded"));
            } else {
              var hidden = that["context"].document["hidden"];
              if (hidden === true || hidden === void 0) {
                widthA = rulerA.getWidth();
                widthB = rulerB.getWidth();
                widthC = rulerC.getWidth();
                check();
              }
              timeoutId = setTimeout(checkForTimeout, 50);
            }
          }
          checkForTimeout();
          rulerA.onResize(function(width) {
            widthA = width;
            check();
          });
          rulerA.setFont(that.getStyle('"' + that["family"] + '",sans-serif'));
          rulerB.onResize(function(width) {
            widthB = width;
            check();
          });
          rulerB.setFont(that.getStyle('"' + that["family"] + '",serif'));
          rulerC.onResize(function(width) {
            widthC = width;
            check();
          });
          rulerC.setFont(that.getStyle('"' + that["family"] + '",monospace'));
        });
      }
    });
  }
}, /**
 * @type {null|boolean}
 */
__publicField(_a, "HAS_WEBKIT_FALLBACK_BUG", null), /**
 * @type {null|boolean}
 */
__publicField(_a, "HAS_SAFARI_10_BUG", null), /**
 * @type {null|boolean}
 */
__publicField(_a, "SUPPORTS_STRETCH", null), /**
 * @type {null|boolean}
 */
__publicField(_a, "SUPPORTS_NATIVE_FONT_LOADING", null), /**
 * @type {number}
 */
__publicField(_a, "DEFAULT_TIMEOUT", 3e3), /**
 * @return {string}
 */
__publicField(_a, "getUserAgent", function() {
  return window.navigator.userAgent;
}), /**
 * @return {string}
 */
__publicField(_a, "getNavigatorVendor", function() {
  return window.navigator.vendor;
}), /**
 * Returns true if this browser is WebKit and it has the fallback bug
 * which is present in WebKit 536.11 and earlier.
 *
 * @return {boolean}
 */
__publicField(_a, "hasWebKitFallbackBug", function() {
  if (_a.HAS_WEBKIT_FALLBACK_BUG === null) {
    var match = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(
      _a.getUserAgent()
    );
    _a.HAS_WEBKIT_FALLBACK_BUG = !!match && (parseInt(match[1], 10) < 536 || parseInt(match[1], 10) === 536 && parseInt(match[2], 10) <= 11);
  }
  return _a.HAS_WEBKIT_FALLBACK_BUG;
}), /**
 * Returns true if the browser has the Safari 10 bugs. The
 * native font load API in Safari 10 has two bugs that cause
 * the document.fonts.load and FontFace.prototype.load methods
 * to return promises that don't reliably get settled.
 *
 * The bugs are described in more detail here:
 *  - https://bugs.webkit.org/show_bug.cgi?id=165037
 *  - https://bugs.webkit.org/show_bug.cgi?id=164902
 *
 * If the browser is made by Apple, and has native font
 * loading support, it is potentially affected. But the API
 * was fixed around AppleWebKit version 603, so any newer
 * versions that that does not contain the bug.
 *
 * @return {boolean}
 */
__publicField(_a, "hasSafari10Bug", function(context) {
  if (_a.HAS_SAFARI_10_BUG === null) {
    if (_a.supportsNativeFontLoading(context) && /Apple/.test(_a.getNavigatorVendor())) {
      var match = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(
        _a.getUserAgent()
      );
      _a.HAS_SAFARI_10_BUG = !!match && parseInt(match[1], 10) < 603;
    } else {
      _a.HAS_SAFARI_10_BUG = false;
    }
  }
  return _a.HAS_SAFARI_10_BUG;
}), /**
 * Returns true if the browser supports the native font loading
 * API.
 *
 * @return {boolean}
 */
__publicField(_a, "supportsNativeFontLoading", function(context) {
  if (_a.SUPPORTS_NATIVE_FONT_LOADING === null) {
    _a.SUPPORTS_NATIVE_FONT_LOADING = !!context.document["fonts"];
  }
  return _a.SUPPORTS_NATIVE_FONT_LOADING;
}), /**
 * Returns true if the browser supports font-style in the font
 * short-hand syntax.
 *
 * @return {boolean}
 */
__publicField(_a, "supportStretch", function() {
  if (_a.SUPPORTS_STRETCH === null) {
    var div = createElement("div");
    try {
      div.style.font = "condensed 100px sans-serif";
    } catch (e) {
    }
    _a.SUPPORTS_STRETCH = div.style.font !== "";
  }
  return _a.SUPPORTS_STRETCH;
}), _a);
export {
  FontFaceObserver
};
//# sourceMappingURL=@alloc_fontfaceobserver-es.js.map
