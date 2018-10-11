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
}

export const BrowserRender = new BrowserRenderClass();
