import React from 'react'
import fetcher from '../../lib/fetcher'

const LoginPage = () => {
  const handleLogin = () => {
    return fetcher('/auth/login', { email: 'testinLogin@mail.com', password: '123456' })
  }

  return (
    <div>
      LoginPage
      <button onClick={handleLogin}>submit</button>
    </div>
  )
}

export default LoginPage
