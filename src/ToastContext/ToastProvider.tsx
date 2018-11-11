import React from 'react';
import id from '../utilities/id';
import ToastContainer from './ToastContainer';
import * as T from './ToastContext.types';

const { Consumer, Provider } = React.createContext({});

export class ToastProvider extends React.PureComponent<T.ToastProviderProps, T.ToastProviderState> {
  static queue: T.ToastProviderState['toasts'] = [];
  static defaultProps = {
    timeout: 4500,
    position: 'bottom-left',
  };

  ref = React.createRef<ToastContainer>();

  state: T.ToastProviderState = {
    toasts: [],
  };

  addToastFromQueue = () => {
    const { toasts } = this.state;

    if (!ToastProvider.queue.length) return;

    const toast = ToastProvider.queue.shift() as T.ToastProviderQueueItem;

    this.setState({ toasts: [...toasts, toast] });
  };

  show = (toast: object) => {
    const { toasts } = this.state;

    ToastProvider.queue.push({ props: toast, id: id() });
    if (!toasts.length) this.addToastFromQueue();
  };

  hide = () => {
    const instance = this.ref.current;

    if (!instance) return;

    instance.hide();
  };

  handleHide = () => {
    this.addToastFromQueue();
  };

  handleToastRemove = () => {
    const { toasts } = this.state;

    this.setState({ toasts: toasts.slice(1) });
  };

  render() {
    const { children, component, timeout, position } = this.props;
    const { toasts } = this.state;

    return (
      <Provider value={{ show: this.show, hide: this.hide }}>
        { children }

        {
          toasts.map((toast, index) => (
            <ToastContainer
              toastProps={toast.props}
              ref={index === toasts.length - 1 ? this.ref : undefined}
              key={toast.id}
              onHide={this.handleHide}
              onRemove={this.handleToastRemove}
              component={component}
              timeout={timeout}
              position={position}
            />
          ))
        }
      </Provider>
    );
  }
}

export const ContextConsumer = Consumer;
export default ToastProvider;
