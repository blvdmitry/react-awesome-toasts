# React Awesome Toasts

Easily customizable React notification system that manages its queue for you. 

- Screen reader accessibility
- Responsive
- Typescript support 
- React is the only dependency
- 5kb gzipped 

### Get started

Install the package:

```
yarn add react-awesome-toasts
// or
npm install react-awesome-toasts 
```

Wrap your app with `ToastProvider`:

```
import { ToastProvider } from 'react-awesome-toasts';

const App = () => {
    return (
        <ToastProvider>
            App content
        </ToastProvider>
    )
} 
```

Add toast methods to your component with one of the following methods:

*With High Order Component:*
 
```
import { withToast } from 'react-awesome-toasts';

const ToastButton = ({ toast }) => {
    const toastProps = {
        text: 'Message sent',
        actionText: 'Undo',
        ariaLabel: 'Message sent, click to undo',
        onActionClick: toast.hide,
    };
    
    return <Button onClick={() => toast.show(toastProps)}>Show toast</Button>;
}

export default withToast(ToastButton);
```

*With ToastConsumer:*


```
import { ToastConsumer } from 'react-awesome-toasts';

const toastProps = {
    text: 'Message sent',
    actionText: 'Undo',
    ariaLabel: 'Message sent, click to undo',
};

<ToastConsumer>
    {
        ({ show, hide }) => (
            <Button onClick={() => show({ ...toastProps, onActionClick: hide )}>
                Show toast
            </Button>    
        )
    }
</ToastConsumer>    
```

### Provided methods

`hide()` - hides currently active toast.

`show(props)` - shows a toast and passes all props to the presentational component 

### Presentational Toast component

By default `ToastProvider` uses `Toast` component provided by the library.
`Toast` component is responsible for the accessibility and responsiveness of notifications.
Keep in mind, that if your replace it with your custom component - you will have to handle both of these features in your component if you need them in your app.

Default `Toast` component has follow properties:

| Property        | Description                      |
| --------------- | -------------------------------- |
| text `string`, required | Message to display in notification |
| actionText `string` | Text of the action button |
| onActionClick `func` | Action button click handler |
| ariaLabel `string` | Default: `text` property value. Should be used for better accessibility. |
| variant `"error"` | Variant of message |

### Accessibility

Default presentational `Toast` component provides accessibility features:

- When toast is opened, action button gets focused if its present
- When toast is hidden, previous focus is restored
- When toast is shown, screen reader reads its message or `ariaLabel` value. Since action button gets focused automatically - it's nice to have an aria-label that mentions it, e.g. `Item deleted, click to undo.  

### Customization

`ToastProvider` accepts properties for customizing the behaviour of the notifications.

| Property        | Description                      |
| --------------- | -------------------------------- |
| timeout `number` | Default: `4500`. The time until a toast is dismissed, in milliseconds. |
| component | Presentational component for displaying notifications. |
| position `top-right, bottom-right, top-left, bottom-left` | Default: `bottom-left`. Position of the toasts on the screen. |

### Roadmap

- Centered position
- Improve accessibility for focused toast actions
- Move Toast component to a separate bundle
- Let toasts hide without animation
- Custom container classnames
