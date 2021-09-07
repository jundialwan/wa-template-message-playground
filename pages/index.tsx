import type { NextPage } from 'next'
import { Grid, GridItem, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(' ')
}

const bodyTextAtom = atom({
  key: 'bodyText',
  default: ''
})

const footerTextAtom = atom({
  key: 'footerText',
  default: '',
})

const bodyTextLengthSelector = selector({
  key: 'bodyTextLengthSelector',
  get: ({ get }) => {
    const bodyText = get(bodyTextAtom)

    return bodyText.trim().replace(/{{[0]}}/, '_____').replace(/{{[0-9]+}}/g, '_').length
  }
})

const normalizedBodyTextSelector = selector({
  key: 'normalizedBodyTextSelector',
  get: ({ get }) => {
    const footerText = get(bodyTextAtom)

    return footerText.trim().replace(/[\r\n|\r|\n]{3,}/g, '\n\n')
  }
})

const normalizedFooterTextSelector = selector({
  key: 'normalizedFooterTextSelector',
  get: ({ get }) => {
    const footerText = get(footerTextAtom)

    return footerText.trim().replace(/[\s]{2,}/g, ' ')
  }
})

const footerTextLengthSelector = selector({
  key: 'footerTextLengthSelector',
  get: ({ get }) => {
    const footerText = get(footerTextAtom)

    return footerText.trim().replace(/[\s]{2,}/g, ' ').length
  }
})

const Home: NextPage = () => {
  const [headerType, setHeaderType] = useState<string>('none')
  const onHeaderTypeChange = (e: any) => setHeaderType(e.target.value)

  const [buttonType, setButtonType] = useState<string>('none')
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
              <RadioButtonItem isChecked={headerType === 'none'} value="none" id="none" label="None" onChange={onHeaderTypeChange} />
              <RadioButtonItem isChecked={headerType === 'text'} value="text" id="text" label="Text" onChange={onHeaderTypeChange} />
              <RadioButtonItem isChecked={headerType === 'image'} value="image" id="image" label="Image" onChange={onHeaderTypeChange} />
              <RadioButtonItem isChecked={headerType === 'video'} value="video" id="video" label="Video" onChange={onHeaderTypeChange} />
              <RadioButtonItem isChecked={headerType === 'doc'} value="doc" id="doc" label="Document" onChange={onHeaderTypeChange} />
            </div>
          </div>
          <div className="flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Body" />
            <SectionSubtitle subtitle="Enter the text for your message. Parameter format: {{1}}, {{2}}, and so on." />
            <BodyTextarea />
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
              <RadioButtonItem isChecked={buttonType === 'none'} value="none" id="none" label="None" onChange={onButtonTypeChange} />
              <RadioButtonItem isChecked={buttonType === 'cta'} value="cta" id="cta" label="Call to Action" onChange={onButtonTypeChange} />
              <RadioButtonItem isChecked={buttonType === 'reply'} value="reply" id="reply" label="Quick Reply" onChange={onButtonTypeChange} />
            </div>
          </div>
          <div className="border-solid border-1 shadow-sm rounded-sm bg-white p-2">
            <SectionHeading title="Input Parameter" />
            <SectionSubtitle subtitle="Add header and body parameter sample of your template message. See the preview on the right." />

          </div>
          
        </div>
        <div className="col-span-2 flex flex-col md:h-full gap-3">
          <PreviewComponent>
            <SectionHeading title="Preview" />
            <SectionSubtitle subtitle="Edit template message and input parameter on the left" />

            <TemplateMessageVisual />
          </PreviewComponent>
        </div>
      </div>
    </div>
  )
}

export default Home

const SectionHeading: FC<{ title: string } & React.HTMLAttributes<HTMLHeadingElement>> = ({ title, className, ...props }) => <h2 className={`font-semibold text-black ${className}`} {...props}>{title}</h2>

const SectionSubtitle: FC<{ subtitle: string }> = ({ subtitle }) => <p className="text-xs mb-2 text-gray-500">{subtitle}</p>

