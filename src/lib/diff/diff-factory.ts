import { IDiff } from 'lib/diff/i-diff';
import { isServer } from 'lib/utils';
import { BrowserDiff } from 'lib/diff/browser-diff';

class DiffFactoryClass {
    instance: IDiff;

    getDiff() {
        if (this.instance) {
            return this.instance;
        }

        if (!isServer()) {
            this.instance = new BrowserDiff();
            return this.instance;
        } else {
            throw new Error('renderer not implmented!');
        }
    }
}


export const DiffFactory = new DiffFactoryClass();