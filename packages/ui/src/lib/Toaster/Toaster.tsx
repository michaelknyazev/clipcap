import styles from './Toaster.module.scss';

import { Component } from 'react';

import type { TToasterProps, TToasterState, TToast } from './type';
/**
 * Toaster is a React component for displaying toast-like notifications.
 *
 * @class
 * @extends {Component<TToasterProps, TToasterState>}
 */
class Toaster extends Component {
  duration: number
  state: TToasterState = {
    toasts: []
  }

  constructor(props: TToasterProps) {
    super(props);

    const { duration = 2000 } = props;

    this.duration = duration;
  }

  toastId: number = 0;
  /**
   * Removes a toast from the Toaster component.
   *
   * @param {TToast} toast - The toast to remove.
   */
  remove(toast: TToast) {
    this.setState((prevState: TToasterState) => {
      const _toasts = [ ...prevState.toasts ];
      const _target = _toasts.find(_t => _t.id === toast.id);

      if (_target) {
        const _index = _toasts.indexOf(_target);
      
        _toasts.splice(_index, 1);
  
        return {
          toasts: _toasts
        }        
      }

    });
  } 
  /**
   * Shows a toast within the Toaster component.
   *
   * @param {TToast} toast - The toast to show.
   * @returns {TToast} - The shown toast with a generated id.
   */
  show(toast: TToast) {
    const _toast = {
      id: this.toastId++,
      ...toast,
    };

    this.setState((prevState: TToasterState) => {
      const _toasts = [ ...prevState.toasts ];
      
      _toasts.push(_toast);

      return {
        toasts: _toasts
      }
    });

    setTimeout(() => this.remove(_toast), this.duration);

    return _toast;
  }

  render() { 
    return (
      <div className={styles.container}>
        {this.state.toasts.map((toast: TToast) => {
          return (
            <div onClick={() => this.remove(toast)} key={`toast-${toast.id}`} className={styles.section}>
              <div className={`${styles.toast} ${styles[`toast--${toast.template || 'default'}`]}`}>
                <div className={styles['toast__section']}>
                  <p className={styles['toast__message']}>{toast.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export { Toaster }