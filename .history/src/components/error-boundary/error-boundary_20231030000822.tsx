import { ErrorInfo, PureComponent, ReactNode } from "react";
import ErrorPic from "../../assets/images/error.gif";


interface ErorBoundaryProps {
    onTryhandler: () => void,
    error: boolean,
    children: ReactNode

}

class ErrorBoundary extends PureComponent<ErorBoundaryProps, any>{

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
          <h2 style={{ textAlign: "center" }}>Something went wrong...It seems requesting data does not exist</h2>
          <div style={{textAlign: 'center'}}>
            <button style={{marginTop: 10}} className="button button__main">
              <div onClick={this.props.onTryhandler} className="inner">Try again</div>
            </button>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
