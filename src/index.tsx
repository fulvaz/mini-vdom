import { h, render } from './lib/index';
import "babel-polyfill"
import { Component } from 'lib/component';
class A extends Component {

    constructor(props) {
        super(props);
        this.state = {
            s: 'init',
        }
    }

    render() {
        const { input } = this.props;
        const { s } = this.state;
        return (
            <div>
                <p>this is a A {input}</p>
                <p>this is state {s}</p>
                <button onClick={this.handleClick}>click me</button>
            </div>
        )
    }

    handleClick = () => {
        console.log('click');
        this.setState({
            s: 'updated',
        });
    }
}



const a = (<div id="hei">
    <A input={'customcc'}></A>
    <one>a</one>
    <two>b</two>
</div>)

render(a, document.querySelector('#root'));

console.log(a);
