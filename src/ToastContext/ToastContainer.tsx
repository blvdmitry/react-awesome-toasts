import React from 'react';
import Toast from '../Toast';
import classnames from '../utilities/classnames';
import * as T from './ToastContext.types';
import s from './ToastContainer.css';

const raf = requestAnimationFrame;
const nextFrame = (fn: FrameRequestCallback) => {
  raf(() => raf(fn));
};

class ToastContainer extends React.PureComponent<T.ToastContainerProps, T.ToastContainerState> {
  static defaultProps = {
    component: Toast,
  };

  timer: number;

  state: T.ToastContainerState = {
    status: 'entering',
  };

  startTimer = () => {
    this.timer = window.setTimeout(this.hide, this.props.timeout);
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
    const { toastProps, component: Component, position } = this.props;
    const { status } = this.state;
    const rootClassName = classnames(
      s['toast-container'],
      status === 'entering' && s['toast-container--entering'],
      status === 'entered' && s['toast-container--entered'],
      status === 'exiting' && s['toast-container--exiting'],
      status === 'exited' && s['toast-container--exited'],
      position && s[`toast-container--${position}`],
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
