import styles from './LogInForm.module.scss';

import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthenticationContext } from '@clipcap/contexts';
import { AuthenticationService } from '@clipcap/services';
import { delay, validateEmail } from '@clipcap/helpers';

import { Title, Text, Input, Button, Bubble } from '@clipcap/ui';
import Icon from '@clipcap/icons';

const LogInForm = () => {
  const { Refresh } = useContext(AuthenticationContext);
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [stage, setStage] = useState<string>("email");
  const [isLoading, setLoading] = useState({
    email: false,
    password: false
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false
  })

  const handleResetErrors = () => setErrors({ password: false, email: false });

  const handleClearEmailField = () => {
    handleResetErrors();

    return setEmail("");
  }

  const handleClearPasswordField = () => {
    handleResetErrors();

    return setPassword("")
  }

  const handleChangeEmailField = (_email: string) => {
    handleResetErrors();

    return setEmail(_email);
  }

  const handleChangePasswordField = (_password: string) => {
    handleResetErrors();

    return setPassword(_password);
  }

  const handleSubmitEmail = async () => {
    handleResetErrors();
    setLoading({ ...isLoading, email: true });

    /*
      Remount Bubble every submit 
      (for shaking effect, even if user did not changed anything in field)
    */
    await delay(10);

    try {
      if (!validateEmail(email)) throw new Error();

      const { success = false } = await AuthenticationService.CheckEmail(email);
      if (!success) throw new Error();

      setStage("password");
    } catch (_) {
      /* 
        TODO: 500 error Handling. 

        When Server is Down, we must use addEvent to tell about that.
        For now it will be always incorrect email error message.
      */
      setErrors({ ...errors, email: true });
    }

    return setLoading({ ...isLoading, email: false });
  }

  const handleForgotPassword = () => {
    /* TODO: Send Reset Link with API */
    return setStage("restore");
  }

  const handleGoBackToEmail = () => {
    handleResetErrors();
    setPassword("");
    return setStage("email");
  }

  const handleSubmitPassword = async () => {
    handleResetErrors();
    setLoading({ ...isLoading, password: true });

    try {
      const { success = false } = await AuthenticationService.Login({ email, password });
      if (!success) throw new Error();

      const redirect_uri = await Refresh()

      if (redirect_uri) {
        return router.push(redirect_uri);
      }
    } catch (_) {
      /* 
        TODO: 500 error Handling. 

        When Server is Down, we must use addEvent to tell about that.
        For now it will be always incorrect password error message.
      */
      setErrors({ ...errors, password: true });
    }

    return setLoading({ ...isLoading, password: false });
  }

  const isPasswordStage = stage === 'password';
  const isRestoreStage = stage === 'restore';
  const isPasswordOrRestoreStage = isPasswordStage || isRestoreStage;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.section} ${styles['section-previous']} ${isPasswordOrRestoreStage ? styles['section-show'] : ""}`}>
        <span className={`${styles.link} ${styles['link--block']}`} onClick={handleGoBackToEmail}>
          <span className={styles['link__icon']}>
            <Icon name="arrow-left" />
          </span>
          <span className={styles['link__text']}>
            Email
          </span>
        </span>
      </div>
      {(() => {
        if (isRestoreStage) {
          return (
            <div className={`${styles.section}`}>
              <Title semibold level={1} size={40}>Password Reset</Title>
            </div>
          );
        }

        return (
          <div className={`${styles.section}`}>
            <Title semibold level={1} size={40}>Log In</Title>
          </div>
        );
      })()}
      {(() => {
        if (stage === 'email') {
          return (
            <>
              <div className={`${styles.section} ${styles['section-hint']}`}>
                <Title size={20} level={5}>Enter your email to continue</Title>
              </div>
              <div className={`${styles.section} ${styles['section-input']}`}>
                <Bubble template='error' show={errors.email} title="Invalid email 😐" content="Try again please">
                  <Input
                    fill
                    before={<Icon name="solid-envelope" />}
                    error={errors.email}
                    value={email}
                    placeholder="email@example.com"
                    onClear={handleClearEmailField}
                    onChange={handleChangeEmailField}
                    onEnterPress={handleSubmitEmail}
                  />
                </Bubble>
              </div>
              <div className={`${styles.section} ${styles['section-button']}`}>
                <Button loading={isLoading.email} fill large onClick={handleSubmitEmail}>Continue with email</Button>
              </div>
            </>
          );
        }
        if (stage === 'password') {
          return (
            <>
              <div className={`${styles.section} ${styles['section-hint']}`}>
                <Title size={20} level={5}>And password please</Title>
              </div>
              <div className={`${styles.section} ${styles['section-input']}`}>
                <Bubble template='error' show={errors.password} title="Wrong password 😐" content="Try again please or reset it">
                  <Input
                    fill
                    type='password'
                    before={<Icon name="solid-lock" />}
                    value={password}
                    placeholder="*****"
                    error={errors.password}
                    onClear={handleClearPasswordField}
                    onChange={handleChangePasswordField}
                    onEnterPress={handleSubmitPassword}
                  />
                </Bubble>
              </div>
              <div className={`${styles.section} ${styles['section-link']}`}>
                <span className={styles.link} onClick={handleForgotPassword}>
                  <span className={styles['link__text']}>I forgot my password</span>
                </span>
              </div>
              <div className={`${styles.section} ${styles['section-button']}`}>
                <Button loading={isLoading.password} fill large onClick={handleSubmitPassword}>Sign In</Button>
              </div>
            </>
          );
        }
        if (stage === 'restore') {
          return (
            <>
              <div className={styles.section}>
                <Text size={20}>
                  If an account exists for
                  <span className={styles.link}>{email}</span>
                  we’ll send instructions for resetting your password.
                </Text>
              </div>
              <div className={styles.section}>
                <Text size={20}>
                  Didn’t get them? Check the email or ask to resend the instructions.
                </Text>
              </div>
              <div className={styles.section}>
                <Button fill large onClick={handleGoBackToEmail}>
                  Back to Sign in
                </Button>
              </div>
              <div className={styles.section}>
                <Button fill large minimal onClick={handleGoBackToEmail}>
                  Send the instructions again
                </Button>
              </div>
            </>
          )
        }
      })()}
      {/*(() => {
        
        if (!isRestoreStage) {
          return (
            <>
              <div className={`${styles.section} ${styles['section--divider']}`}>
                <Text size={20}>or</Text>
              </div>
              <div className={`${styles.section} ${styles['section-social']}`}>
                <Button fill minimal before={<Icon name="google" />}>Continue with Google</Button>
              </div>
              <div className={`${styles.section}`}>
                <Button fill minimal before={<Icon name="microsoft" />}>Continue with Microsoft</Button>
              </div>
            </>
          );
        }
      })()*/}
    </div>
  )
}

export {LogInForm};