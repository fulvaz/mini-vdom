import { VNode } from "lib/vnode";

export interface IComponnet {
    render(): VNode;
    setState();
    props: any;

    // TODO: lifecycle hooks
}

export class Component implements IComponnet {
    props: any;
    render(): VNode {
        throw new Error("Method not implemented.");
    }    
    
    setState() {
        throw new Error("Method not implemented.");
    }


}