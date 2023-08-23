import React, { FC } from 'react'
import { Input, InputProps, makeStyles } from '@material-ui/core'
import { colors } from '../../styles'
import cx from 'classnames'

interface Props extends InputProps {
  startIcon?: Node;
  helperText?: string;
}

export const FormInput: FC<Props> = ({ startIcon, className, style, inputProps, error, helperText, ...props }) => {
  const classes = useClasses()
  return (
    <Input
      className={cx(classes.container, error && classes.containerError, className)}
      startAdornment={startIcon}
      error={error}
      {...props}
    />
  )
}

const useClasses = makeStyles({
  container: {
    width: 160,
    '& input::placeholder': {
      fontSize: '16px',
      color: colors.grey,
      opacity: 1,
    },
  },
  containerError: {
    '& input::placeholder': {
      color: colors.red,
    },
  },
})

export type FormInputProps = Props;
export default FormInput
