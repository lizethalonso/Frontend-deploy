import React from 'react'
import Button from './Button'

const Login = () => {
  return (
    <div className='flex gap-5 px-5'>
        <Button text='Iniciar sesión' bgColor="black" textColor="amber-400"/>
        <Button text='Registrarse' bgColor="amber-400" textColor="black"/>
    </div>
  )
}

export default Login