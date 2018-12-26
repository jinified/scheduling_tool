import appConfig from './app';

export default {
    AWS_REGION: 'ap-southeast-1',
    cognito: {
        REGION: 'ap-southeast-1',
        USER_POOL_ID: 'ap-southeast-1_s3NQJlkqf',
        IDENTITY_POOL_ID: 'ap-southeast-1:3f8b6c71-ac11-49d7-854f-7ca76309c9ed',
        APP_CLIENT_ID: '549v9710l5hdbqqnjhokpods0t',
        COOKIE_EXP_DURATION: 30,
        COOKIE_DOMAIN: `.${appConfig.DOMAIN}`
    }
};
