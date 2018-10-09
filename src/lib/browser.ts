export interface IRenderer {
    createTextNode(text: string);
    createElement(type: string);
}

class BrowserRenderClass implements IRenderer{
    public createTextNode(text: string) {
        return document.createTextNode(text)
    }    
    public createElement(type: string) {
        return document.createElement(type);
    }
}

export const BrowserRender = new BrowserRenderClass();
