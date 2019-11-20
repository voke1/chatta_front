const env = process.env.NODE_ENV;
const app_mode = env ? env.trim() : "development";


const environment = {
    development: {
        base_url: 'http://localhost:9000',
    },
    production: {
        base_url: 'http://localhost:9000'
    }

}

export const APP_ENVIRONMENT = environment[app_mode];