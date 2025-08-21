import React from 'react'
import AdminForeign from '../shared/AdminForeign'
import AdminServiceCard from '../shared/AdminServiceCategories'
import AdminHeadCategories from '../shared/AdminHeadCategories'
import AdminSubCategories from '../shared/AdminSubCategories'

const AdminService = () => {
  return (
    <div>
        {/* <AdminSetem/> */}
        <AdminForeign/>
        <AdminHeadCategories/>
        <AdminSubCategories/>
        <AdminServiceCard/>
    </div>
  )
}

export default AdminService