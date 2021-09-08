import { FC } from 'react'
import styled from 'styled-components'

export const SectionHeading: FC<{ title: string } & React.HTMLAttributes<HTMLHeadingElement>> = ({ title, className, ...props }) => <h2 className={`font-semibold text-black ${className}`} {...props}>{title}</h2>

export const SectionSubtitle: FC<{ subtitle: string }> = ({ subtitle }) => <p className="text-xs mb-2 text-gray-500">{subtitle}</p>

export const PreviewComponent: FC = ({ children }) => {
  const PreviewComponentContainer = styled.div`
    &::after {
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