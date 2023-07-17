import { useContext, useRef, useState } from 'react';
import styles from './AuthForm.module.scss';

import { Button, Input, Title } from '@clipcap/ui';
import { AuthenticationService } from '@clipcap/services';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

export const AuthForm = () => {
  const { Refresh } = useContext(AuthenticationContext);
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeEmail = (value: string) => {
    setEmail(value);
  }

  const handleChangePassword = (value: string) => {
    setPassword(value);
  }

  const handleLogIn = async () => {
    setLoading(true);
    try {
      const { success, event, result } = await AuthenticationService.Login({ email, password });
      if (!success) throw new Error(event);

      await Refresh(result);

    } catch(err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-title']}`}>
        <Title level={1} size={32}>Log In to Get Video summary</Title>
      </div>
      <div className={styles.section}>
        <Input onChange={handleChangeEmail} label='Email' placeholder='email@domain.com' />
      </div>
      <div className={styles.section}>
        <Input onChange={handleChangePassword} label='Password' type='password' placeholder='****' />
      </div>
      <div className={`${styles.section} ${styles['section-button']}`}>
        <Button onClick={handleLogIn} loading={loading} large fill>Log In</Button>
      </div>
    </div>
  )
}