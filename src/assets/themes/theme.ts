import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';
import { colors } from '../../styles/colors';

const mainFont = 'Rubik, sans-serif';

export default createTheme({
  palette: {
    primary: {
      main: colors.red,
    },
    secondary: {
      main: colors.red,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: colors.white,
    },
  },
  typography: {
    fontFamily: '"Rubik", sans-serif',
  },
  overrides: {
    MuiInputBase: {
      root: {
        height: '100%',
        borderRadius: 6,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        '&.Mui-focused > .MuiInputBase-input': {
          background: colors.white,
          color: colors.black,
          border: `3px solid ${colors.red}`,
        },
        '&.Mui-focused.Mui-error > .MuiInputBase-input': {
          color: colors.red,
        },
        '&.Mui-focused > .MuiInputAdornment-positionStart': {
          borderColor: colors.white,
        },
      },
      input: {
        border: `3px solid ${colors.red}`,
        boxSizing: 'border-box',
        fontSize: 18,
        borderRadius: 30,
        height: 55,
        minWidth: 144,
        display: 'flex',
        alignItems: 'center',
        // color: colors.red,
        fontFamily: mainFont,
        background: colors.white,
        paddingLeft: 10,
        boxShadow: 'none',
        WebkitAppearance: 'none',
      },
    },
    MuiInput: {
      underline: {
        '&:before, &:after': {
          content: 'none',
        },
      },
    },
    MuiInputLabel: {
      formControl: {
        transform: 'translate(15px, 20px) scale(1)',
        textTransform: 'capitalize',
        zIndex: 1,
        fontSize: 14,
      },
      root: {
        '&.Mui-focused:not(.Mui-error)': {
          color: colors.black,
        },
        '&.Mui-focused:not(.Mui-error) + .MuiInputBase-root > .MuiInputBase-input': {
          border: `1px solid ${colors.white}`,
        },
        '& + .MuiInput-formControl': {
          marginTop: 0,
        },
      },
      shrink: {
        transform: 'translate(0, -18px) scale(.75)',
      },
    },
  },
});
