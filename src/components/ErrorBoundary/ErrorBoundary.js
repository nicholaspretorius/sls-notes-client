import React, { Component } from "react";
import { logError } from "./../../libs/errorLib";
import "./ErrorBoundary.css";

// TODO: Add Sentry releases and sourcemaps.
// Sourcemaps: https://docs.sentry.io/platforms/javascript/sourcemaps/
// Releases: https://docs.sentry.io/workflow/releases/?platform=javascript

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <div className="ErrorBoundary">
        <h3>Sorry there was a problem loading this page</h3>
      </div>
    ) : (
      this.props.children
    );
  }
}
