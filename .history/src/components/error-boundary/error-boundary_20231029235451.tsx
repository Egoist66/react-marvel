import { ErrorInfo, PureComponent, ReactNode } from "react";
import ErrorPic from "../../assets/images/error.gif";

interface ErorBoundary {
  isError: boolean;
}

class ErrorBoundary extends PureComponent<
  { children: ReactNode; error: boolean },
  any
> {
  static defaultProps = {
    error: false,
  };

  static getDerivedStateFromError(error: boolean) {
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
          <h2 style={{ textAlign: "center" }}>Something went wrong...</h2>
          <div style={{textAlign: 'center'}}>
            <button style={{marginTop: 10}} className="button button__main">
              <div onClick={() => document.location.reload()} className="inner"></div>
            </button>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
