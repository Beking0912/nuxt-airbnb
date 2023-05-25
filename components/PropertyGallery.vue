<template>
    <div class="app-section">
        <div class="app-wrapper">
            <div class="app-masonry">
                <div
                    v-for="image in images"
                    :key="image"
                    :style="`background-image: url(${getImageUrl(publicId)})`">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    methods: {
        getImageUrl(publicId) {
            return this.$img(publicId, {
                width: 600,
            }, {
                provider: 'cloudinary',
            })
        }
    }
}
</script>