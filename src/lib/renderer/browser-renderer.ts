import { shouldAddEventListener } from '../utils';
import { IRenderer } from 'lib/renderer/i-renderer';
import { IVNode, VNodeType } from 'lib/vnode';
import { RendererFactory } from 'lib/renderer/renderer-factory';
import { render } from 'lib/index';


export class BrowserRender implements IRenderer {
    public createTextNode(text: string) {
        return document.createTextNode(text);
    }

    public createElement(type: string) {
        const ele = document.createElement(type);
        return ele;
    }

    public appendProps(e: HTMLElement, props: any) {
        const blackList = ['children'];
        Object.keys(props).filter(e => !blackList.includes(e)).forEach(k => {
            if (shouldAddEventListener(k)) {
                e.addEventListener(k.substring(2).toLowerCase(), props[k]);
            } else {
                if (k === 'className') {
                    e.setAttribute('class', props[k]);
                } else if (k === 'style') {
                    const val = Object.keys(props[k]).map(styleKey => {
                        return `${styleKey}: ${props[styleKey]};`;
                    }).join('');
                    e.setAttribute(k, val);
                }
                e.setAttribute(k, props[k]);
            }
        });
        return e;
    }

    public appendChild(child: any, parent: HTMLElement) {
        parent.appendChild(child);
    }

    // TODO: handle xss issues see https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
    // render VNodes to platform specific content
    render(node: IVNode, container) {
        switch (node.type) {
            case VNodeType.TEXT: {
                const p = this.createTextNode(node.tag);
                this.appendChild(p, container);
                return p;
            }
            case VNodeType.ELEMENT: {
                const p = this.createElement(node.tag);
                this.appendChild(p, container);
                this.renderChildren(node, p);
                this.appendProps(p, node.props);
                // TODO: split a function to append DOM
                return p;
            }
            case VNodeType.CLASS: {
                // FIXME: may invalid after uglify
                const innerVNode = node.instance.render();
                return render(innerVNode, container);
            }
            default: {
                const p = this.createTextNode('debug: ops, your node is not belong to any type');
                this.appendChild(p, container);
                return p;
            }
        }
    }

    private renderChildren(node: IVNode, container: HTMLElement) {
        const children = node.props.children || [];
        children.forEach(e => {
            render(e, container);
            // container.appendChild(c);
        });
        return container;
    }
}
