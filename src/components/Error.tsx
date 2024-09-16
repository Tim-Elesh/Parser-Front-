import React from 'react';

interface ErrorPageProps {
  errorCode: number;
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, message }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">{errorCode}</h1>
        <p className="mt-4 text-lg text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default ErrorPage;