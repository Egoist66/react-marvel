import { ErrorInfo, PureComponent, ReactNode } from "react";
import ErrorPic from "../../assets/images/error.gif";
import { ErrorMessage } from "./error-message";

interface ErorBoundaryProps {
  onTryhandler: () => void;
  error: boolean;
  children: ReactNode;
}

class ErrorBoundary extends PureComponent<ErorBoundaryProps, any> {
  static defaultProps = {
    error: false,
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.props.error) {
      return (
        <>
          <img
            style={{
              display: "block",
              margin: "0 auto",
            }}
            src={ErrorPic}
            alt="error"
          />

          <ErrorMessage 
            onTryHandler={this.props.onTryhandler} 
            errorText="Something went wrong..."
          />
        </>
      );
    }

    return this.props.children;
  }
}




export default ErrorBoundary;
