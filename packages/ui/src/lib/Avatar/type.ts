/**
 * @typedef TAvatar
 * @property {string} [image] - Source URL for the avatar image.
 * @property {string} [name] - Name to display alongside the avatar.
 * @property {boolean} [large=false] - Whether to render a larger avatar.
 * @property {boolean} [small=false] - Whether to render a smaller avatar.
 * @property {boolean} [onlyPhoto=false] - Whether to render only the photo, without the name.
 * @property {boolean} [dark=false] - Whether to render a dark-themed avatar.
 */
export type TAvatar = {
  image?: string,
  name?: string,
  large?: boolean,
  small?: boolean,
  onlyPhoto?: boolean,
  dark?: boolean
}