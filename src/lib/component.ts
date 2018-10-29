import { IVNode, VNode } from 'lib/vnode';
import { DiffFactory } from 'lib/diff/diff-factory';

export interface IComponent {
    render(): VNode;
    setState();
    props: any;
    vnode: IVNode;
    rendered: any;

    // TODO: lifecycle hooks
}

export abstract class Component implements IComponent {
    props: any;
    vnode: IVNode;
    rendered: any;

    constructor(props) {
        this.props = props;
    }

    abstract render(): VNode
    
    // TODO: setState!
    setState() {
        // TODO diff here! do the reconciliation
        // fiber, pause in reconciliation

        // 1. call render and get a new node
        this.vnode = this.render();
        this.rendered = DiffFactory.getDiff().diff(this.rendered, this.vnode);

        // 2. compare and transform
        // Two elements of different types will produce different trees.
        // The developer can hint at which child elements may be stable across different renders with a key prop.

        // 3. keys help react to identify if a node is new



    }


}