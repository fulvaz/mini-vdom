import { IRenderer } from 'lib/renderer/i-renderer';
import { isServer } from 'lib/utils';
import { BrowserRender } from 'lib/renderer/browser-renderer';

class RendererFactoryClass {
    instance: IRenderer;

    getRenderer() {
        if (this.instance) {
            return this.instance;
        }

        if (!isServer()) {
            this.instance = new BrowserRender();
            return this.instance;
        } else {
            throw new Error('renderer not implmented!');
        }
    }
}

export const RendererFactory = new RendererFactoryClass();