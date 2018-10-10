import { VNode } from "lib/vnode";

export interface IComponent {
    render(): VNode;
    setState();
    props: any;

    // TODO: lifecycle hooks
}

export class Component implements IComponent {
    props: any;
    render(): VNode {
        throw new Error("Method not implemented.");
    }
    
    // TODO: setState!
    setState() {
        // TODO diff here! do the reconciliation
        // fiber, pause in reconciliation
        throw new Error("Method not implemented.");
    }


}