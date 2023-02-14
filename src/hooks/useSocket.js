/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const useSocket = () => {
  const socketRef = useRef()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    return () => {
      if (initialized) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  const initialize = () => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_BASE_URL, { path: '/message' })

    socketRef.current.on('msgToClient', message => {
      console.log(message)
    })

    setInitialized(true)
  }

  const sendMessage = messageBody => {
    socketRef.current.emit('msgToServer', {
      sender: socketRef.current.id,
      body: messageBody
    })
  }

  return { initialize, sendMessage }
}

export default useSocket
