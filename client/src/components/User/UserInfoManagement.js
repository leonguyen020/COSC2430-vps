import React, { Component } from "react";
import { connect } from "react-redux";
import FormField from "./../utils/Form/formField";
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from "./../utils/Form/formActions";
import { updateUser, clearUpdateUser } from "./../../actions/userActions";

class UserInfoManagement extends Component {
  state = {
    showForm: false,
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
    },
  };

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm,
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "user info");
    this.setState({
      formError: false,
      formData: newFormData,
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "user info");

    let formIsValid = isFormValid(this.state.formData, "user info");

    if (formIsValid) {
      // console.log(dataToSubmit);
      this.props.dispatch(updateUser(dataToSubmit)).then(() => {
        if (this.props.user.updateUser.success) {
          this.setState(
            {
              formSuccess: true,
            },
            () => {
              setTimeout(() => {
                this.props.dispatch(clearUpdateUser());
                this.setState({
                  formSuccess: false,
                });
              }, 2000);
            },
          );
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  componentDidMount() {
    const newFormData = populateFields(
      this.state.formData,
      this.props.user.userData,
    );

    this.setState({
      formData: newFormData,
    });
  }

  render() {
    return (
      <div>
        <div className="user_nfo_panel">
          <div>
            <span>
              <strong>First Name: </strong> {this.props.user.userData.firstName}
            </span>
            <span>
              <strong>Last Name: </strong> {this.props.user.userData.lastName}
            </span>
            <span>
              <strong>Email: </strong> {this.props.user.userData.email}
            </span>
          </div>
          <button onClick={() => this.toggleForm()}>Edit Info</button>
        </div>
        {this.state.showForm ? (
          <form onSubmit={event => this.submitForm(event)}>
            <h2>Edit Information</h2>
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
            <div>
              {this.state.formSuccess ? (
                <div className="form_success">Success</div>
              ) : null}
              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}

              <button onClick={event => this.submitForm(event)}>
                Update Info
              </button>
            </div>
          </form>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(UserInfoManagement);
