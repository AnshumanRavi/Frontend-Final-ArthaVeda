import React from 'react'

import Scroll from '../components/Scroll'
import Tiles from '../components/Tiles'
import AboutUS from '../components/AboutUS'
import SocialMedia from '../components/SocialMedia'
import Notice from '../components/Notice'
import NewSite from '../components/NewSite'
const HomePage = () => {
  return (
    <>
    <Scroll />
    <NewSite />
    
    <Notice />
    <Tiles />
    <AboutUS />
    <SocialMedia />


    </>
  )
}

export default HomePage