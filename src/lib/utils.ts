export function isClass(node) {
    return node && node.prototype.render;
}

export function ifEventProp(property) {
    return /^on.*$/.test(property);
}

// just hack here
export function isServer() {
    try {
        return process.env.server === 'server';
    } catch(e) {
        return false;
    }
}

export function getEvtBinding(elm: HTMLElement) {
    return Object.keys(HTMLElement.prototype)
        .filter(key => elm[key] && key.startsWith('on'))
        .reduce((p, n) => {
            return {
                ...p,
                [n]: elm[n],
            }
        }, {});
}

export function attr2Map(attr: NamedNodeMap) {
    return [...(attr as any)].map(e => {
        return {
            [e.nodeName]: e.nodeValue,
        }
    }).reduce((p, n) => {
        return {
            ...p,
            ...n,
        }
    }, {});
}