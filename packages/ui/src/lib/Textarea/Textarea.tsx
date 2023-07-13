import styles from './Textarea.module.scss';

import React from 'react';

import type { TTextarea } from './type';

export const Textarea = ({ 
  value, 
  placeholder,
  onChange,
  onBlur,
  onFocus,
  onEnterPress,
  onEscPress
}: TTextarea) => {

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value: newValue } = e.currentTarget;

    if (onChange) return onChange(newValue);
  }

  const handleBlur = () => {
    if (onBlur) onBlur()
  }

  const handleFocus = () => {
    if (onFocus) onFocus()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (onEnterPress && e.key === 'Enter') onEnterPress()
    if (onEscPress && e.key === 'Escape') onEscPress()
  }

  const className = [
    styles.container
  ];
  const params = {
    className: className.join(' '),
    placeholder,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    //onKeyDown: handleKeyPress
  };

  return (
    <textarea {...params} />
  );
}