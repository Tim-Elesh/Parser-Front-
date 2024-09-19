import React, { ReactNode } from 'react';

// Определяем типы для props и state
interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        // Обновляем состояние, чтобы при следующем рендере показать запасной UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // Мы также можем логгировать ошибку в службу сбора ошибок
        console.error("Ошибка в компоненте:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-red-600">Error</h1>
                        <p className="mt-4 text-lg text-gray-700">Please reload page</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;