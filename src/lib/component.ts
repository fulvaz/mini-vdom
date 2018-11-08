import { IVNode, VNode } from 'lib/vnode';
import { DiffFactory } from 'lib/diff/diff-factory';

export interface IComponent {
    render(): VNode;
    setState(state: any);
    props: any;
    vnode: IVNode;
    rendered: any;
    state: any;
    forceUpdate(cb?);
    shouldComponentUpdate(nextProps, nextState, nextContext);

    // TODO: lifecycle hooks
}

export abstract class Component implements IComponent {
    
    private _props: any;
    public get props(): any {
        return this._props;
    }
    public set props(value: any) {
        this.state = {
            ...this.state,
            ...Component.getDerivedStateFromProps(this._props, this.prevState),
        };
        this.prevProps = this._props;
        this._props = value;
    }
    private _vnode: IVNode;
    public get vnode(): IVNode {
        return this._vnode;
    }
    public set vnode(value: IVNode) {
        this.prevVnode = this._vnode;
        this._vnode = value;
    }
    prevVnode: IVNode;
    rendered: any;
    state: any = {};

    // ha, prevProps is not that 'prev'
    private prevProps: any;
    private prevState: any;
    

    constructor(props) {
        this.props = props;
    }

    abstract render(): VNode;
    
    // TODO: setState!
    setState(state) {
        this.prevState = {
            ...this.state,
        };

        this.state = {
            ...this.state,
            ...state,
        }

        this.renderComponent();
        
        // 1. call render and get a new node
        // TODO diff here! do the reconciliation
        // fiber, pause in reconciliation
        // 2. compare and transform
        // Two elements of different types will produce different trees.
        // The developer can hint at which child elements may be stable across different renders with a key prop.

        // 3. keys help react to identify if a node is new
    }

    forceUpdate(cb?) {
        this.renderComponent(true);
    }

    private renderComponent(ifForceRerender = false) {
        if (!this.shouldComponentUpdate(this.prevProps, this.prevState, {}) && !ifForceRerender) {
            return;
        }
        
        const snapshot = this.getSnapshotBeforeUpdate(this.prevProps, this.prevState, {});

        this.vnode = this.render();
        this.rendered = DiffFactory.getDiff().diff(this.rendered, this.vnode, this.prevVnode);

        this.componentDidUpdate(this.prevProps, this.prevState, snapshot);
    }

    shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any) {
        return true;
    }

    getSnapshotBeforeUpdate(nextProps, nextState, nextContext) {
        return null;
    }

    public static getDerivedStateFromProps<T>(prevProps, prevState): T {
        let a: T;
        return a;
    }

    public componentDidUpdate(prevProps, prevState, snapshot) {

    }

    public componentWillUnmount() {

    }


}