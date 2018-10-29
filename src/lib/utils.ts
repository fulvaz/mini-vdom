export function isClass(node) {
    return node && node.prototype.render;
}

export function shouldAddEventListener(property) {
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