export const APP_ROUTES = {
    login: "/auth/login",
    register: "/auth/register",
    dashbaord: "/dashboard",
    agents: "/dashboard/agents",
    meetings: "/dashboard/meetings",
    upgrade: "/upgrade"
};

export const AUTH_ROUTES = [ 
    APP_ROUTES.login,
    APP_ROUTES.register
 ] as const;

export const PRIVATE_ROUTES = [
    APP_ROUTES.dashbaord,
    APP_ROUTES.agents,
    APP_ROUTES.meetings,
    APP_ROUTES.upgrade
 ] as const;