import React from 'react'

export const UserInfo = ({email,name, birthday}) => {
  

    return (
    <>
    <p>User: {name}</p>
    <p>Email: {email}</p>
    <p>Birthday: {birthday}</p>
    </>
  )
};