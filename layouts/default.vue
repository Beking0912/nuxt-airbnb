<template>
    <div class="app">
        <header class="app-logo">
            <div class="app-logo">
                <img src="/images/logo.svg" />
            </div>
            <div class="app-search">
                <input type="text" ref="citySearch" @changed="changed" placeholder="enter your address" />
                <input type="text" class="datepicker" placeholder="check in"/>
                <input type="text" class="datepicker" placeholder="check out"/>
                <button>
                    <img src="/images/icons/search.svg" />
                </button>
            </div>
            <div class="app-user-menu">
                <img src="/images/icons/house.svg" />
                <div class="name">host</div>
                <img src="/images/user.jpg" class="avatar" />
            </div>
        </header>
        <header style="background-color: #eee;">
            <nuxt-link to="/">Home</nuxt-link>
            <input type="text" ref="citySearch" @changed="changed" />
        </header>
        <nuxt/>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$maps.makeAutocomplete(this.$refs.citySearch);
    },
    methods: {
        test() {
            this.$store.dispatch('auth/counterUp')
        },
        changed(event) {
            const place = event.detail;
            if (!place.geometry) return

            this.$router.push({
                name: 'search',
                query: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    label: this.$ref.citySearch.value
                }
            })
        }
    }
}
</script>
