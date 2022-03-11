import React from "react";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      loading: "",
      value: {},
      error: "",
      place: "",
      enteredNameIsValid: false,
      enteredNameTouched: false,
      passwordIsValid: false,
      passwordTouched: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    this.setState({ enteredNameTouched: true });
    this.setState({ passwordTouched: true });
    if (
      !this.state.signInEmail.includes("@") ||
      this.state.signInPassword.length <= 0
    ) {
      this.setState({ enteredNameIsValid: false });
      this.setState({ passwordIsValid: false });
      return;
    }
    this.setState({ passwordIsValid: true });
    this.setState({ enteredNameIsValid: true });
    this.setState({ error: "" });
    fetch("https://blooming-forest-94209.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Wrong credentials");
        } else {
          return response.json();
        }
      })
      .then((user) => {
        if (Object.keys(this.state.value).length === 0) {
          this.setState({ loading: "Loading...." });
        } else if (Object.keys(this.state.value).length > 0) {
          this.setState({ value: user });
        }
        setTimeout(() => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
          }
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    const nameInputIsInvalid =
      !this.state.enteredNameIsValid && this.state.enteredNameTouched;
    const passwordIsInvalid =
      !this.state.passwordIsValid && this.state.passwordTouched;
    const errorlogic =
      !nameInputIsInvalid &&
      !passwordIsInvalid &&
      this.state.error;
    const x = nameInputIsInvalid || passwordIsInvalid;
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className={nameInputIsInvalid ? "mt3 invalid" : "mt3"}>
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className={passwordIsInvalid ? "mv3 invalid" : "mv3"}>
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
                {x && (
                  <p className="error-text">Enter valid email or password </p>
                )}
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt2">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
          {this.state.loading ? <div className="lds-dual-ring"></div> : <p></p>}
          {errorlogic && <p className="error-text">{this.state.error}</p>}
        </main>
      </article>
    );
  }
}

export default Signin;

