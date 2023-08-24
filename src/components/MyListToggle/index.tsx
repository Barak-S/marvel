import { IconButton, Tooltip } from '@material-ui/core';
import { ClassNameProps, StyleProps, colors } from '../../styles'
import React, { FC } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs';

interface Props extends StyleProps, ClassNameProps {
  disabled?: boolean;
  isActive: boolean;
  onClick: () => void;
  size?: number;
}

export const MyListToggle: FC<Props> = ({ disabled, isActive, onClick, size = 22,  style, className,}) => {
  return (
    <Tooltip placement="top" title={(disabled && !isActive) ? 'My list is full' : !isActive ? 'Add' : 'Remove'}>
      <IconButton>
        <BsFillBookmarkFill
          onClick={() => (disabled && !isActive) ? null : onClick()}
          size={size}
          color={isActive ? colors.red : colors.grey}
          style={{ opacity: (disabled && !isActive) ? 0.5 : 1, cursor: (disabled && !isActive) ? 'initial' : 'pointer' }}
        />
      </IconButton>
    </Tooltip>
  )
}