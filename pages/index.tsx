import type { NextPage } from 'next'
import { Grid, GridItem, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import FooterForm from '../components/FooterForm'
import BodyForm from '../components/BodyForm'
import TemplateMessagePreview from '../components/TemplateMessagePreview'
import { PreviewComponent, SectionHeading, SectionSubtitle } from '../components/LogiclessComponents'
import HeaderForm from '../components/HeaderForm'
import ButtonsForm from '../components/ButtonsForm'
import SampleForm from '../components/SampleForm'

/**
 * Home
 * 
 * Home component will be focus on the structure rather than the logic
 */
const Home: NextPage = () => {
  return (
    <div className="p-3 h-screen bg-gray-100 flex flex-col gap-2 font-sans antialiased text-gray-500">
      <div className="flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2 font-semibold text-black">
        WhatsApp Template Message Playground
      </div>
      <div className="grid md:grid-cols-12 gap-3 grid-cols-1 text-sm" style={{ height: 'calc(100vh - 72px)' }}>
        <div className="col-span-2 border-solid border-1 shadow-sm rounded-sm bg-white md:h-full p-2">
          <SectionHeading title="Template Examples" className="mb-2" />
          
          <div className="rounded-sm bg-white p-1 pl-2 hover:bg-gray-100 cursor-pointer">Testing</div>
        </div>
        <div className="col-span-7 flex flex-col md:h-full gap-1 overflow-auto">
          
          <div className="flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Header (optional)" />
            <SectionSubtitle subtitle="Choose which type of media you'll use for this header" />

            <HeaderForm />
          </div>
          <div className="flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Body" />
            <SectionSubtitle subtitle="Enter the text for your message. Parameter format: {{1}}, {{2}}, and so on." />

            <BodyForm />
          </div>
          <div className="flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Footer (optional)" />
            <SectionSubtitle subtitle="Add a short line of text to the bottom of your message. Max: 60 chars." />

            <FooterForm />
          </div>
          <div className="border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Buttons (optional)" />
            <SectionSubtitle subtitle="Create buttons that let customers respond to your message. Available: 'Call to action' and 'Quick Reply' button." />

            <ButtonsForm />
          </div>
          <div className="border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Input Sample Parameter" />
            <SectionSubtitle subtitle="Add header and body parameter sample of your template message. See the preview on the right." />

            <SampleForm />
          </div>
          
        </div>
        <div className="col-span-3 flex flex-col md:h-full gap-3">
          <PreviewComponent>
            <SectionHeading title="Preview" />
            <SectionSubtitle subtitle="Edit template message and input parameter on the left" />

            <div className="md:px-8 2xl:px-16">
              <TemplateMessagePreview />
            </div>
          </PreviewComponent>
        </div>
      </div>
    </div>
  )
}

export default Home