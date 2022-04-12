import NextI18Next from 'next-i18next'

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'no',
    shallowRender: true,
    otherLanguages: ['en'],
    localeSubpaths: {
        no: 'no',
        en: 'en'
    },
    ignoreRoutes: [
        '/_next',
        '/static/',
        '/public/',
        '/api/',
        '/service-worker.js'
    ]
})

export const {
  appWithTranslation,
  Link,
  Trans,
  config,
  withTranslation,
  i18n,
  useTranslation,
  Router
} = NextI18NextInstance

export { NextI18NextInstance as i18nInstance };