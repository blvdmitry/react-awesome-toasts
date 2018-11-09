import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider, withToast } from '../dist';
import './css/styles.css';

class TestButton extends React.Component {
  render() {
    const { show, hide } = this.props.toast;
    const toastProps = {
      text: 'Message sent',
      actionText: 'Undo',
      ariaLabel: 'Message sent, click to undo',
      onActionClick: hide,
    };

    return (
      <button className="button" onClick={() => show(toastProps)}>
        Show toast
      </button>
    );
  }
}

const code = () => `
  import { withToast } from 'react-awesome-toasts';

  const ToastButton = ({ toast }) => {
    const toastProps = {
        text: 'Message sent',
        actionText: 'Undo',
        ariaLabel: 'Message sent, click to undo',
        onActionClick: toast.hide,
    };

    return <Button ${'onClick={() => toast.show(toastProps)}'}>Add toast to queue</Button>;
  }

  export default withToast(ToastButton);
`;

const ToastButton = withToast(TestButton);

class App extends React.PureComponent {
  render() {
    return (
      <ToastProvider>
        <div className="section">
          <div className="section__header">
            <div className="wrapper">
              <div className="section__header-inner">
                <a href="https://github.com/BananaBobby/react-awesome-toasts" target="_blank" className="logo">
                  React Awesome Toasts
                </a>

                <a className="github" href="https://github.com/BananaBobby/react-awesome-toasts" target="_blank">
                  <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="section__footer">
            <div className="wrapper">
              Built by <a href="https://bananabobby.github.io" target="_blank">Dmitry Belyaev</a>
            </div>
          </div>

          <div className="wrapper">
            <div className="hero">
              <h1>Keep your users updated.</h1>

              <div className="hero__button">
                <ToastButton />
              </div>

              <div className="hero__code">
                <pre>
                  <code className="language-jsx">
                    { code() }
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className="section section--features">
          <div className="wrapper">
            <div className="features">
              <div className="feature">
                <div className="feature__icon">🎨</div>
                <div className="feature__title">Easily customisable</div>
                <div className="feature__text">You can change notification positions, timeout or even use your own component with custom logic and UI.</div>
              </div>

              <div className="feature">
                <div className="feature__icon">🤹‍</div>
                <div className="feature__title">Toasts queue managed</div>
                <div className="feature__text">It's not the best idea to overwhelm your users with notifications, so component takes care of that for you and shows them one by one, no matter how many of them have been sent.</div>
              </div>

              <div className="feature">
                <div className="feature__icon">🎙</div>
                <div className="feature__title">Screen reader accessibility</div>
                <div className="feature__text">About 18% of internet users have some type of visual impairments. Make sure they get your app updates as well!</div>
              </div>
            </div>

            <div className="features">
              <div className="feature">
                <div className="feature__icon">📘</div>
                <div className="feature__title">Typescript support</div>
                <div className="feature__text">Provides type definitions out-of-the-box.</div>
              </div>

              <div className="feature">
                <div className="feature__icon">📦</div>
                <div className="feature__title">React is the only dependency</div>
                <div className="feature__text">No need to worry about potential dependency conflicts.</div>
              </div>

              <div className="feature">
                <div className="feature__icon">🎉</div>
                <div className="feature__title">Less than 5kb gzipped</div>
              </div>
            </div>
          </div>
        </div>
      </ToastProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));