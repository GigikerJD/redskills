import { defineStore } from "pinia";
import Cookies from "universal-cookie";
import router from "./router";

const cookies = new Cookies();

export const useAppStore = defineStore('appStore', {
    state: () => {
        const userID_cookie: string | undefined = cookies.get('userID') || '';
        const isLogged_cookie: boolean | undefined = cookies.get('isLogged') || false;
        return {
            userID: userID_cookie,
            isLogged: isLogged_cookie
        }
    },
    getters: {
        getUserID: (state): string | undefined => state.userID,
        getIsLogged: (state): boolean | undefined => state.isLogged
    },
    actions: {
        login(user_id: string): void {
            cookies.set("userID", user_id, {
                path: '/',
                domain: 'localhost',
                secure: false,
                httpOnly: false
            });
            cookies.set("isLogged", true, { 
                path: '/',
                domain: 'localhost',
                secure: false,
                httpOnly: false
            });
            this.userID = user_id;
            this.isLogged = true;
            setTimeout(() => { router.push('/dashboard') }, 500);
        },
        logout(): void {
            cookies.remove('userID');
            cookies.remove('isLogged');
            this.userID = '';
            this.isLogged = false;
            setTimeout(() => { router.push('/') }, 500);
        },
    }
})