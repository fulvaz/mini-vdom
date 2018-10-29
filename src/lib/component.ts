import { VNode } from "lib/vnode";

export interface IComponent {
    render(): VNode;
    setState();
    props: any;

    // TODO: lifecycle hooks
}

export abstract class Component implements IComponent {
    props: any;

    constructor(props) {
        this.props = props;
    }

    abstract render(): VNode
    
    // TODO: setState!
    setState() {
        // TODO diff here! do the reconciliation
        // fiber, pause in reconciliation

        // 1. call render and get a new node
        const vnodeNew = this.render();
        


        // 2. compare and transform
        // Two elements of different types will produce different trees.
        // The developer can hint at which child elements may be stable across different renders with a key prop.

        // 3. keys help react to identify if a node is new


        throw new Error("Method not implemented.");
    }


}