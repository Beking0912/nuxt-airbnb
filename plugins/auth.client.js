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
        });

        window.gapi.signin2.render('googleButton')
    }
}