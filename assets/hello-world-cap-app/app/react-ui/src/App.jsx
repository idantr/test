import { useEffect, useState } from 'react'

export default function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('/odata/v4/catalog/Books')
      .then(r => r.json())
      .then(r => setBooks(r.value))
  }, [])

  return (
    <>
      <h1>Books</h1>
      <table>
        <tbody>
          {books.map(b => (
            <tr key={b.ID}>
              <td>
                <span className="title">{b.title}</span>
                <span className="author"><i> by {b.author}</i></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
