import { VNode, VNodeType, IVnode } from "lib/vnode";
import { BrowserRender } from "lib/browser";

// TODO: children will needs to treat as expression like Array, function
// TODO: support stateless component
// transform any types of node to a VNode
//
export function h(node: any, props: any, ...children): IVnode {
    console.log(node);

    if (!node) {
        return new VNode(VNodeType.TEXT, '', {});
    }

    switch (typeof node) {
        case 'function': {
            // only class will come into this function
            return new VNode(VNodeType.CLASS, )
        }
        case 'object': {
            if (node instanceof VNode) {
                
                parentElement = document.createElement(node.type);
            } else if (Array.isArray(node)) {
                
            }
            break;
        }
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


    props = props || {};
    // TODO: pass props to children
    props.children = children || [];
    return new VNode(node, props);
}


// TODO: handle xss issues see https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
// TODO: support stateless component ps: stateless component will accept only one arg called props, just pass context's props to it

// will transform vnodes to platform specific content
// render funcion can only handle node.tag which has no cascade
export function render(node: IVnode | any, container) {
    switch(node.type) {
        case VNodeType.TEXT: {
            const p = BrowserRender.createTextNode(node.tag);
            return p;
        }
        case VNodeType.ELEMENT: {
            const p = BrowserRender.createElement(node.tag);
            return p
        }
        case VNodeType.CLASS: {
            // TODO: instantiate the class with props here, invoke render function, and create a context for the node, pass the context to vnode
            const p = BrowserRender.createTextNode(node.tag);
            return p;
        }
        default: {

        }
    }



    let parentElement;
    const children = node.props.children || [];


    

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