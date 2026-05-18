export default function Navbar({ isLoggedIn, isAdmin, onNavigate, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">CarRent</div>
      <div className="navbar-links">
        <button className="nav-button" onClick={() => onNavigate("home")}>
          Samochody
        </button>
        {isLoggedIn ? (
          <>
            <button
              className="nav-button"
              onClick={() => onNavigate("profile")}
            >
              Profil
            </button>
            {isAdmin && (
              <button
                className="nav-button"
                onClick={() => onNavigate("admin")}
              >
                Admin
              </button>
            )}
            <button className="nav-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="nav-button" onClick={() => onNavigate("login")}>
              Login
            </button>
            <button
              className="nav-button secondary"
              onClick={() => onNavigate("register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
