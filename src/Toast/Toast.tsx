import React from 'react';
import * as T from './Toast.types';
import s from './Toast.css';

class Toast extends React.PureComponent<T.Props> {
  handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onActionClick } = this.props;

    if (onActionClick) onActionClick(e);
  };

  render() {
    const { text, attributes, actionText } = this.props;

    return (
      <div {...attributes} className={s['root']}>
        <span className={s['text']}>{ text }</span>
        { actionText && <button onClick={this.handleActionClick} className={s['action']}>{ actionText }</button> }
      </div>
    );
  }
}

export default Toast;
