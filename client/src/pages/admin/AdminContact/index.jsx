import React from 'react'
import AdminContacts from '../shared/AdminContacts'
import AdminContactMessages from '../shared/AdminContactMessages'
import AdminSocial from '../shared/AdminSocial'

const AdminContact = () => {
  return (
    <div>
        <AdminContacts/>
        <AdminSocial/>
        <AdminContactMessages/>
    </div>
  )
}

export default AdminContact