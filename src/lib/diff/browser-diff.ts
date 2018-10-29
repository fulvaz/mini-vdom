import { IDiff } from 'lib/diff/i-diff';
import { attr2Map, getEvtBinding, isServer, ifEventProp } from 'lib/utils';
import { VNode, VNodeType } from 'lib/vnode';
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
        const propsOld = { ...attr2Map(dom.attributes), ...getEvtBinding(dom) };
        const propsNew = Object.entries(vnodeNew.props)
            .filter(([k, v]) => {
                return k !== 'children';
            })
            .reduce((p, [k, v]) => {
                return {
                    ...p,
                    [k]: v,
                }
            }, {});
            
        this.diffProps(propsOld, propsNew, dom);

        // children comparing
        const vnodesNew = vnodeNew.props.children;
        const childrenOld = [...(dom.childNodes as any)];
        vnodesNew.forEach((vnodeNew, idx) => {
            // TODO: key
            const childDomOld = childrenOld[idx];
            // 4. !childDomOld add new node
            if (!childDomOld) {
                const domNew = RendererFactory.getRenderer().renderVNode(vnodeNew);
                dom.appendChild(domNew);
                return;
            }
            // 1. both text, update text
            // textContent: use on text node
            // innerText: use on element
            if (childDomOld.nodeType === Node.TEXT_NODE && vnodeNew.type === VNodeType.TEXT && childDomOld.textContent !== vnodeNew.tag) {
                childDomOld.textContent = vnodeNew.tag;
                return
            }
            // 2. both element, call this.diff
            if (childDomOld.nodeType === Node.ELEMENT_NODE && vnodeNew.type === VNodeType.ELEMENT) {
                this.diff(childDomOld, vnodeNew);
                return
            }
            // 3. different type, remove and replace with new
            if ((childDomOld.nodeType === Node.TEXT_NODE && vnodeNew.type !== VNodeType.TEXT) ||
                (childDomOld.nodeType === Node.ELEMENT_NODE && vnodeNew.type !== VNodeType.ELEMENT)
            ) {
                const domNew = RendererFactory.getRenderer().renderVNode(vnodeNew);
                dom.replaceChild(domNew, childDomOld);
                return
            }
            
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
