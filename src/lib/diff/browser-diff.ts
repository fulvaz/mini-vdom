import { IDiff } from 'lib/diff/i-diff';
import { isServer } from 'lib/utils';
import { VNode } from 'lib/vnode';


export class BrowserDiff implements IDiff {


    diff(rendered, vnode: VNode) {

    }
}
