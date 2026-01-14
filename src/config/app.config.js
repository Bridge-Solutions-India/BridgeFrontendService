const isProd = import.meta.env.PROD;

export const APP_CONFIG = {
    // appName: "Bridge Frontend Service",
    //
    // urls: {
    //     website: "https://bridgesolutions.com",
    //     github: "https://bridge-solutions-india.github.io/BridgeFrontendService/",
    //     docs: "https://docs.bridgesolutions.com",
    // },

    socials:{
        instagram: "https://www.instagram.com/bridgesolutions.in?igsh=OG1mbmlhdjRxem05",
        linkedIn: "https://www.linkedin.com/company/bridge-solutionsagency/?viewAsMember=true",
        twitter: "https://x.com/BridgeSolution_",
    },

    // api: {
    //     baseUrl: isProd
    //         ? "https://api.bridgesolutions.com"
    //         : "http://localhost:3000",
    // },
    //
    basePath: isProd ? "/bridgefrontendservice" : "",
};
