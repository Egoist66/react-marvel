import { ErrorInfo, PureComponent, ReactNode } from "react";
import ErrorPic from '../../assets/images/error.gif'

interface ErorBoundary {
    isError: boolean,
}

class ErrorBoundary extends PureComponent<{children: ReactNode}, ErorBoundary> {

    state: Readonly<ErorBoundary> = {
        isError: false,
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        if(error){
            this.setState({isError: true})
            console.error(errorInfo)
        }
    }

    render(): ReactNode {
        if(this.state.isError){
            return <img src={ErrorPic} alt="error" />
        }
        
        return this.props.children
    }
}

export default ErrorBoundary