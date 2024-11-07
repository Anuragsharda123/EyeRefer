interface config{
    BASE_URL: string;
    CREATE_USER: string;
    VERIFY_USER: string;
    LOGIN_USER: string;
    GET_USER: string;
    GET_MD_LIST: string;
    
}

export const Local:config = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    CREATE_USER: import.meta.env.VITE_CREATE_USER,
    VERIFY_USER: import.meta.env.VITE_VERIFY_USER,
    LOGIN_USER: import.meta.env.VITE_LOGIN_USER,
    GET_USER: import.meta.env.VITE_GET_USER,
    GET_MD_LIST: import.meta.env.VITE_GET_MD_LIST
}