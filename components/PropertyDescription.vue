<template>
    <div class="app-background-grey">
        <div class="app-wrapper">
            <div class="app-double-column">
                <div class="app-padded-vertical">
                    <h2 class="app-subtitle">description</h2>
                    <div class="app-description">
                        {{ home.description }}
                </div>
                <div class="app-padded-vertical">
                    <div v-for="(feature, index) in home.feature" :key="index" class="app-tag">
                        {{ feature }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default defineComponent({
    props: {
        home: {
            type: Object,
            required: true,
        },
        }
    }
})
</script>
