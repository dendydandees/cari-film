module.exports = {
  mode: 'jit',
  important: true,
  purge: [],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.yellow.600'),
              textDecoration: 'none',
              fontWeight: '700',
              '&:hover': {
                color: theme('colors.yellow-700'),
                textDecoration: 'underline',
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
