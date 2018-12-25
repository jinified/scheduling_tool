import appConfig from './app';

module.exports = {
    cognito: {
        REGION: 'ap-southeast-1',
        USER_POOL_ID: 'ap-southeast-1_s3NQJlkqf',
        APP_CLIENT_ID: 'astro-tap-portal.s3-website-ap-southeast-1.amazonaws.com',
        COOKIE_EXP_DURATION: 30,
        COOKIE_DOMAIN: `.${appConfig.DOMAIN}`
    }
}
