import { VNode } from "lib/vnode";



// TODO use VNode to represent DOM Nodes
// children 内可能有textNode
export function h(type: string, props: any, ...children){
    console.log(type);
    props = props || {};
    props.children = children || [];
    return new VNode(type, props);
}

export function render(node: VNode | string, container) {
    if (typeof node === 'string') {
        const textNode = document.createTextNode(node);
        container.appendChild(textNode);
        return textNode;
    }
    const children = node.props.children || [];
    const parentElement = document.createElement(node.type);
    // TODO: 设置参数
    children.forEach(e => {
        const c = render(e, parentElement);
        parentElement.appendChild(c);
    });
    container.appendChild(parentElement);
    return parentElement;
}


export function createElement(type: string, props: any, ...children) {
    children = children || [];
    h(type, props, ...children);
}

export function updateElement(parent, newNode, oldNode, index = 0) {
    // diff here
    // if (!oldNode) {
    //     // TODO: parent插入 newNode
    // } else (!newNode) {
    //     // TODO: 删除节点
    // }

}

// append
// remove
// replace