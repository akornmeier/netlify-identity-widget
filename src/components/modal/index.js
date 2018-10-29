import { h, Component } from "preact";

function formatError(error) {
  return (
    (error.json && error.json.error_description) ||
    error.message ||
    error.toString()
  );
}

export default class Modal extends Component {
  constructor(props) {
    super(props);
  }

  handleClose = e => {
    e.preventDefault();
    this.props.onClose();
  };

  blockEvent = e => {
    e.stopPropagation();
  };

  linkHandler = page => e => {
    e.preventDefault();
    this.props.onPage(page);
  };

  keypressHandler = e => {
    const ESCAPE_KEY = 27;
    const TAB_KEY = 9;
    const { target, which, shiftKey } = e;
    const { isOpen } = this.props;
    const focusables = Array.from(
      target.ownerDocument.body.querySelectorAll(".btn, .formControl, .btnLink")
    );
    const index = focusables.findIndex(element => element === target);
    if (isOpen && which === ESCAPE_KEY) {
      e.preventDefault();
      this.handleClose(e);
    } else if (isOpen && which === TAB_KEY) {
      if (index === 0 && shiftKey) {
        e.preventDefault();
        focusables[focusables.length - 1].focus();
      } else if (index + 1 === focusables.length && !shiftKey) {
        e.preventDefault();
        focusables[0].focus();
      }
    }
  };

  focus = () => this.closeButton.focus();

  render() {
    const {
      page,
      error,
      loading,
      showHeader,
      showSignup,
      devSettings,
      isOpen,
      children,
      logo
    } = this.props;
    const hidden = loading || !isOpen;
    if (!hidden) {
      this.focus();
    }
    return (
      <div
        className="modalContainer"
        aria-hidden={`${hidden}`}
        onClick={this.handleClose}
      >
        <div
          className={`modalDialog${loading ? " visuallyHidden" : ""}`}
          onClick={this.blockEvent}
          role="dialog"
          aria-hidden={`${hidden}`}
          aria-label={
            devSettings
              ? "Development Settings"
              : showSignup ? "Signup / Login" : "Login"
          }
          onKeyDown={this.keypressHandler}
        >
          <div className="modalContent">
            <button
              onclick={this.handleClose}
              className="btn btnClose focusable"
              ref={closeButton => (this.closeButton = closeButton)}
            >
              <span className="visuallyHidden">Close</span>
            </button>
            {showHeader && (
              <div className="header">
                {showSignup && (
                  <button
                    className={`btn btnHeader ${page.signup ? "active" : ""}`}
                    onclick={this.linkHandler("signup")}
                  >
                    Sign up
                  </button>
                )}
                {!devSettings && (
                  <button
                    className={`btn btnHeader ${page.login ? "active" : ""}`}
                    onclick={this.linkHandler("login")}
                  >
                    Log in
                  </button>
                )}
              </div>
            )}
            {page.title && (
              <div className="header">
                <button className="btn btnHeader active">{page.title}</button>
              </div>
            )}
            {devSettings && (
              <div className="header">
                <button className="btn btnHeader active">
                  Development Settings
                </button>
              </div>
            )}
            {error && (
              <div className="flashMessage error">
                <span>{formatError(error)}</span>
              </div>
            )}
            {children}
          </div>
        </div>
        {logo && (
          <a
            href="https://www.netlify.com"
            className={`callOut${loading ? " visuallyHidden" : ""}`}
          >
            <span className="netlifyLogo" />
            Coded by Netlify
          </a>
        )}
      </div>
    );
  }
}
