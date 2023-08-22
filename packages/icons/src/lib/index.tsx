import collection from './collection';

import type { TCollection, TIcon } from '../type';

const Icon = ({ name }: TIcon) => {
  const _name = name as keyof TCollection;

  const Component = collection[_name] ? collection[_name] : collection.empty;

  return <Component />;
}


export { Icon }