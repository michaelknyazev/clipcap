import { TCollection, TIcon } from '../type';
import collection from './collection';

export const Icon = ({ name }: TIcon) => {
  const _name = name as keyof TCollection;

  const Component = collection[_name] ? collection[_name] : collection.empty;

  return <Component />;
}

export default Icon;