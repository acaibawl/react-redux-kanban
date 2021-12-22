import React from 'react'
import styled from 'styled-components'
import * as color from './color'
import { CheckIcon, CheckIcon as _CheckIcon, TrashIcon } from './icon'

export const Card = ({ text }: { text?: string}) => {
  return(
    <Container>
      <CheckIcon />
      
      {text?.split(/(https?:\/\/\S+)/g).map((flagment, i) => 
        i % 2 === 0 ? (
          <Text key={i}>{flagment}</Text>
        ) : (
          <Link key={i} href={flagment}>
            {flagment}
          </Link>
        ),
      )}

      <DeleteButton />
    </Container>
  )
}

const Container = styled.div.attrs({
  draggable: true,
})`
 position: relative;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
  padding: 8px 32px;
  background-color: ${color.White};
  cursor: move;
`

const DeleteButton = styled.button.attrs({
  type: 'button',
  children: <TrashIcon />,
})`
    position: absolute;
  top: 12px;
  right: 8px;
  font-size: 14px;
  color: ${color.Gray};

  ::hover {
    color: ${color.Red};
  }
`

const Text = styled.span`
  color: ${color.Black};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
 color: ${color.Blue};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`
