import {h, render} from './lib/index';
import "babel-polyfill"
import { Component } from 'lib/component';
class A extends Component{

    render() {
        const {input} = this.props;
        return (
            <p>this is a A {input}</p>
        )
    }
}



const a = (<div id="hei">
    <A input={'customcc'}></A>
    <one>a</one>
    <two>b</two>
</div>)

render(a, document.querySelector('#root'));

console.log(a);
