import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";
import { Auth } from "aws-amplify";
import LoaderButton from "./../../components/LoaderButton";
import { useFormFields } from "./../../libs/hooksLib";
import "./ChangeEmail.css";

export default function ChangeEmail() {
  // TODO: Check for unverified changes
  // TODO: Resend code if unverified:
  // https://serverless-stack.com/chapters/allow-users-to-change-their-email.html
  const history = useHistory();
  const [isCodeSending, setIsCodeSending] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    code: ""
  });

  function validateEmailForm() {
    return fields.email.length > 0;
  }

  function validateCodeForm() {
    return fields.code.length > 0;
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setIsCodeSending(true);

    const user = await Auth.currentAuthenticatedUser();
    console.log("User: ", user);

    try {
      await Auth.updateUserAttributes(user, { email: fields.email });
      setIsCodeSending(false);
      setIsCodeSent(true);
    } catch (error) {
      console.error(error);
      alert(error.message);
      setIsCodeSending(false);
      setIsCodeSent(false);
    }
  }

  async function handleCodeSubmit(e) {
    e.preventDefault();
    setIsConfirming(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("User: ", user);
      await Auth.verifyCurrentUserAttributeSubmit("email", fields.code);
      setIsConfirming(false);
      history.push("/settings");
    } catch (error) {
      console.error(error);
      alert(error.message);
      setIsConfirming(false);
    }
  }

  function renderEmailForm() {
    return (
      <div className="ChangeEmail">
        <form onSubmit={handleEmailSubmit}>
          <FormGroup bsSize="large" controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
              tabIndex="1"
            />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isCodeSending}
            disabled={!validateEmailForm()}
            tabIndex="4"
          >
            {isCodeSending ? "Updating..." : "Update Email"}
          </LoaderButton>
        </form>
      </div>
    );
  }

  function renderCodeForm() {
    return (
      <form onSubmit={handleCodeSubmit}>
        <FormGroup bsSize="large" controlId="code">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={fields.code}
            onChange={handleFieldChange}
            tabIndex="1"
          />
          <HelpBlock>Please check your email ({fields.email}) for the confirmation code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isConfirming}
          disabled={!validateCodeForm()}
          tabIndex="2"
        >
          {isConfirming ? "Confirming..." : "Confirm Change"}
        </LoaderButton>
      </form>
    );
  }

  return <div className="ChangeEmail">{!isCodeSent ? renderEmailForm() : renderCodeForm()}</div>;
}
