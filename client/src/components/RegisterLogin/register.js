import React, { Component } from "react";
import FormField from "./../utils/Form/formField";
import { update, generateData, isFormValid } from "./../utils/Form/formActions";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/userActions";

import Dialog from "@material-ui/core/Dialog";

class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      firstName: {
        element: "input",
        value: "",
        config: {
          name: "first_name_input",
          type: "text",
          placeholder: "Enter first name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      lastName: {
        element: "input",
        value: "",
        config: {
          name: "last_name_input",
          type: "text",
          placeholder: "Enter last name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter password",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Confirm password",
        },
        validation: {
          required: true,
          confirm: "password",
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "register");
    this.setState({
      formError: false,
      formData: newFormData,
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "register");

    let formIsValid = isFormValid(this.state.formData, "register");

    if (formIsValid) {
      // console.log(dataToSubmit);
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then(response => {
          if (response.payload.success) {
            this.setState({
              formError: false,
              formSuccess: true,
            });
            setTimeout(() => {
              this.props.history.push("/register-login");
            }, 3000);
          } else {
            this.setState({
              formError: true,
            });
          }
        })
        .catch(e => {
          this.setState({
            formError: true,
          });
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={event => this.submitForm(event)}>
                <h2>Personal Information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"firstName"}
                      formData={this.state.formData.firstName}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"lastName"}
                      formData={this.state.formData.lastName}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    id={"email"}
                    formData={this.state.formData.email}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <h2>Verify Password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"password"}
                      formData={this.state.formData.password}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"confirmPassword"}
                      formData={this.state.formData.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>

                <div>
                  {this.state.formError ? (
                    <div className="error_label">Please check your data</div>
                  ) : null}

                  <button onClick={event => this.submitForm(event)}>
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <p>Congratulations. You will be redirected to login page.</p>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
