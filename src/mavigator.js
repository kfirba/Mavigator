class Mavigator {
    constructor(selector = 'html', options) {
        this.selector = selector;
        this.options = this.mergeOptions(Mavigator.defaults(), options);
    }

    static mark(selector, options) {
        (new Mavigator(selector, options)).init();
    }

    static defaults() {
        return {
            className: 'active',
            classToParent: false,
            uri: window.location.pathname,
            warn: false
        };
    }

    mergeOptions(source, override) {
        for (var key in override) {
            if (source.hasOwnProperty(key)) {
                source[key] = override[key];
            }
        }

        return source;
    }

    init() {
        let nodes = this.getNodesToMark();

        if ( ! nodes || ! nodes.length) {
            if (this.options.warn) {
                console.warn(`No link to mark was found for the given URI [${this.options.uri}]`);
            }
            return;
        }

        nodes.forEach(node => {
            let realNode = this.options.classToParent ? node.parentNode : node;

            this.addClassTo(realNode);
        });
    }

    getNodesToMark() {
        let nodes = [];
        let sets = this.sets();

        if ( ! sets.length) return;

        sets.forEach(set =>
            nodes = nodes.concat(this.getMarkableNodesFrom(set))
        );

        return nodes;
    }

    sets() {
        this.validateSelector();

        return document.querySelectorAll(this.selector);
    }

    validateSelector() {
        if ( ! this.selector.length) {
            throw new TypeError('The provided selector is empty.');
        }

        if (typeof this.selector === 'object') {
            throw new TypeError('A selector must be a string.');
        }
    }

    getMarkableNodesFrom(set) {
        let selector = 'a';
        let links = set.querySelectorAll(selector);
        links = [].slice.call(links);

        return links.filter(link => link.pathname === this.options.uri);
    }

    addClassTo(node) {
        if (node.classList) {
            node.classList.add(this.options.className);
        } else {
            node.className += ' ' + className;
        }
    }
}

export default Mavigator;