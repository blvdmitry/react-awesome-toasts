import * as React from 'react';

type ToastPosition = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';

export interface ToastContext<T = object> {
  show: (props: T) => void;
  hide: () => void;
}

export interface ToastConsumerProps {
  children: (context: ToastContext) => React.ReactNode;
}

export interface ToastProviderProps {
  timeout: number;
  component: React.ComponentClass;
  position: ToastPosition;
  children: React.ReactNode;
}

export interface ToastProviderQueueItem {
  props: object;
  id: string;
}


export interface ToastProviderState {
  toasts: Array<ToastProviderQueueItem>;
}

export interface ToastContainerProps<T = object> {
  onHide: () => void;
  onRemove: () => void;
  toastProps: T;
  component: React.ComponentClass;
  timeout: number;
  position: ToastPosition;
}

export interface ToastContainerState {
  status: 'entering' | 'entered' | 'exiting' | 'exited';
}

type WithToastComponent = React.ComponentClass<{ toast: ToastContext } & object>;

export type WithToast = (c: WithToastComponent) => (props: object) => React.ReactElement<any>;
