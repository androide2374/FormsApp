import Link from 'next/link'

export default function Home () {
  return (
    <div className="container">
      <h1>Formularios Lomas de Zamora</h1>
      <Link href={'forms'}>
        <a>Forms</a>
      </Link>
    </div>
  )
}
