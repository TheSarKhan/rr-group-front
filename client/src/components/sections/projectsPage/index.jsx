import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/constants/QueryKeys'
import ProjectsCard from '@/components/shared/projectsCards'
import { getAPiData } from '@/http/api'
import styles from './style.module.scss'
import clsx from 'clsx'
const ProjectsPage = () => {
  const { data:projectData, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.PROJECTCARDS],
    queryFn: async () => await getAPiData('/v1/projects/getAll'),
  });

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  const projects = projectData || []

  return (
    <div className='container max-w-screen-xl mx-auto my-20 px-3'>
       <h1 className={clsx(styles.mission)}>Layihələr</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6'>
        {projects.map((project, index) => (
          <ProjectsCard key={index} project={project} />
        ))}
      </div>
      
    </div>
  )
}

export default ProjectsPage
