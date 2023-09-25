import React from 'react'
import { useUserLocal } from '../../hooks/useUserLocal'

const RolesViewModel = () => {
  const {user} = useUserLocal();
  console.log(user?.roles)
  return {
    user
  }
}

export default RolesViewModel;