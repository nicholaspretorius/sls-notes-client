import React from "react";
import { LinkContainer } from "react-router-bootstrap";

// import { onError } from "../libs/errorLib";
import LoaderButton from "../../components/LoaderButton";
import "./Settings.css";

export default function Settings() {
  return (
    <div className="Settings">
      <LinkContainer to="/settings/email">
        <LoaderButton block bsSize="large">
          Update Email
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/settings/change-password">
        <LoaderButton block bsSize="large">
          Update Password
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/settings/billing">
        <LoaderButton block bsSize="large">
          Billing
        </LoaderButton>
      </LinkContainer>
    </div>
  );
}
