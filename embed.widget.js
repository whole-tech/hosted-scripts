/**
 * Copyright (C) Tahi - All Rights Reserved
 *
 * @since 1.0
 * @author Tahi
 * @copyright Copyright (c) tahi.tech
 */

 if (typeof loadembed !== 'function') {

    function loadembed() {

        'use strict';

        /************************************************************
         * Private data
         ************************************************************/

        // default settings
        var options = {
            id: 0,
            container: "c0",
            width: "100%",
            height: 0,
            autoResize: !0,
            addToOffsetTop: 0,
            theme: 1,
            customJS: 1,
            record: 1,
            listener: 0,
            embed: "",
            frameUrl: "",
            defaultValues: !1 // JSON Object
        };

        /************************************************************
         * Private methods
         ************************************************************/

        /**
         *
         *
         * URI Parsing with Javascript
         * @returns {string}
         */
        function getChildDomain() {
            // See: https://gist.github.com/jlong/2428561
            var parser = document.createElement('a');
            parser.href = options.frameUrl;
            return window.location.protocol + "//" + parser.hostname + (parser.port ? ':' + parser.port: '');
        }

        /**
         * Resize the embed iFrame
         *
         * @param height
         */
        function resizeIframe(height) {
            if(options.autoResize) {
                // Get iframe element
                var i = document.getElementById(options.container+"i"+options.id);
                i.style.height= height + "px";
            }
        }

        /**
         * Redirect to URL
         *
         * @param url
         */
        function redirect(url) {
            window.location.href = url ? url : '/';
        }

        /**
         * Returns the url of the iframe containing the embed.
         *
         * @returns {string}
         */
        function getFrameUrl() {
            var url = document.URL, title = document.title, refer = document.referrer;
            var prefix = ( options.embed.indexOf('?') >= 0 ? '&' : '?' );
            var src = options.embed + prefix + queryParams({
                    id: options.id,
                    t: options.theme ,
                    js: options.customJS,
                    rec: options.record,
                    l: options.listener
                });
            options.record && (src += "&title=" + encodeURIComponent(title));
            options.record && (src += "&url=" + encodeURIComponent(url));
            options.record && (src += "&referrer=" + encodeURIComponent(refer));
            options.defaultValues && (src += "&defaultValues=" + encodeURIComponent(JSON.stringify(options.defaultValues)));
            options.frameUrl = src;
            return src;
        }

        /**
         * iFrame Markup Generator
         *
         * @returns {Element}
         */
        function generateFrameMarkup() {
            var i = document.createElement("iframe");
            i.id = i.name = options.container + "i" + options.id;
            i.src = getFrameUrl();
            i.scrolling = "no";
            i.frameBorder = "0";
            i.allowTransparency = "true";
            i.style.width = options.width;
            if (!options.autoResize) { i.style.height = options.height; }
            if (typeof scrollToTop.bind !== 'undefined') { i.onload = i.onreadystatechange = scrollToTop.bind(i); }
            return i;
        }

        /**
         * Create a serialized representation of an array or a plain object
         * for use in a URL query string or Ajax request
         *
         * @param source
         * @returns {string}
         */
        function queryParams(source) {
            var array = [];

            for(var key in source) {
                array.push(encodeURIComponent(key) + "=" + encodeURIComponent(source[key]));
            }

            return array.join("&");
        }

        /**
         * Finds 'y' value of give object
         * @param obj
         * @returns {*[]}
         */
        function findPosition(obj) {
            var curtop = 0;
            if (obj.offsetParent) {
                do {
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
                curtop = curtop + options.addToOffsetTop;
                return [curtop];
            }
        }

        /**
         * Scroll to the top of the page or top of the embed container
         */
        function scrollToTop (elem){
            if (elem === 'page') {
                window.scrollTo(0, 1);
            } else if (elem === 'container') {
                window.scroll(0, findPosition(document.getElementById(options.container)));
            }
        }

        /**
         * Cross-browser function to add embed iframe event handler
         * to rezise its height
         */
        function addIframeListener() {
            // See: http://davidwalsh.name/window-iframe
            // Create IE + others compatible event handler
            var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
            var childDomain = getChildDomain();
            // Listen to message from child window
            eventer(messageEvent,function(e) {
                if (!e.origin) {
                    e.origin = e.protocol + "//" + e.hostname + (e.port ? ':' + e.port: '');
                }
                if (e.origin === childDomain) {
                    var data = (typeof e.data === 'string' || e.data instanceof String) ? JSON.parse(e.data) : e.data;
                    if (typeof data.embedID !== "undefined" && data.embedID == options.id) {
                        if( typeof data.height !== "undefined" ){
                            resizeIframe(data.height);
                        } else if( typeof data.scrollToTop !== "undefined" ){
                            scrollToTop(data.scrollToTop);
                        } else if( typeof data.url !== "undefined" ){
                            redirect(data.url);
                        }
                    } else {
                        parent.postMessage(data, "*"); // send hash email to parent page
                    }
                }
            }, false);
        }

        /************************************************************
         * Public data and methods
         ************************************************************/

        this.initialize = function ( opts ) {
            // Overwrite default options
            for ( var opt in opts ) {
                if (opt in options) options[opt] = opts[opt];
            }
            return this;
        };

        // Display embed
        this.display = function () {
            var c = document.getElementById(options.container),
                i = generateFrameMarkup();
            c.innerHTML = '';
            c.appendChild(i);
            addIframeListener();
            return this;
        };
    }
}

if (typeof EmbedWidget !== 'object') {
    EmbedWidget = new loadembed();
}
