import { h, render, Component } from 'preact';
import "babel-polyfill"
class A extends Component {
    componentWillMount() {
        this.state = {
            text: 'init',
        }
        this.handleClick = () => {
            this.setState({
                text: 321 * Math.random(),
            });
        }
    }

    

    render() {
        const {text} = this.state;
        return (
            <div>
                <p>this is a A</p>
                <button onClick={this.handleClick}>click me</button>
                <B input={text}></B>
            </div>
        )
    }

}
class B extends Component {
    

    render() {
        const { input } = this.props;
        return (
            <div>
                <p>this is a B {input}</p>
            </div>
        )
    }

}



const a = (<div id="hei">
    <A input={'customcc'}></A>
    <div>a</div>
    <div>b</div>
</div>)

render(a, document.querySelector('#root'));

console.log(a);
