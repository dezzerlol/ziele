import Columns from '../components/Columns'

const Home = () => {
  const handleLogout = () => {}
  return (
    <div>
      <h1>Columns</h1>
      <Columns />
      <form method='POST' action='/api/auth/logout'>
        <button type='submit'>
          <span>Logout</span>
        </button>
      </form>
    </div>
  )
}

export default Home

Home.layout = true
