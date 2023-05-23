import getApis from './apis'
import userRouter from './routers/user';

export default function () {
    const algoliaConfig = this.options.privateRuntimeConfig.algolia;
    const apis = getApis(algoliaConfig);

    this.nuxt.hook('render:setupMiddleware', (app) => {
        app.use('/api/user', userRouter(apis))
    })
}