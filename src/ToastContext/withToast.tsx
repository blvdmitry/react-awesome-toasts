import * as React from 'react';
import ToastConsumer from './ToastConsumer';
import * as T from './ToastContext.types';

const withToast: T.WithToast = (Component) => (props) => (
  <ToastConsumer>
    { (context: T.ToastContext) => <Component toast={context} {...props} /> }
  </ToastConsumer>
);

export default withToast;
