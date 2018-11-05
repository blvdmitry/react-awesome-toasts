import * as React from 'react';
import { ContextConsumer } from './ToastProvider';
import * as T from './ToastContext.types';

class ToastConsumer extends React.PureComponent<T.ToastConsumerProps> {
  render() {
    return (
      <ContextConsumer>
        { (context: T.ToastContext) => this.props.children(context) }
      </ContextConsumer>
    );
  }
}

export default ToastConsumer;
