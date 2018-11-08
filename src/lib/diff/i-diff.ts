import { VNode } from '../vnode';

export interface IDiff {
    diff(renderer, vnodeNew: VNode, vnodeOld: VNode);
}