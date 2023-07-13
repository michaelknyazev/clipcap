import styles from './SignUpForm.module.scss';

import { useState } from 'react';

import { Title, Text, Input, Button, Checkbox } from '@clipcap/ui';
import Icon from '@clipcap/icons'

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreedToNews, setAgreedToNews] = useState(false);
  const [agreedToLegal, setAgreedToLegal] = useState(false);
  const [stage, setStage] = useState("email");

  const handleClearEmailField = () => {
    return setEmail("");
  }

  const handleClearPasswordField = () => {
    return setPassword("")
  }

  const handleChangeEmailField = (_email: string) => {
    return setEmail(_email);
  }

  const handleChangePasswordField = (_password: string) => {
    return setPassword(_password);
  }

  const handleAgreedToLegalChange = () => {
    return setAgreedToLegal(!agreedToLegal);
  }

  const handleAgreedToNewsChange = () => {
    return setAgreedToNews(!agreedToNews)
  }

  const handleSubmitEmail = () => {
    /* TODO: Email Validation */
    return setStage("password");
  }

  const handleGoBackToEmail = () => {
    setPassword("");

    return setStage("email");
  }

  const handleSubmitPassword = () => {
    console.log(email, password);
  }

  const isPasswordStage = stage === 'password';

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.section} ${styles['section-previous']} ${isPasswordStage ? styles['section-show'] : ""}`}>
        <span className={`${styles.link} ${styles['link--block']}`} onClick={handleGoBackToEmail}>
          <span className={styles['link__icon']}>
            <Icon name="arrow-left" />
          </span>
          <span className={styles['link__text']}>
            Email
          </span>
        </span>
      </div>
      <div className={`${styles.section}`}>
        <Title semibold level={1} size={40}>Hi! Sign up for free 👋</Title>
      </div>
      {(() => {
        if (stage === 'email') {
          return (
            <>
              <div className={`${styles.section} ${styles['section-hint']}`}>
                <Title size={20} level={5}>Enter your email to continue</Title>
              </div>
              <div className={`${styles.section} ${styles['section-input']}`}>
                <Input
                  fill
                  before={<Icon name="solid-envelope" />}
                  value={email}
                  placeholder="email@example.com"
                  onClear={handleClearEmailField}
                  onChange={handleChangeEmailField}
                  onEnterPress={handleSubmitEmail}
                />
              </div>
              <div className={`${styles.section} ${styles['section-button']}`}>
                <Button fill onClick={handleSubmitEmail}>Continue with email</Button>
              </div>
            </>
          );
        }
        if (stage === 'password') {
          return (
            <>
              <div className={`${styles.section} ${styles['section-hint']}`}>
                <Title size={20} level={5}>And strong password please</Title>
              </div>
              <div className={`${styles.section} ${styles['section-input']}`}>
                <Input
                  fill
                  type='password'
                  before={<Icon name="solid-lock" />}
                  value={password}
                  placeholder="*****"
                  onClear={handleClearPasswordField}
                  onChange={handleChangePasswordField}
                  onEnterPress={handleSubmitPassword}
                />
              </div>
              <div className={`${styles.section} ${styles['section-checkbox']}`}>
                <Checkbox checked={agreedToNews} onChange={handleAgreedToNewsChange}>
                  Send me great news and awesome updates
                </Checkbox>
              </div>
              <div className={`${styles.section} ${styles['section-checkbox']}`}>
                <Checkbox checked={agreedToLegal} onChange={handleAgreedToLegalChange}>
                  Now time to read, but I agree to
                  <a className={styles.link} href="" target="_blank">
                    <span className={styles['link__text']}>Terms</span>
                  </a>
                  and
                  <a className={styles.link} href="" target="_blank">
                    <span className={styles['link__text']}>
                      Privacy Policy
                    </span>
                  </a>
                </Checkbox>
              </div>
              <div className={`${styles.section} ${styles['section-button']}`}>
                <Button fill onClick={handleSubmitPassword}>Sign In</Button>
              </div>
            </>
          );
        }
      })()}
      <div className={`${styles.section} ${styles['section--divider']}`}>
        <Text size={20}>or</Text>
      </div>
      <div className={`${styles.section} ${styles['section-social']}`}>
        <Button fill minimal before={<Icon name="google" />}>Continue with Google</Button>
      </div>
      <div className={`${styles.section}`}>
        <Button fill minimal before={<Icon name="microsoft" />}>Continue with Microsoft</Button>
      </div>
    </div>
  )
}

export { SignUpForm };