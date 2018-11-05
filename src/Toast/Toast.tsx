import React from 'react';
import * as T from './Toast.types';
import './Toast.css';

class Toast extends React.PureComponent<T.Props> {
  handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onActionClick } = this.props;

    if (onActionClick) onActionClick(e);
  };

  render() {
    const { text, attributes, actionText } = this.props;

    return (
      <div {...attributes} className="toast">
        <span className="toast__text">{ text }</span>
        { actionText && <button onClick={this.handleActionClick} className="toast__action">{ actionText }</button> }
      </div>
    );
  }
}

export default Toast;
