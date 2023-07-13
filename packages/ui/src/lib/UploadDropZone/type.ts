/**
 * @typedef TUploadDropZoneChildrenProps
 * @type {Object}
 * @property {(e: React.SyntheticEvent) => void} onUploadButtonClick - Function to handle the upload button click event.
 */
export type TUploadDropZoneChildrenProps = {
  onUploadButtonClick: (e: React.SyntheticEvent) => void
}
/**
 * @typedef TUploadDropZone
 * @type {Object}
 * @property {(files: FileList) => void} onFiles - Callback function for handling the uploaded files.
 * @property {(props: TUploadDropZoneChildrenProps) => JSX.Element} children - Function that returns a JSX element, receives TUploadDropZoneChildrenProps as argument.
 */
export type TUploadDropZone = {
  onFiles: (files: FileList) => void,
  children: (props: TUploadDropZoneChildrenProps) => JSX.Element
}