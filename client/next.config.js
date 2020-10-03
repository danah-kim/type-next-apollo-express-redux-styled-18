const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
    const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

    console.log(`isDev:${isDev}   isProd:${isProd}   isStaging:${isStaging}`);

    return {
        env: {
            API_HOST: (() => {
                if (isDev) return 'http://localhost:4000/graphql';
                // if (isStaging) return 'http://localhost:4000/graphql';
                // if (isProd) return 'http://localhost:4000/graphql';
                return 'API_HOST:not (isDev,isProd && !isStaging,isProd && isStaging)';
            })(),
        },
    };
};
