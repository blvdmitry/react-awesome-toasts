import * as React from 'react';
import classnames from 'classnames';
import Toast from '../Toast';
import * as T from './ToastContext.types';
import './ToastContainer.css';

const raf = requestAnimationFrame;
const nextFrame = (fn: FrameRequestCallback) => {
  raf(() => raf(fn));
};

class ToastContainer extends React.PureComponent<T.ToastContainerProps, T.ToastContainerState> {
  static timeout = 2760;

  static defaultProps = {
    component: Toast,
  };

  timer: NodeJS.Timer;

  state: T.ToastContainerState = {
    status: 'entering',
  };

  startTimer = () => {
    this.timer = setTimeout(this.hide, ToastContainer.timeout);
  };

  stopTimer = () => {
    if (!this.timer) return;

    clearTimeout(this.timer);
  };

  hide = () => {
    this.stopTimer();
    this.props.onHide();
    this.setState({ status: 'exiting' }, () => {
      nextFrame(() => this.setState({ status: 'exited' }));
    });
  };

  handleTransitionEnd = () => {
    this.props.onRemove();
  };

  componentDidMount() {
    nextFrame(() => this.setState({ status: 'entered' }));
    this.startTimer();
  }

  render() {
    const { toastProps, component: Component } = this.props;
    const { status } = this.state;
    const rootClassName = classnames(
      'toast-container',
      status === 'entering' && 'toast-container--entering',
      status === 'entered' && 'toast-container--entered',
      status === 'exiting' && 'toast-container--exiting',
      status === 'exited' && 'toast-container--exited',
    );
    const attributes: React.HTMLProps<HTMLDivElement> = {};

    if (status === 'entered') {
      attributes.onMouseEnter = this.stopTimer;
      attributes.onMouseLeave = this.startTimer;
    }

    if (status === 'exited') {
      attributes.onTransitionEnd = this.handleTransitionEnd;
    }

    return (
      <div {...attributes} className={rootClassName}>
        <Component {...toastProps} />
      </div>
    );
  }
}

export default ToastContainer;
