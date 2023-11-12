import { ErrorInfo, PureComponent, ReactNode } from "react";
import ErrorPic from '../../assets/images/error.gif'


class ErrorBoundary extends PureComponent<{children: ReactNode, error: boolean}, null> {

    static defaultProps = {
        error: false
    }



    static getDerivedStateFromError(error: boolean) {
        if(error){
            return {isError: true};

        }
      }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(error, errorInfo)
        
    }

    render(): ReactNode {
        if(this.props.error){
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