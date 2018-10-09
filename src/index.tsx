import {h, render} from './lib/index';

const a = (<div id="hei">
    <one>a</one>
    <two>b</two>
</div>)

render(a, document.querySelector('#root'));

console.log(a);
