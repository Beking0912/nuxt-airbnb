<template>
    <div class="p-4">
        Admin
        <nuxt-child></nuxt-child>
    </div>
</template>
<script>
import Cookies from 'js-cookie'

export default {
    asyncData({ $config, redirect }) {
        if (!Cookies.get($config.auth.cookieName)) {
            redirect('/no-access/')
            return
        }
    }
}
</script>
