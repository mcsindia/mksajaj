import React from 'react'
import { WebHeader } from '../../../components/web/Header/WebHeader'
import { Footer } from '../../../components/web/Footer/Footer'
import { EventsHero } from './EventsHero'
import { EventsCard } from './EventsCard'

export const Events = () => {
  return (
    <div>
        <WebHeader/>
        <EventsHero/>
        <EventsCard/>
        <Footer/>
    </div>
  )
}
