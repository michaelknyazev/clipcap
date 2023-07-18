import Icon from '@clipcap/icons';
import styles from './Loader.module.scss';
import { NonIdealState } from '@clipcap/ui';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <NonIdealState
        icon={<Icon name="loading" />}
        title="Loading"
        description='Loading summary for video'
      />
    </div>
  )
}