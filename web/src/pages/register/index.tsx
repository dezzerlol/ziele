import React from 'react'
import fetcher from '../../lib/fetcher'

const RegisterPage = () => {
  const handleLogin = () => {
    return fetcher('/auth/register', { email: 'testinLogin@mail.com', password: '123456', username: 'testinLogin' })
  }

  return (
    <div>
      RegisterPage
      <button onClick={handleLogin}>submit</button>
    </div>
  )
}

export default RegisterPage
