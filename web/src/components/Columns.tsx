import useColumns from '../hooks/useColumns'
import Column from './Column'

const Columns = () => {
  const { data, loading, error } = useColumns(1)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className='columns'>
        {data.getProjectColumns.map((column: any) => (
          <Column column={column} key={column.id} />
        ))}
      </div>
      <style>
        {`
        .columns {
          display: flex;
        }

        .column {
          padding: 1rem;
          margin-right: 3rem;
          border: 1px solid #ccc;
        }

        .card {
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          border: 1px solid pink;
        }
        
        `}
      </style>
    </>
  )
}

export default Columns
