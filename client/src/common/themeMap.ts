export type Theme = {
  '--dark-primary-color': string
  '--accent-color': string
  '--light-primary-color': string
}

const theme1: Theme = {
  '--light-primary-color': '#CFD8DC',
  '--accent-color': '#9E9E9E',
  '--dark-primary-color': '#455A64',
}

const theme2: Theme = {
  '--light-primary-color': '#018786',
  '--accent-color': '#03DAC6',
  '--dark-primary-color': '#6200EE',
}

const theme3: Theme = {
  '--light-primary-color': '#B2EBF2',
  '--accent-color': '#FFC107',
  '--dark-primary-color': '#0097A7',
}

const theme4: Theme = {
  '--light-primary-color': '#F0F4C3',
  '--accent-color': '#536DFE',
  '--dark-primary-color': '#AFB42B',
}

const theme5: Theme = {
  '--light-primary-color': '#D1C4E9',
  '--accent-color': '#FF5722',
  '--dark-primary-color': '#512DA8',
}

const theme6: Theme = {
  '--light-primary-color': '#B2EBF2',
  '--accent-color': '#FF9800',
  '--dark-primary-color': '#0097A7',
}

export const themeMap = {
  theme1,
  theme2,
  theme3,
  theme4,
  theme5,
  theme6,
}

export type ThemeMap = typeof themeMap
