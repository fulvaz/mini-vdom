export enum VNodeType {
    TEXT = 0,
    ELEMENT = 1,
    CLASS = 2,
    STATELESS = 3,
}

export interface IVNode {
    // well, we need to isolate the props between components.
    context: any;
    type: VNodeType;
    tag: string;
    props: any;
    instance: any;
    klass: any;
}

export class VNode implements IVNode {
    klass: any;
    context: any;
    instance: any;
    constructor(public type: VNodeType,
        public tag: string,
        public props: any,
       ) {
    }
}