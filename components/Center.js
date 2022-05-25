import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSpotify from '../hooks/useSpotify'
import Songs from '../components/Songs'

const colors = [
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
  'from-red-500',
  'from-blue-500',
  'from-indigo-500',
]

function Center() {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((error) => console.log('Something went wrong!', error))
  }, [spotifyApi, playlistId])

  return (
    <div className=" h-screen flex-grow overflow-y-scroll text-white scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-2 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-80">
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex h-80 ${color} items-end space-x-7 bg-gradient-to-b to-black p-8`}
      >
        <img
          src={playlist?.images[0]?.url}
          alt=""
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p>Playlist</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <section>
        <Songs />
      </section>
    </div>
  )
}
export default Center
