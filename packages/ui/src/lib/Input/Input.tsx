import styles from './Input.module.scss';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@clipcap/ui';
import Icon from '@clipcap/icons';

import type { TInput } from './type';
/**
 * Input component.
 *
 * @param {TInput} props - The properties of the Input component.
 * @returns {JSX.Element} The rendered Input component.
 */
export const Input = ({
  before,
  after,
  type = 'text',
  placeholder,
  label,
  value,
  inline = false,
  small = false,
  fill = false,
  error = false,
  invisible = false,
  disabled = false,
  initialFocus = false,
  actionButtonTitle = "Copy",
  onChange,
  onClear,
  onAction,
  onEnterPress,
  onEscPress,
  onBlur,
  onFocus
}: TInput): JSX.Element => {
  const [$focused, $setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value: newValue } = e.currentTarget;

    if (onChange) return onChange(newValue);
  }

  const handleClear = () => {
    if (onClear) return onClear();
  }

  const handleAction = () => {
    if (inputRef.current) {
      const { value: currentValue } = inputRef.current;

      if (onAction) return onAction(currentValue);
    }
  }

  const handleContainerClick = () => {
    if (!disabled && inputRef.current) {
      return inputRef.current.focus();
    }
  }
  const handleFocus = () => {
    $setFocused(true);

    if (onFocus) onFocus();
  }
  const handleBlur = () => {
    $setFocused(false);

    if (onBlur) onBlur();
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (onEnterPress && key === 'Enter') onEnterPress();
    if (onEscPress && key === 'Escape') onEscPress();
  }

  useEffect(() => {
    if (initialFocus) {
      if (inputRef && inputRef.current) inputRef.current.focus()
    }
  }, []);

  const className = [
    styles.container,
    styles['container--default']
  ];

  if (inline) className.push(styles['container-inline']);
  else if (small) className.push(styles['container-small'])
  else className.push(styles['container-medium'])

  if (fill) className.push(styles['container-fill']);
  if (invisible) className.push(styles['container-invisible']);
  if (disabled) className.push(styles['container-disabled']);
  
  if (error) className.push(styles['container-error'])

  const _computedValue = value;

  return (
    <div className={className.join(' ')}>
      {(() => {
        /*
          Render the Before Element.
        */
        if (before) {
          return <div className={styles.before}>{before}</div>
        }
      })()}
      {(() => {
        /*
          Render the Field with Label and placeholder.
        */
        const inputParams = {
          ref: inputRef,
          onFocus: handleFocus,
          onBlur: handleBlur,
          onChange: handleChange,
          onKeyDown: handleKeyPress,
          className: styles.input,
          value: _computedValue,
          placeholder,
          disabled,
          type
        };

        const fieldContainerClassName = [
          styles.field
        ];

        if (onAction && before) fieldContainerClassName.push(styles['field--before-after-action']);
        else if (onClear && before) fieldContainerClassName.push(styles['field--before-after-clear']);
        else if (onAction) fieldContainerClassName.push(styles['field--after-action']);
        else if (onClear) fieldContainerClassName.push(styles['field--after-clear']);
        else if (after && before) fieldContainerClassName.push(styles['field--before-after']);
        else if (after) fieldContainerClassName.push(styles['field--after']);
        else if (before) fieldContainerClassName.push(styles['field--before']);

        if (label) {
          fieldContainerClassName.push(styles['field-labeled']);
          
          delete inputParams.placeholder;
        }

        return (
          <div className={fieldContainerClassName.join(' ')} onClick={handleContainerClick}>
            {(() => {
              if (label) {
                return <label className={`${styles.label} ${$focused || _computedValue ? styles['label-static'] : ""}`}>{label}</label>
              }
            })()}
            <input {...inputParams} />
          </div>
        )
      })()}
      {(() => {
        /*
          Render the After Element, depending on onCopy and onClear callbacks existance.
          Each after element has different width
        */
        if (onAction) {
          return (
            <div className={`${styles.after} ${styles['after--action']} ${!_computedValue ? styles['after-disabled'] : ""}`} onClick={handleAction}>
              <Button xsmall>{actionButtonTitle}</Button>
            </div>
          );
        } else if (onClear) {
          return (
            <div className={`${styles.after} ${styles['after--clear']} ${!_computedValue ? styles['after-disabled'] : ""}`} onClick={handleClear}>
              <Icon name="outlined-cross-16px" />
            </div>
          );
        } else if (after) {
          return <div className={styles.after}>{after}</div>
        }
      })()}
    </div>
  );
}