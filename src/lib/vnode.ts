// TODO use VNode to represent DOM Nodes
// TODO consider props update
export enum VNodeType {
    TEXT = 0,
    ELEMENT = 1,
    CLASS = 2,
    STATELESS = 3,
}

export interface IVnode {
    // well, we need to isolate the props between components.
    context: any;
    type: VNodeType;
    tag: string;
    props: any;

}

export class VNode {
    context
    constructor(public type: VNodeType,
        public tag: string,
        public props: any,
       ) {
    }
}