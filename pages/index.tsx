import type { NextPage } from 'next'
import { Grid, GridItem, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { bodyTextAtom, bodyTextLengthSelector, normalizedBodyTextSelector } from '../Recoil/bodyText'
import { footerTextAtom, footerTextLengthSelector, footerTextSelector, normalizedFooterTextSelector } from '../Recoil/footerText'
import RadioButtonItem from '../components/RadioButtonItem'
import FooterInput from '../components/FooterInput'
import BodyTextareaInput from '../components/BodyTextareaInput'
import TemplateMessagePreview from '../components/TemplateMessagePreview'
import { PreviewComponent, SectionHeading, SectionSubtitle } from '../components/LogiclessComponents'
import { headerTypeSelector } from '../Recoil/header'
import { buttonsTypeSelector } from '../Recoil/buttons'
import HeaderTextInput from '../components/HeaderTextInput'

const Home: NextPage = () => {
  const [headerType, setHeaderType] = useRecoilState(headerTypeSelector)
  const onHeaderTypeChange = (e: any) => setHeaderType(e.target.value)

  const [buttonType, setButtonType] = useRecoilState(buttonsTypeSelector)
  const onButtonTypeChange = (e: any) => setButtonType(e.target.value)
  

  return (
    <div className="p-3 h-screen bg-gray-100 flex flex-col gap-2 font-sans antialiased text-gray-500">
      <div className="flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2 font-semibold text-black">
        WhatsApp Template Message Playground
      </div>
      <div className="grid md:grid-cols-6 gap-3 grid-cols-1 h-full text-sm">
        <div className="col-span-1 border-solid border-1 shadow-sm rounded-sm bg-white md:h-full p-2">
          <SectionHeading title="Template Examples" className="mb-2" />
          
          <div className="rounded-sm bg-white p-1 pl-2 hover:bg-gray-100 cursor-pointer">Testing</div>
        </div>
        <div className="col-span-3 flex flex-col gap-1 overflow-auto">
          
          <div className="flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Header (optional)" />
            <SectionSubtitle subtitle="Choose which type of media you'll use for this header" />

            <div className="flex flex-row">
              <RadioButtonItem isChecked={headerType === 'none'} value="none" id="no-header" label="None" onClick={onHeaderTypeChange} />
              <RadioButtonItem isChecked={headerType === 'text'} value="text" id="text" label="Text" onClick={onHeaderTypeChange} />
              <RadioButtonItem isChecked={headerType === 'image'} value="image" id="image" label="Image" onClick={onHeaderTypeChange} />
              <RadioButtonItem isChecked={headerType === 'video'} value="video" id="video" label="Video" onClick={onHeaderTypeChange} />
              <RadioButtonItem isChecked={headerType === 'doc'} value="doc" id="doc" label="Document" onClick={onHeaderTypeChange} />
            </div>

            {headerType === 'text' ? <HeaderTextInput /> : null}
          </div>
          <div className="flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Body" />
            <SectionSubtitle subtitle="Enter the text for your message. Parameter format: {{1}}, {{2}}, and so on." />
            <BodyTextareaInput />
          </div>
          <div className="flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Footer (optional)" />
            <SectionSubtitle subtitle="Add a short line of text to the bottom of your message. Max: 60 chars." />
            <FooterInput />
          </div>
          <div className="border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Buttons (optional)" />
            <SectionSubtitle subtitle="Create buttons that let customers respond to your message. Available: 'Call to action' and 'Quick Reply' button." />

            <div className="flex flex-row">
              <RadioButtonItem isChecked={buttonType === 'none'} value="none" id="no-button" label="None" onChange={onButtonTypeChange} />
              <RadioButtonItem isChecked={buttonType === 'cta'} value="cta" id="cta" label="Call to Action" onChange={onButtonTypeChange} />
              <RadioButtonItem isChecked={buttonType === 'reply'} value="reply" id="reply" label="Quick Reply" onChange={onButtonTypeChange} />
            </div>
          </div>
          <div className="border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Input Sample Parameter" />
            <SectionSubtitle subtitle="Add header and body parameter sample of your template message. See the preview on the right." />

          </div>
          
        </div>
        <div className="col-span-2 flex flex-col md:h-full gap-3">
          <PreviewComponent>
            <SectionHeading title="Preview" />
            <SectionSubtitle subtitle="Edit template message and input parameter on the left" />

            <TemplateMessagePreview />
          </PreviewComponent>
        </div>
      </div>
    </div>
  )
}

export default Home