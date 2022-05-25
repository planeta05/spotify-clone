import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
  console.log(Object.values(providers))
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <h1>This is the login page</h1>
      <img
        className="mb-5 w-52"
        src="https://links.papareact.com/9xl"
        alt="spotify-logo"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="rounded-full bg-[#1ed760] p-5 text-white"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
