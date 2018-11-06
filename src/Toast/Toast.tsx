import React from 'react';
import * as T from './Toast.types';
import s from './Toast.css';

class Toast extends React.PureComponent<T.Props> {
  actionRef = React.createRef<HTMLButtonElement>();
  previousFocus: HTMLElement | null;

  handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onActionClick } = this.props;

    if (onActionClick) onActionClick(e);
  };

  handleActionBlur = () => {
    this.restoreFocus();
  };

  restoreFocus = () => {
    if (document.activeElement !== this.actionRef.current) return;

    if (this.previousFocus && this.previousFocus.focus) {
      this.previousFocus.focus();
    }

    this.previousFocus = null;
  };

  componentDidMount() {
    const elButton = this.actionRef.current;

    if (!elButton) return;

    if (document.activeElement instanceof HTMLElement) {
      this.previousFocus = document.activeElement;
    }

    elButton.focus();
  }

  componentWillUnmount() {
    this.restoreFocus();
  }

  render() {
    const { text, attributes, actionText, ariaLabel } = this.props;

    return (
      <div {...attributes} className={s['root']}>
        <span className={s['alert']} role="alert" aria-label={ariaLabel || text} />
        <span className={s['text']}>{ text }</span>
        {
          actionText && (
            <button
              onClick={this.handleActionClick}
              onBlur={this.handleActionBlur}
              className={s['action']}
              ref={this.actionRef}
            >
              { actionText }
            </button>
          )
        }
      </div>
    );
  }
}

export default Toast;
