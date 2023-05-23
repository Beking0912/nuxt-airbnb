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
                client_id: $config.auth.clientId,
            });

            auth2.currentUser.listen(parseUser);
        });

        window.gapi.signin2.render('googleButton', {
            onsuccess: parseUser
        })
    }

    function parseUser(user) {
        const profile = user.getBasicProfile();
        console.log('name:', profile.getName());
        if (!user.isSignedOut()) {
            Cookie.remove($config.auth.cookieName);
            return
        }
        const idToken = user.getAuthResponse().id_token;
        Cookies.set($config.auth.cookieName, idToken, { expires: 1/24, sameSite: 'Lax' });
    }

    function signOut() {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut();
    }
}