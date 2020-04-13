import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import LoaderButton from "./../../components/LoaderButton";
import { useFormFields } from "./../../libs/hooksLib";
import "./ChangePassword.css";

export default function ChangePassword() {
  const history = useHistory();
  const [isChanging, setIsChanging] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  function validateForm() {
    return (
      fields.oldPassword.length > 0 &&
      fields.newPassword.length > 0 &&
      fields.confirmNewPassword === fields.newPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsChanging(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("User: ", user);
      console.log("Old pass: ", fields.oldPassword, " New password: ", fields.newPassword);
      await Auth.changePassword(user, fields.oldPassword, fields.newPassword);
      setIsChanging(false);
      history.push("/settings");
    } catch (e) {
      console.error(e);
      alert(e.message);
      setIsChanging(false);
    }
  }

  return (
    <div className="ChangePassword">
      <form onSubmit={handleSubmit}>
        <FormGroup bsSize="large" controlId="oldPassword">
          <ControlLabel>Old Password</ControlLabel>
          <FormControl
            autoFocus
            type="password"
            value={fields.oldPassword}
            onChange={handleFieldChange}
            tabIndex="1"
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="newPassword">
          <ControlLabel>New Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.newPassword}
            onChange={handleFieldChange}
            tabIndex="2"
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="confirmNewPassword">
          <ControlLabel>Confirm New Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.confirmNewPassword}
            onChange={handleFieldChange}
            tabIndex="3"
          />
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isChanging}
            disabled={!validateForm()}
            tabIndex="4"
          >
            {isChanging ? "Updating..." : "Update Password"}
          </LoaderButton>
        </FormGroup>
      </form>
    </div>
  );
}
