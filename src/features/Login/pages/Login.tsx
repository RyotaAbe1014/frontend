import React from 'react'
import "tailwindcss/tailwind.css";
import { LoginForm } from '../organisms/LoginForm'
import { Card } from '../../../common/_components/_atoms/Card/Card';

export const Login: React.FC = () => {
  return (
    // ログイン画面
    <>
      <div className='bg-gray-100 h-screen'>
        <div className="flex justify-center items-center h-screen">
          <Card width="w-96" height="h-700px">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login
              </h2>
            </div>
            <LoginForm />
          </Card >
        </div>
      </div>
    </>
  )
}
