
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: [
        'Inter var',
        'Noto Sans Thai'
      ],
    },
    extend: {
      screens: {
        'hover-hover': {'raw': '(hover: hover)'},
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({addBase, addComponents, theme, variants, addUtilities}) {
      addBase([
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'normal',
            fontNamedInstance: 'Regular',
            fontDisplay: 'swap',
            src: 'url("/assets/fonts/Inter-roman.var.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'italic',
            fontNamedInstance: 'Italic',
            fontDisplay: 'swap',
            src: 'url("/assets/fonts/Inter-italic.var.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai"), local("NotoSansThai"), url("/assets/fonts/NotoSansThai-Regular.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '900',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai Black"), local("NotoSansThai-Black"), url("/assets/fonts/NotoSansThai-Black.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '500',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai Medium"), local("NotoSansThai-Medium"), url("/assets/fonts/NotoSansThai-Medium.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '600',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai SemiBold"), local("NotoSansThai-SemiBold"), url("/assets/fonts/NotoSansThai-SemiBold.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '700',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai Bold"), local("NotoSansThai-Bold"), url("/assets/fonts/NotoSansThai-Bold.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '800',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai ExtraBold"), local("NotoSansThai-ExtraBold"), url("/assets/fonts/NotoSansThai-ExtraBold.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '100',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai Thin"), local("NotoSansThai-Thin"), url("/assets/fonts/NotoSansThai-Thin.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '200',
            fontDisplay: 'swap',
            src:
                'local("Noto Sans Thai ExtraLight"), local("NotoSansThai-ExtraLight"), url("/assets/fonts/NotoSansThai-ExtraLight.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '300',
            fontDisplay: 'swap',
            src: 'local("Noto Sans Thai Light"), local("NotoSansThai-Light"), url("/assets/fonts/NotoSansThai-Light.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Sukhumvit Set',
            fontDisplay: 'swap',
            src: "local('Sukhumvit Set')",
            unicodeRange: 'U+0E01-0E5B, U+200C-200D, U+25CC',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Bai Jamjuree',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src: 'local("Bai Jamjuree"), local("BaiJamjuree"), url("/assets/fonts/BaiJamjuree-Regular.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'TH Sarabun New',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src: 'local("TH Sarabun New"), local("THSarabunNew"), url("/assets/fonts/THSarabunNew.woff2") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'TH Sarabun New',
            fontStyle: 'normal',
            fontWeight: '600',
            fontDisplay: 'swap',
            src: 'local("TH Sarabun New Bold"), local("THSarabunNew-Bold"), url("/assets/fonts/THSarabunNew-Bold.woff2") format("woff2")',
          },
        },
      ])
    },
    require('@tailwindcss/forms'),
  ],
}
