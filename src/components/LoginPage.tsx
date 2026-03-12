'use client'
import YahooLoginButton from "./auth/YahooLoginButton";
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Welcome to DehDeh Premium</h1>
          <p>Daily beast, Anzer honey, Time will tell and more... </p>
          <YahooLoginButton />
        </div>
        <div className={styles.heroImage}>
          <img width={300} height={300} src="logo.svg" alt="hero" />
        </div>
      </div>
    </div>
  );
}
