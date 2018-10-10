import { VNode, VNodeType, IVNode } from "lib/vnode";
import { BrowserRender } from "lib/browser";
import { isClass } from "./utils";

// Done: children will needs to treat as expression like Array, function
// Done: support stateless component
// generate an VNode that describe the DOM Tree
// children will transform by this function too
// node: base types, class, function, object, array, VNode
export function h(node: any, props: any = {}, ...children): IVNode {
    if (!node) {
        return new VNode(VNodeType.TEXT, '', {});
    }

    if (node instanceof VNode) {
        return node;
    }

    if (children.length !== 0) {
        props.children = children.map(c => {
            return h(c, props);
        });
    }

    switch (typeof node) {
        case 'function': {
            if (isClass(node)) {
                return new VNode(VNodeType.CLASS, node, props);
            } else {
                // for sake, why would someone just pass a function
                return new VNode(VNodeType.TEXT, node.toString(), {});
            }
        }
        case 'object':
        case 'string':
        case 'number':
        case 'boolean':
        case 'symbol': {
            return new VNode(VNodeType.TEXT, node.toString(), {});
        }
        case 'undefined':
        default: {
            return new VNode(VNodeType.TEXT, '', {});
        }
    }
}


// TODO: handle xss issues see https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
// TODO: support stateless component ps: stateless component will accept only one arg called props, just pass context's props to it
// TODO: add attributes
// TODO: handle events
// render VNodes to platform specific content
export function render(node: IVNode, container) {
    switch (node.type) {
        case VNodeType.TEXT: {
            const p = BrowserRender.createTextNode(node.tag);
            return p;
        }
        case VNodeType.ELEMENT: {
            const p = BrowserRender.createElement(node.tag);
            return renderChildren(node, p);
        }
        case VNodeType.CLASS: {
            // TODO: instantiate the class with props here, invoke render function, and create a context for the node, pass the context to vnode
            // well, use 'this' of this component as context will be much better
            node.instance = new node.tag(node.props);
            node.context = node.instance;
            // FIXME: may invalid after uglify
            const p = BrowserRender.createElement(node.tag.name);
            const innerVNode = node.instance.render();
            return render(innerVNode, p);
        }
        default: {
            return BrowserRender.createTextNode('debug: ops, your node is not belong to any type');
        }
    }
    
}

function renderChildren(node: IVNode, container: HTMLElement) {
    const children = node.props.children || [];
    children.forEach(e => {
        const c = render(e, node);
        container.appendChild(c);
    });
    return container;
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