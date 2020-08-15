import React, { Component } from 'react';
import Hammer from 'hammerjs';
import SimpleCard from './SimpleCard';
import { translate3d } from './utils';

class DraggableCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      initialPosition: { x: 0, y: 0 },
      startPosition: { x: 0, y: 0 },
      animation: null,
      pristine: true,
      className: this.props.className || ''
    };
    this.resetPosition = this.resetPosition.bind(this);
    this.handlePan = this.handlePan.bind(this);
    this.myRef = React.createRef();
  }
  resetPosition () {
    const { x, y } = this.props.containerSize;
    const card = this.myRef.current.myRef.current;

    const initialPosition = {
      x: Math.round((x - card.offsetWidth) / 2),
      y: Math.round((y - card.offsetHeight) / 2)
    };

    this.setState({
      x: initialPosition.x,
      y: initialPosition.y,
      initialPosition: initialPosition,
      startPosition: { x: 0, y: 0 }
    });
  }

  panstart () {
    const { x, y } = this.state;
    this.setState({
      animation: false,
      startPosition: { x, y },
      pristine: false
    });
  }
  panend () {
    const screen = this.props.containerSize;
    const card = this.myRef.current.myRef.current;

    const getDirection = () => {
      switch (true) {
        case (this.state.x < -50): return 'Left';
        case (this.state.x + (card.offsetWidth - 50) > screen.x): return 'Right';
        default: return false;
      }
    };
    const direction = getDirection();

    if (this.props[`onSwipe${direction}`]) {
      this.props[`onSwipe${direction}`]();
      this.props[`onOutScreen${direction}`](this.props.index);
    } else {
      this.resetPosition();
      this.setState({ animation: true });
    }

  }
  panmove (ev) {
    this.setState(this.calculatePosition( ev.deltaX, ev.deltaY ));
  }
  pancancel (ev) {
  }

  handlePan (ev) {
    ev.preventDefault();
    this[ev.type](ev);
    return false;
  }

  handleSwipe (ev) {
  }

  calculatePosition (deltaX, deltaY) {
    const { initialPosition : { x, y } } = this.state;
    return {
      x: (x + deltaX),
      y: (y + deltaY)
    };
  }
  componentDidMount () {
    this.hammer = new Hammer.Manager(this.myRef.current.myRef.current);
    this.hammer.add(new Hammer.Pan({ threshold: 2 }));

    this.hammer.on('panstart panend pancancel panmove', this.handlePan);
    this.hammer.on('swipestart swipeend swipecancel swipemove', this.handleSwipe);

    this.resetPosition();
    window.addEventListener('resize', this.resetPosition);
  }
  componentWillUnmount () {
    if (this.hammer) {
      this.hammer.stop();
      this.hammer.destroy();
      this.hammer = null;
    }
    window.removeEventListener('resize', this.resetPosition);
  }
  render () {
    const { x, y, animation, pristine, className } = this.state;
    const style = translate3d(x, y);
    return (
      <SimpleCard
        {...this.props}
        style={style}
        className={[className, animation ? 'animate' : pristine ? 'inactive' : ''].join(' ')}
        ref={this.myRef}
      />);
  }
}

export default DraggableCard;
