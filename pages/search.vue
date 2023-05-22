<template>
    <div>
        Results for {{ label }}<br/>
        <div style="height:800px; width:800px;float:right;" ref="map"></div>
        <div v-if="homes.length > 0">
            <nuxt-link v-for="home in homes" :key="home.objectID" to="`/home/${home.objectID}`"/>
            <HomeRow :home="home" @mouseover.native="highlightMarker(home.objectID, true)" @mouseout.native="highlightMarker(home.objectID, false)"/>
        </div>
        <div v-else> No homes found </div>
    </div>
</template>
<script>
export default {
    head() {
        return `Homes around ${this.label}}`
    },
    mounted() {
        this.updateMap()
    },
    methods: {
        highlightMarker(homeId, isHighlighted) {
            document.getElementsByClassName(`marker-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHighlighted)
        },  
        updateMap() {
            this.$map.showMap(this.$refs.map, this.lat, this.lng)
        },
        getHomeMarkers() {
            return this.homes.mao((home) => {
                return {
                    ...home._geoloc,
                    pricePerNight: home.pricePerNight,
                    id: home.objectID
                }
            })
        }
    },  
    async beforeRouteUpdate(to, from, next) {
        const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng)
        this.homes = data.json.hits
        this.label = to.query.label
        this.lat = to.query.lat
        this.lng = to.query.lng
        this.updateMap()
        next()
    },
    async asyncData({ query, $dataApi }) {
        const data = await $dataApi.getHomesByLocation(query.lat, query.lng)
        return {
            homes: data.json.hits,
            label: query.label,
            lat: query.lat,
            lng: query.lng
        }
    }
}
</script>
<style>
.marker {
    background-color: white;
    border: 1px solid grey;
    font-weight: bold;
    border-radius: 20px;
    padding: 5px 8px;
}

.marker-highlight {
    color: white;
    background-color: black;
    border-color: black;
}
</style>