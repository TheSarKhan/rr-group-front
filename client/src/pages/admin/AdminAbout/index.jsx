import React from 'react'
import AdminValues from '../shared/AdminValues'
import AdminAboutMissions from '../shared/AdminMission'
import AdminAboutCertificates from '../shared/AdminAboutCertificates'
import AdminAboutTeam from '../shared/AdminAboutTeam'
import AdminAboutVision from '../shared/AdminAboutVision'
import AdminAboutHistory from '../shared/AdminAboutHistory'
import AdminAboutManagementStructure from '../shared/AdminAboutManagemenetStructure'

const AdminAbout = () => {
  return (
    <div>
        <AdminAboutMissions/>
        <AdminAboutVision/>
        <AdminValues/>
        <AdminAboutHistory/>
        <AdminAboutManagementStructure/>
        <AdminAboutCertificates/>
        <AdminAboutTeam/>
    </div>
  )
}

export default AdminAbout