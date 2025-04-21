import { extendTheme } from '@chakra-ui/react';

const colors = {
  primary: '#00798e',
  secondary: '#0178a5',
  tertiary: '#511E62',
  baseBlack: '#000000',
  darkGrey1: '#333333',
  darkGrey2: '#58595B',
  darkGrey3: '#511E62',
  lightGrey1: '#979797',
  lightGrey2: '#CCCCCC',
  lightGrey3: '#DDDDDD',
  lightGrey4: '#E0E0E0',
  lightGrey5: '#F8f8f8',
  baseWhite: '#FFFFFF',
  alert: '#D73D00',
  error: '#d90941',
  info: '#007fab',
  success: '#1C8754',
  accessible: '#007FAB',
  tooltipAlert: '#FEEFD9',
  tooltipError: '#FBE6EC',
  tooltipInfo: '#e5f2f6',
  tooltipSuccess: '#E8F3ED'
};

const fonts = {
  body: 'Proxima Nova Sans, helvetica, arial, sans-serif',
  heading: 'Proxima Nova Sans, helvetica, arial, sans-serif',
};

const fontSizes = {
  '3xs': '0.45rem',
  '2xs': '0.625rem',
  'xs': '13px',
  'sm': '14px',
  'md': '16px',
  'lg': '18px',
  'xl': '20px',
  '2xl': '23px',
  '3xl': '26px',
  '4xl': '36px',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'base',
    },
    variants: {
      primary: {
        bg: 'primary',
        color: 'white',
        _hover: {
          bg: 'btnPrimaryHoverBg',
          _disabled: {
            bg: 'primary',
          },
        },
        _focus: {
          boxShadow: '0 0 0 3px var(--chakra-colors-btnPrimaryFocusBoxShadow)',
        },
      },
      secondary: {
        bg: 'secondary',
        color: 'white',
        _hover: {
          bg: 'btnSecondaryHoverBg',
          _disabled: {
            bg: 'secondary',
          },
        },
        _focus: {
          boxShadow: '0 0 0 3px var(--chakra-colors-btnSecondaryFocusBoxShadow)',
        },
      },
    },
    defaultProps: {
      variant: 'primary',
    },
  },
  Input: {
    variants: {
      outline: {
        field: {
          background: 'white',
          border: '1px solid',
          borderColor: 'lightGrey3',
          _hover: {
            borderColor: 'lightGrey1',
          },
          _focus: {
            borderColor: 'primary',
            boxShadow: '0 0 0 1px var(--chakra-colors-primary)',
          },
          _invalid: {
            borderColor: 'error',
            boxShadow: '0 0 0 1px var(--chakra-colors-error)',
          },
        },
      },
    },
    defaultProps: {
      variant: 'outline',
    },
  },
  Select: {
    variants: {
      outline: {
        field: {
          background: 'white',
          border: '1px solid',
          borderColor: 'lightGrey3',
          _hover: {
            borderColor: 'lightGrey1',
          },
          _focus: {
            borderColor: 'primary',
            boxShadow: '0 0 0 1px var(--chakra-colors-primary)',
          },
          _invalid: {
            borderColor: 'error',
            boxShadow: '0 0 0 1px var(--chakra-colors-error)',
          },
        },
      },
    },
    defaultProps: {
      variant: 'outline',
    },
  },
  FormLabel: {
    baseStyle: {
      fontSize: 'sm',
      fontWeight: 'medium',
      marginBottom: '2',
    },
  },
  FormError: {
    baseStyle: {
      text: {
        fontSize: 'xs',
        color: 'error',
        marginTop: '1',
      },
    },
  },
};

const space = {
  xs: '4px',
  sm: '8px',
  xmd: '12px',
  md: '16px',
  xlg: '20px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '48px',
  '4xl': '56px',
  '5xl': '64px',
};

const radii = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

export const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  components,
  space,
  radii,
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'darkGrey1',
      },
    },
  },
});

export default theme;