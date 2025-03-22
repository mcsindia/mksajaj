import React from 'react'
import { WebHeader } from '../../../components/web/Header/WebHeader'
import { Footer } from '../../../components/web/Footer/Footer'
import { AboutUsHero } from './AboutUsHero'
import { MissionVision } from './MissionVission'
import { WhatWeDo } from './WhatWeDo'

export const AboutUs = () => {
  return (
    <div>
        <WebHeader/>
        <AboutUsHero/>
        <WhatWeDo/>
        <MissionVision/>
        <Footer/>
    </div>
  )
}
