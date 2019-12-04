const env = process.env.NODE_ENV;
const app_mode = env ? env.trim() : "development";
console.log("env", env, process.env)

const environment = {
    development: {
        base_url: 'https://agile-reef-92956.herokuapp.com',
    },
    production: {
        base_url: 'https://agile-reef-92956.herokuapp.com'
    }

}

export const APP_ENVIRONMENT = environment[app_mode];