
const baseUrl = 'http://localhost:4200';

export const environment = {
  basePath: '',
  cultureBasePath:'',
  caching: false,
  production: false,
  streamMessages: false,
  application: {
    baseUrl,
    name: 'nove',
    logoUrl: '',
  },
  apis: {
    default: {
      url: 'https://localhost:44374',
      rootNamespace: 'nove',
    },
  },
  logoconfig: {
    resizeToWidth: 200,
  },
  nonProduction:false,
} ;