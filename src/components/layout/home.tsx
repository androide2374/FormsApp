interface Props {
  children: React.ReactNode
}
export const HomeLayout = (props: Props) => {
  const { children } = props
  return (
    <>
      <nav className="flex h-16 w-full justify-between items-center px-12 border-b">
        <span>Formularios</span>
      </nav>
      <main className="flex h-screen w-full justify-between items-center px-12 border-b">
        {children}
      </main>

      <footer></footer>
    </>
  )
}
