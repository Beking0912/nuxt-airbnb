import Cookie from 'js-cookie';
import { unWrap } from '../utils/fetchUtils';

export default ({ $config }) => {
    window.initAuth = init;
    addScript();

    function addScript() {
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "https://apis.googleapis.com/js/platform.js?onload=initAuth";
        window.initGoogleMaps = initGoogleMaps;
        document.head.appendChild(script);
    }

    function init() {
        window.gapi.load('auth2', async () => {
            const auth2 = await window.gapi.auth2.init({
                client_id: $config.public.auth.clientId,
            });

            auth2.currentUser.listen(parseUser);
        });

        window.gapi.signin2.render('googleButton', {
            onsuccess: parseUser
        })
    }

    async function parseUser(user) {
        if (!user.isSignedIn()) {
            Cookie.remove($config.public.auth.cookieName);
            StorageEvent.commit('auth/user', null)
            return
        }

        const idToken = user.getAuthResponse().id_token;
        Cookies.set($config.public.auth.cookieName, idToken, { expires: 1/24, sameSite: 'Lax' });

        try {
            const response = await unWrap(await fetch('/api/user'))
            const user = response.json

            store.commit('auth/user', {
                fullName: user.name,
                profileUrl: user.image,
            });
        } catch (error) {
            throw new Error('Unable to fetch user data')
        }
        
    }

    function signOut() {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut();
    }
}