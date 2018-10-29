import { IVNode } from 'lib/vnode';

export interface IRenderer {
    createTextNode(text: string);
    createElement(type: string);
    appendChild(child: any, parent: any);
    render(node: IVNode, container: any);
    renderVNode(node: IVNode);
}