import { VNode, VNodeType, IVNode } from "lib/vnode";
import { isClass } from "./utils";
import { RendererFactory } from 'lib/renderer/renderer-factory';

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
                    return new VNode(VNodeType.TEXT, c.toString(), {});
                }
                case 'object':
                case 'number':
                case 'boolean':
                case 'string': 
                case 'symbol': {
                    return new VNode(VNodeType.TEXT, c.toString(), {});
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
                vnode.instance = new vnode.klass(vnode.props);
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


export function render(node: IVNode, container) {
    return RendererFactory.getRenderer().render(node, container);
}