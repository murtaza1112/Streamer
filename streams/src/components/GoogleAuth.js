import React from "react";
import { connect } from "react-redux";
import { SignIn, SignOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      //using client side google authentication
      /* Ready. Make a call to gapi.auth2.init or some other API */
      window.gapi.client
        .init({
          clientId:
            "229944975663-hr13trch0p27mf8cnkbhuuubgdn0s1if.apps.googleusercontent.com",
          scope: "profile email",
        })
        .then(() => {
          //save google instance to my component class
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onChangeAuth(this.auth.isSignedIn.get());
          //gapi function to listen to changes in auth,invoked whne changed
          this.auth.isSignedIn.listen(this.onChangeAuth);
        });
    });
  }

  onChangeAuth = (isSigned) => {
    //console.log(isSigned);
    if (isSigned) this.props.SignIn(this.auth.currentUser.get().getId());
    else this.props.SignOut();
  };

  renderAuthButton = () => {
    console.log(this.props.isSignedIn);
    if (this.props.isSignedIn)
      return (
        <button
          class="ui google plus button"
          onClick={() => this.auth.signOut()}
        >
          <i aria-hidden="true" class="google icon"></i>
          Google Sign Out
        </button>
      );
    else if (this.props.isSignedIn === false)
      return (
        <button
          class="ui google plus button"
          onClick={() => this.auth.signIn()}
        >
          <i aria-hidden="true" class="google plus icon"></i>
          Sign In
        </button>
      );
    else return <div>Loading..</div>;
  };
  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { SignIn, SignOut })(GoogleAuth);
