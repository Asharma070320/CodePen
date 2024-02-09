import React from 'react'
import {  useSelector } from 'react-redux'
import {motion} from 'framer-motion'
import ProjectCard from './ProjectCard'

const Projects = () => {

  const projects = useSelector((state) => state.projects?.projects);

  console.log(projects);

  return (

    <div className='projects_div'>
      {projects && projects.map((project,index)=>{
        <ProjectCard key={project.id} project={project} index={index} />
      })}
    </div>
  )
}


export default Projects
