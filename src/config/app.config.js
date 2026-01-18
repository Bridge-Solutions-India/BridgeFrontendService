export const APP_CONFIG = {
    socials: {
        instagram: "https://www.instagram.com/bridgesolutions.in?igsh=OG1mbmlhdjRxem05",
        linkedIn: "https://www.linkedin.com/company/bridge-solutionsagency/?viewAsMember=true",
        twitter: "https://x.com/BridgeSolution_",
    },

    application: {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        contactFormAPIKey: import.meta.env.VITE_BRIDGE_CONTACTFORM_API_KEY
    },

    apiRoutes:{
        contactRegisterRoute: "/bridgecontactform/register"
    },
    calendly:{
        meeting: "https://calendly.com/contactbridgesolutions/new-meeting"
    }
};
