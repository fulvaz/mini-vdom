export function isClass(node) {
    return node && node.prototype.render;
}

export function shouldAddEventListener(property) {
    return /^on.*$/.test(property);
}
