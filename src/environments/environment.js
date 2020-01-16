const env = process.env.NODE_ENV;
const app_mode = env ? env.trim() : "development";
console.log("env", env, process.env)

const environment = {
    development: {
        base_url: 'http://localhost:9000',
        base_url_front: 'https://chattang.herokuapp.com'
    },
    production: {
        base_url: 'https://agile-reef-92956.herokuapp.com',
        base_url_front: 'https://chattang.herokuapp.com'
    }

}

export const APP_ENVIRONMENT = environment[app_mode];

//base url => https://aqueous-thicket-45068.herokuapp.com