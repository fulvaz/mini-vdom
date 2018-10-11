import { shouldAddEventListener } from "./utils";

export interface IRenderer {
    createTextNode(text: string);
    createElement(type: string);
}

class BrowserRenderClass implements IRenderer{
    public createTextNode(text: string) {
        return document.createTextNode(text)
    }
    public createElement(type: string) {
        const ele = document.createElement(type);
        ele.style.display = 'block';
        return ele;
    }

    public appendProps(e: HTMLElement, props: any) {
        Object.keys(props).forEach(k => {
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

    private addListener(e: HTMLElement, event: string, cb) {
        e.addEventListener(event, cb);
    }

    
}

export const BrowserRender = new BrowserRenderClass();
