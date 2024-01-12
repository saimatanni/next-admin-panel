import React from 'react'
import Lead from './Lead'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/route'

const page = async () => {
  const session = await getServerSession( authOptions)
  console.log('aession2', session)
  return (
   <Lead/>
  )
}

export default page