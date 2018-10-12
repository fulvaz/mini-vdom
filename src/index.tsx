import {h, render} from './lib/index';

class A {
    render() {
        return (
            <p>this is a A</p>
        )
    }
}



const a = (<div id="hei">
    <A></A>
    <one>a</one>
    <two>b</two>
</div>)

render(a, document.querySelector('#root'));

console.log(a);
