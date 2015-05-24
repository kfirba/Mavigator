+function (window, undefined) {
    var Mavigator = function (selector, options) {
        this.elementSet = Mavigator.getElementSet(selector);
        this.options = Mavigator.mergeOptions(Mavigator.DEFAULTS, options);
        this.uri = window.location.pathname;

        this.init();
    };

    Mavigator.DEFAULTS = {
        className: 'active',
        classToParent: false,
        warnIfLinkWasntFound: false
    };

    Mavigator.getElementSet = function (selector) {
        if (selector === undefined) {
            console.error("Please specify a selector.");
            throw "Error";
        }

        if (typeof selector === 'object') {
            console.error("Please specify a selector.");
            throw "Error";
        }

        var elementSet = document.querySelectorAll(selector);

        if (elementSet.length === 0) {
            console.error("Couldn't find the requested element.");
            throw "Error";
        }

        return Mavigator.NodeListToArray(elementSet)
    };

    Mavigator.mergeOptions = function (source, override) {
        for (var key in override) {
            if (source.hasOwnProperty(key)) {
                source[key] = override[key];
            }
        }

        return source;
    };

    Mavigator.isDOMNode = function (nodes) {
        var stringRepr = Object.prototype.toString.call(nodes);

        return typeof nodes === 'object' &&
            /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
            nodes.hasOwnProperty('length') &&
            (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
    }

    Mavigator.NodeListToArray = function (list) {
        return [].slice.call(list);
    }

    Mavigator.prototype.init = function () {
        var nodes = this.getNodesToAlter();

        if (nodes.length === 0) {
            if(this.options.warnIfLinkWasntFound) {
                console.warn("No link to mark was found.");
            }
            return;
        }

        nodes.forEach(this.markNode.bind(this));
    };

    Mavigator.prototype.getNodesToAlter = function () {
        var nodes = [];

        for (var i = 0; set = this.elementSet[i]; i++) {
            nodes = nodes.concat(this.scanForNodes(set));
        }

        return nodes;
    };

    Mavigator.prototype.markNode = function (node) {
        var node = this.options.classToParent ? node.parentNode : node;

       this.addClassTo(node);
    };

    Mavigator.prototype.scanForNodes = function(set) {
        var selector = 'a';
        var links = set.querySelectorAll(selector);
        links = Mavigator.NodeListToArray(links);

        links = links.filter(function(link) {
            return link.pathname === this.uri;
        }.bind(this));

        return links;
    }

    Mavigator.prototype.addClassTo = function (node) {
        if (node.classList) {
            node.classList.add(this.options.className);
        } else {
            node.className += ' ' + className;
        }
    };

    window.Mavigator = Mavigator;
}(window, undefined);
