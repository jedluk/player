type Theme = {
  '--ultra-light-grey': string
  '--light-grey': string
  '--dark-grey': string
}

const greyTheme: Theme = {
  '--dark-grey': '#545454',
  '--light-grey': '#d3d3d3',
  '--ultra-light-grey': '#f0f0f0',
}

const lightTheme: Theme = {
  '--dark-grey': ' #6200EE',
  '--light-grey': '#03DAC6',
  '--ultra-light-grey': '#018786',
}

const randomTheme: Theme = {
  '--dark-grey': ' #0097A7',
  '--light-grey': '#FFC107',
  '--ultra-light-grey': '#B2EBF2',
}

export type ThemeMap = {
  light: Theme
  dark: Theme
  random: Theme
}

export const themeMap = {
  light: lightTheme,
  dark: greyTheme,
  random: randomTheme,
}
