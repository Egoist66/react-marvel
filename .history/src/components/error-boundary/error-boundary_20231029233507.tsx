import { ErrorInfo, PureComponent, ReactNode } from "react";
import ErrorPic from '../../assets/images/error.gif'

interface ErorBoundary {
    isError: boolean,
}

class ErrorBoundary extends PureComponent<{children: ReactNode, error: boolean}, ErorBoundary> {

    static defaultProps = {
        error: false
    }

    state: Readonly<ErorBoundary> = {
        isError: this.props.error,
    }

    static getDerivedStateFromError(error: boolean) {
        return {isError: true};
      }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(error, errorInfo)
        
    }

    render(): ReactNode {
        if(this.state.isError){
            return (
                <>
                    
                    <img style={{
                        display: 'block',
                        margin: '0 auto'
                    }} src={ErrorPic} alt="error" />
                    <h2 style={{textAlign: 'center'}}>Something went wrong...</h2>
                
                </>
            )
        }
        
        return this.props.children
    }
}

export default ErrorBoundary