import styles from './UploadDropZone.module.scss';

import type { TUploadDropZone } from './type';
import { useRef, useState } from 'react';

/**
 * UploadDropZone component for handling file upload with drag and drop functionality.
 *
 * @component
 * @example
 * <UploadDropZone onFiles={(files) => handleFiles(files)}>
 *   {(props) => <MyCustomChild {...props} />}
 * </UploadDropZone>
 */
export const UploadDropZone = ({ children, onFiles }: TUploadDropZone) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFiles = (files: FileList) => {
    if (onFiles) {
      onFiles(files)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }
  const handleSubmitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation()
  }
  const handleUploadButtonClick = (e: React.SyntheticEvent) => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <form onDragEnter={handleDrag} onSubmit={handleSubmitForm} className={styles.container}>
      <input 
        ref={fileInputRef} 
        className={styles.hidden} 
        id="upload-file" 
        type="file" 
        onChange={handleChange}
      />
      <label id="label-upload-file" htmlFor="upload-file" className={`${styles.label} ${styles[`label--${dragActive ? "active" : "inactive"}`]}`}>
        {children({ 
          onUploadButtonClick: handleUploadButtonClick
        })}
      </label>
      {dragActive ? (
        <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} className={styles.dropzone}>
          Drop your files here
        </div>
      ) : ""}
    </form>
  );
}