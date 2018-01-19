class Mavigator {
    constructor(selector = 'html', options) {
        // TODO: If the given selector is an object, we assume the user simply passed the options instead of throwing an error.
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
            markTreeDepth: 0,
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

        if (! nodes || ! nodes.length) {
            if (this.options.warn) {
                console.warn(`No link to mark was found for the given URI [${this.options.uri}]`);
            }
            return;
        }

        for (let i = 0; i < nodes.length; i++) {
            let realNode = this.options.classToParent ? nodes[i].parentNode : nodes[i];

            this.addClassTo(realNode);
        }
    }

    getNodesToMark() {
        let nodes = [];
        let sets = this.sets();

        if (! sets.length) return;

        for (let i = 0; i < sets.length; i++) {
            nodes = nodes.concat(this.getMarkableNodesFrom(sets[i]));
        }

        return nodes;
    }

    sets() {
        this.validateSelector();

        return document.querySelectorAll(this.selector);
    }

    validateSelector() {
        if (! this.selector.length) {
            throw new TypeError('The provided selector is empty.');
        }

        if (typeof this.selector === 'object') {
            throw new TypeError('A selector must be a string.');
        }
    }

    getMarkableNodesFrom(set) {
        const possibleMatches = this.generatePossibleMatches();
        const links = this.getLinksFrom(set);
        
        return links.filter(link => possibleMatches.includes(link.pathname));
    }

    generatePossibleMatches() {
        let uri = this.options.uri;
        uri = uri.charAt(0) === '/' ? uri : `/${uri}`;
        const possibilities = [uri];

        // If the URI ends with a '/', remove it and add it as a possibility.
        if (uri.charAt(uri.length - 1) === '/') {
            possibilities.push(uri.slice(0, uri.length - 1));
        }

        return ! this.options.markTreeDepth ? possibilities : this.extendPossibilites(possibilities);
    }

    extendPossibilites(possibilities) {
        const uri = this.options.uri.charAt(0) === '/' ? this.options.uri.slice(1) : this.options.uri;
        const segments = uri.split('/');
        this.options.markTreeDepth = this.clamp(this.options.markTreeDepth, -1, segments.length - 1);
        let depth = [];


        if (this.options.markTreeDepth === -1) {
            for (let i = 0; i < segments.length; i++) {
                let lastDepth = i - 1 in depth ? depth[i - 1] : '';
                depth.push(`${lastDepth}/${segments[i]}`);
            }
        }
        
        for (let i = 1; i <= this.options.markTreeDepth; i++) {
            depth.push(`/${segments.slice(0, segments.length - i).join('/')}`);
        }

        return possibilities.concat(depth);
    }

    clamp(number, min, max) {
        return Math.min(Math.max(number, min), max);
    }

    getLinksFrom(set) {
        return [].slice.call(set.querySelectorAll('a'));
    }

    addClassTo(node) {
        if (node.classList) {
            node.classList.add(this.options.className);
        } else {
            node.className += ' ' + this.options.className;
        }
    }
}

export default Mavigator;