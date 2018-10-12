import { VNode, VNodeType, IVNode } from "lib/vnode";
import { BrowserRender } from "lib/browser";
import { isClass } from "./utils";

// Done: children will needs to treat as expression like Array, function
// Done: support stateless component
// generate an VNode that describe the DOM Tree
// children will transform by this function too
// node: base types, class, function, object, array, VNode
// capitalized word pass to node will be resolved as variable
export function h(node: string | Function, props: any = {}, ...children): IVNode {
    props = props || {};
    if (children && children.length !== 0) {
        props.children = children.map(c => {
            if (c instanceof VNode) {
                return c;
            }
            switch (typeof c) {
                case 'function': {
                    return new VNode(VNodeType.TEXT, node.toString(), {});
                }
                case 'object':
                case 'number':
                case 'boolean':
                case 'string': 
                case 'symbol': {
                    return new VNode(VNodeType.TEXT, node.toString(), {});
                }
                case 'undefined':
                default: {
                    return new VNode(VNodeType.TEXT, '', {});
                }
            }
        });
    }

    switch (typeof node) {
        case 'function': {
            if (isClass(node)) {
                const vnode = new VNode(VNodeType.CLASS, (node as any).name, props);
                vnode.klass = node;
                return vnode;
            } else {
                return new VNode(VNodeType.ELEMENT, (node as any).name, props);
            }
        }
        case 'string': {
            return new VNode(VNodeType.ELEMENT, (node as string), props);
        }
        default: {
            return new VNode(VNodeType.TEXT, '', {});
        }
    }
}


// TODO: handle xss issues see https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
// render VNodes to platform specific content
export function render(node: IVNode, container) {
    switch (node.type) {
        case VNodeType.TEXT: {
            const p = BrowserRender.createTextNode(node.tag);
            BrowserRender.appendChild(p, container);
            return p;
        }
        case VNodeType.ELEMENT: {
            const p = BrowserRender.createElement(node.tag);
            BrowserRender.appendChild(p, container);
            renderChildren(node, p);
            BrowserRender.appendProps(p, node.props);
            return p;
        }
        case VNodeType.CLASS: {
            node.instance = new node.klass(node.props);
            node.context = node.instance;
            // FIXME: may invalid after uglify
            const p = BrowserRender.createElement(node.tag);
            BrowserRender.appendChild(p, container);
            const innerVNode = node.instance.render();
            return render(innerVNode, p);
        }
        default: {
            const p = BrowserRender.createTextNode('debug: ops, your node is not belong to any type');
            BrowserRender.appendChild(p, container);
            return p;
        }
    }
    
}

function renderChildren(node: IVNode, container: HTMLElement) {
    const children = node.props.children || [];
    children.forEach(e => {
        render(e, container);
        // container.appendChild(c);
    });
    return container;
}


// append
// remove
// replace