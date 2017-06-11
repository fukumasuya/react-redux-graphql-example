import { connect } from "react-redux";
import { submitToken, updateToken } from "../modules";
import App from "../components/App";

const mapStateToProps = state => ({
  token: state.token,
  login: state.login,
  name: state.name,
  email: state.email
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(updateToken(event)),
  onClick: token => dispatch(submitToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
