import { h, Component } from "preact";
import { connect } from "mobx-preact";

@connect(["store"])
class Controls extends Component {
  handleSignup = e => {
    e.preventDefault();
    this.props.store.openModal("signup", this.signupButton);
  };

  handleLogin = e => {
    e.preventDefault();
    this.props.store.openModal("login", this.loginButton);
  };

  handleLogout = e => {
    e.preventDefault();
    this.props.store.openModal("user", this.logoutButton);
  };

  handleButton = e => {
    e.preventDefault();
    this.props.store.openModal(
      this.props.store.user ? "user" : "login",
      this.identityButton
    );
  };

  render() {
    const { user } = this.props.store;

    if (this.props.mode === "button") {
      return (
        <a
          className="netlify-identity-button"
          href="#"
          onClick={this.handleButton}
          ref={identityButton => (this.identityButton = identityButton)}
        >
          {this.props.text || (user ? "Log out" : "Log in")}
        </a>
      );
    }

    if (user) {
      return (
        <ul className="netlify-identity-menu">
          <li className="netlify-identity-item netlify-identity-user-details">
            Logged in as{" "}
            <span className="netlify-identity-user">
              {user.user_metadata.name || user.email}
            </span>
          </li>
          <li className="netlify-identity-item">
            <a
              className="netlify-identity-logout"
              href="#"
              onClick={this.handleLogout}
              ref={logoutButton => (this.logoutButton = logoutButton)}
            >
              Log out
            </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="netlify-identity-menu">
        <li className="netlify-identity-item">
          <a
            className="netlify-identity-signup"
            href="#"
            onClick={this.handleSignup}
            ref={signupButton => (this.signupButton = signupButton)}
          >
            Sign up
          </a>
        </li>
        <li className="netlify-identity-item">
          <a
            className="netlify-identity-login"
            href="#"
            onClick={this.handleLogin}
            ref={loginButton => (this.loginButton = loginButton)}
          >
            Log in
          </a>
        </li>
      </ul>
    );
  }
}

export default Controls;
