import React, { useState } from 'react'
import './UserProfileDetails.css'
import {  useSelector } from 'react-redux'
import {AnimatePresence, motion} from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa6'
import { menu, signOutAction } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { slideUpOut } from '..'

const UserProfileDetails = () => {
    const user = useSelector((state)=> state.user?.user);
    // console.log(menu);
    // console.log(user);
    const[isMenu, setIsMenu] = useState(false)

    // const slideUpOut =() =>{
    //     initial: {opacity: 0, y: 50},
    //     animate: opaticy
    // }

  return (
    <div className='UserProfileDetails_container'>
        <div className="box">
            {user.photoURL ? (
                <>
                <motion.img whileHover={{scale:1.2}} src={user.photoURL} alt={user.displayName} referrerPolicy='no-referrer' className='hover_img' />
                </>
            ):(
                <>
                <p className='UserProfileDetails_para'>{user.email[0]}</p>
                </>
            )
        }
        </div>


        <motion.div onClick={()=> setIsMenu(!isMenu)} className='dropArrow' whileTap={{scale:0.9}}>
            <FaChevronDown className='arrow' />
        </motion.div>

        <AnimatePresence>
            {isMenu && (
                <motion.div {...slideUpOut} className='down_section'>
                {
                    menu && menu.map((val)=> <Link to={val.url} key={val.id} className='userLink'>{val.name}</Link>)
                }
    
                <motion.p onClick={signOutAction} className='userSignout' whileTap={{scale:0.9}}>Sign Out</motion.p>
    
            </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default UserProfileDetails
