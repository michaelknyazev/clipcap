import { useContext, useRef, useState } from 'react';
import styles from './AuthForm.module.scss';

import { Button, Input, Title } from '@clipcap/ui';
import { AuthenticationService, TransactionService } from '@clipcap/services';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import Icon from '@clipcap/icons';
import { TAuthorization, TResponse, TTransaction } from '@clipcap/types';

export const AuthForm = () => {
  const { Refresh } = useContext(AuthenticationContext);
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

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

  const handleGetGoogleLink = async () => {
    setGoogleLoading(true);
    try {
      const { success, event, result } = await AuthenticationService.GetGoogleLink();
      if (!success) throw new Error(event);
      
      const { url, transactionId } = result; 

      if (url != "") {
        let logInWindow = window.open(url, "_blank", "popup=yes,width=450,height=550");

        if (logInWindow) {
          const _transactionResult = await TransactionService.Process(transactionId);

          if (_transactionResult) {
            const data: TAuthorization = JSON.parse(_transactionResult.data);

            await Refresh(data);
          }
        }
      }
    } catch(err) {  
      console.log(err);
    }
    setGoogleLoading(false);
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles['section-logo']}`}>
        <span className={styles.logo}>Clip<span className={styles.highlight}>Cap</span></span>
      </div>
      {/*
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
        <div className={`${styles.section} ${styles['section-divider']}`}>
          or
        </div>
      */}
      <div className={`${styles.section} ${styles['section-google']}`}>
        <Button onClick={handleGetGoogleLink} loading={googleLoading} large fill before={<Icon name='google' />}>Sign In with Google to get summary</Button>
      </div>
      {/*
      <div className={`${styles.section} ${styles['section-text']}`}>
        <span>
          Don't have an account?&nbsp;
          <span className={styles.highlight}>Sign Up for free</span>
        </span>
      </div>
      <div className={`${styles.section} ${styles['section-text']}`}>
        <span>
          Forgot your password?&nbsp;
          <span className={styles.highlight}>Restore with email</span>
        </span>
      </div>
      */}
    </div>
  )
}