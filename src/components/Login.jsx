import React from 'react'
import Button from './Button'

const Login = () => {
  return (
    <div className='flex gap-5 px-5'>
        <Button text='Iniciar sesión' bgColor="black" textColor="primary"/>
        <Button text='Registrarse' bgColor="amber-400" textColor="primary"/>
    </div>
  )
}

export default Login