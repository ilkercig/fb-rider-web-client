import YahooLoginButton from "./auth/YahooLoginButton";

export default function LoginPage() {
    return (
        <div className="login-page">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Welcome to DehDeh Premium</h1>
            <p>Daily beast, Anzer honey, Time will tell and more... </p>
            <YahooLoginButton />
          </div>
          <div className="hero-image">
          <img width={300} height={300} src="logo.svg" alt="hero" />

          </div>
        </div>
      </div>
    );
}