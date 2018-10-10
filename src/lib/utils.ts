export function isClass(node) {
    return node && node.prototype.render;
}