const RadioButtonItem: FC<{ label: string, isChecked?: boolean } & React.InputHTMLAttributes<HTMLInputElement>> = ({ label, isChecked, ...inputProps }) => {
  const cn = classNames(
    'flex flex-row items-center mr-2 gap-1 hover:bg-green-50 hover:text-green-700 p-1 px-2 rounded cursor-pointer',
    isChecked ? 'bg-green-50 text-green-700' : ''
  )

  return (
    <div className={cn}>
      <input className="cursor-pointer" type="radio" {...inputProps} checked={isChecked} />
      <label className="cursor-pointer" htmlFor={inputProps.id}>{label}</label>
    </div>
  )
}

const PreviewComponent: FC = ({ children }) => {
  const PreviewComponentContainer = styled.div`
    &:after {
      background: url("/bcg-wa.png");
      background-size: contain;
      content: '';
      height: 100%;
      width: 100%;
      position: absolute;
      opacity: 0.1;
      top: 0;
      z-index: -1;
    }

    & {
      z-index: 0;
    }

    & > * {
      z-index: 100;
    }
  `
  return (
    <PreviewComponentContainer className="relative flex-auto border-solid border-1 shadow-sm rounded-sm bg-[#e5ddd5]">
      <div className="relative p-2 h-full">
        {children}
      </div>
    </PreviewComponentContainer>
  )
}

const TemplateMessageVisual: FC = () => {
  const bodyText = useRecoilValue(normalizedBodyTextSelector)
  const footerText = useRecoilValue(normalizedFooterTextSelector)

  console.log(bodyText)

  return (
    <div className="w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-2 py-1 text-black font-normal font-sans">
      <div className="whitespace-pre-line	">{bodyText}</div>
      <span className="text-gray-600 text-xs">{footerText}</span>
      <div className="float-none text-right">
        <span className="text-gray-400 text-xs">10:10</span>
      </div>
    </div>
  )
}

const FooterInput: FC<{ value?: string }> = ({ value }) => {
  const [footerText, setFooterText] = useRecoilState(footerTextAtom)
  const footerTextLength = useRecoilValue(footerTextLengthSelector)
  // const [textLength, setTextLength] = useState<number>(0)
  // const [textValue, setTextValue] = useState<string>(value?.substring(0, 60) || '')

  const onTextChange = (e: any) => {
    // const textLength = e.target.value.trim().replace(/{{[0]}}/, '_____').replace(/{{[0-9]+}}/, '_').length
    // setTextLength(Math.min(textLength, 60))
    setFooterText(e.target.value.substring(0, 60))
  }

  return (
    <>
      <input
        type="text" name="footer" id="footer" value={footerText} onChange={onTextChange} 
        className="w-full border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600"
      />
      <span className="text-xs float-right">Char: {footerTextLength}/60</span>
    </>
  )
}

const BodyTextarea: FC<{ value?: string }> = ({ value }) => {
  const [bodyText, setBodyText] = useRecoilState(bodyTextAtom)
  const bodyTextLength = useRecoilValue(bodyTextLengthSelector)

  // const [textLength, setTextLength] = useState<number>(0)
  // const [textValue, setTextValue] = useState<string>(value?.substring(0, 1024) || '')

  const onTextChange = (e: any) => {
    // const textLength = e.target.value.trim().replace(/{{[0]}}/, '_____').replace(/{{[0-9]+}}/, '_').length
    // setTextLength(Math.min(textLength, 1024))
    setBodyText(e.target.value.substring(0, 1024))
  }

  return (
    <>
      <textarea
        value={bodyText} onChange={onTextChange} name="body" id="body"
        className="w-full min-h-[124px] max-h-[124px] p-2 rounded border text-xs text-black font-mono focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600"
      ></textarea>
      <span className="text-xs float-left rounded px-[4px] bg-gray-200 mr-1">Bold: *text*</span>
      <span className="text-xs float-left rounded px-[4px] bg-gray-200 mr-1">Italic: _text_</span>
      <span className="text-xs float-left rounded px-[4px] bg-gray-200 mr-1">Monospace: ```text```</span>
      <span className="text-xs float-right">Char: {bodyTextLength}/1024</span>
    </>
  )
}
