const RootLayout = ({
  children
}: { children: React.ReactNode }) => {
  return (
    <>
      <div className='p-6'>{children}</div>
    </>
  )
}

export default RootLayout