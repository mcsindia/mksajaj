import React from 'react'
import { WebHeader } from '../../../components/web/Header/WebHeader'
import { Footer } from '../../../components/web/Footer/Footer'
import { ContactUsHero } from './ContactUsHero'
import { ContactForm } from './ContactForm'

export const ContactUs = () => {
  return (
    <div>
        <WebHeader/>
        <ContactUsHero/>
        <ContactForm/>
        <Footer/>
    </div>
  )
}
