import React from 'react'
import { WebHeader } from '../../../components/web/Header/WebHeader'
import { Footer } from '../../../components/web/Footer/Footer'
import { NewsCard } from './NewsCard'
import { NewsHero } from './NewsHero'

export const News = () => {
  return (
    <div>
        <WebHeader/>
        <NewsHero/>
        <NewsCard/>
        <Footer/>
    </div>
  )
}
