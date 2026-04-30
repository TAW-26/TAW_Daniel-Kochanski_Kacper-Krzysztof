export default function AuthPage({
  view,
  loginEmail,
  loginPassword,
  registerEmail,
  registerPassword,
  authMessage,
  onLogin,
  onRegister,
  onFieldChange,
  onNavigate,
  isLoading,
}) {
  return (
    <section className="auth-page">
      <div className="auth-card">
        {view === 'login' ? (
          <>
            <h2>Logowanie</h2>
            <label>
              Email
              <input type="email" value={loginEmail} onChange={(event) => onFieldChange('loginEmail', event.target.value)} disabled={isLoading} />
            </label>
            <label>
              Hasło
              <input type="password" value={loginPassword} onChange={(event) => onFieldChange('loginPassword', event.target.value)} disabled={isLoading} />
            </label>
            {authMessage && <div className="auth-message">{authMessage}</div>}
            <button className="primary-button" onClick={onLogin} disabled={isLoading}>
              {isLoading ? 'Logowanie...' : 'Zaloguj'}
            </button>
            <button className="secondary-button" onClick={() => onNavigate('register')} disabled={isLoading}>
              Przejdź do rejestracji
            </button>
          </>
        ) : (
          <>
            <h2>Rejestracja</h2>
            <label>
              Email
              <input type="email" value={registerEmail} onChange={(event) => onFieldChange('registerEmail', event.target.value)} disabled={isLoading} />
            </label>
            <label>
              Hasło
              <input type="password" value={registerPassword} onChange={(event) => onFieldChange('registerPassword', event.target.value)} disabled={isLoading} />
            </label>
            {authMessage && <div className="auth-message">{authMessage}</div>}
            <button className="primary-button" onClick={onRegister} disabled={isLoading}>
              {isLoading ? 'Rejestrowanie...' : 'Zarejestruj'}
            </button>
            <button className="secondary-button" onClick={() => onNavigate('login')} disabled={isLoading}>
              Przejdź do logowania
            </button>
          </>
        )}
      </div>
    </section>
  );
}
