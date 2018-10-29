import { IDiff } from 'lib/diff/i-diff';
import { attr2Map, getEvtBinding, isServer, ifEventProp } from 'lib/utils';
import { VNode } from 'lib/vnode';
import { RendererFactory } from 'lib/renderer/renderer-factory';


export class BrowserDiff implements IDiff {

    /**
     * edit dom base on vnode
     * rule1: if VNode type !== dom tyoe, children will be destroyed and replace with newly renderer node;
     * rule2:
     * */
    diff(dom: HTMLElement, vnodeNew: VNode) {
        // impl rule1
        if (dom.nodeName.toLowerCase() !== vnodeNew.tag) {
            const domNew = RendererFactory.getRenderer().renderVNode(vnodeNew);
            dom.parentElement.replaceChild(domNew, dom);
            return;
        }

        // prop comparing & event comparing
        const propsOld = {...attr2Map(dom.attributes), ...getEvtBinding(dom)};
        const propsNew = Object.entries(vnodeNew.props)
            .filter(([k, v]) => {
                return k !== 'children';
            })
            .map(([k, v]) => {
                return v;
            });
        this.diffProps(propsOld, propsNew, dom);

        // children comparing
        const vnodesNew = vnodeNew.props.children;
        const childrenOld = [...(dom.children as any)];
        vnodesNew.forEach((vnodeNew, idx) => {
            this.diff(childrenOld[idx], vnodeNew);
        });

    }

    // O(n) challenging
    private diffProps(propsOld, propsNew, dom: HTMLElement) {
        const propsOldMap = new Map<any>(Object.entries(propsOld));
        const propsNewMap = new Map<any>(Object.entries(propsNew));
        const keySet = new Set([...Object.keys(propsOld), ...Object.keys(propsNew)]);
        for (let key of keySet) {
            if (propsOldMap.has(key) && propsNewMap.has(key) && propsOldMap.has(key) !== propsNewMap.has(key)) {
                // 1. key in both new and old, update
                if (ifEventProp(key)) {
                    dom[key] = propsNewMap.get(key);
                } else {
                    dom.setAttribute(key, propsNewMap.get(key));
                }
            } else if (propsOldMap.has(key) && !propsNewMap.has(key)) {
                // 2. key exist only in old, remove
                if (ifEventProp(key)) {
                    dom[key] = null;
                } else {
                    dom.removeAttribute(key);
                }
            } else if (!propsOldMap.has(key) && propsNewMap.has(key)) {
                // 3. key exist only in new, add
                if (ifEventProp(key)) {
                    dom[key] = propsNewMap.get(key);
                } else {
                    dom.setAttribute(key, propsNewMap.get(key));
                }
            }
        }
    }
}
