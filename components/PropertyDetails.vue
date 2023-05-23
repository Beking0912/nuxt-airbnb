<template>
    <div class="app-wrapper">
        <div class="app-double-column app-property-details">
            <div>
                <h1>{{ home.title }}</h1>
                <div class="app-flex">
                    <div class="app-address">
                        {{ home.location.address }}<br />
                        {{ home.location.city }}, {{ home.location.state }}
                    </div>
                    <div class="app-rating">
                        {{ home.reviewValue }} ({{ home.reviewCount }})
                    </div>
                </div>
                <div class="app-property-details-footer">
                    {{ pluralize(home.guests, 'guests') }} &middot;
                    {{ pluralize(home.bedrooms, 'rooms') }} &middot;
                    {{ pluralize(home.beds, 'beds') }} &middot;
                    {{ pluralize(home.bathrooms, 'baths') }}
                </div>
            </div>
            <div class="app-price">
                ${{ home.pricePerNight }} / night
            </div>
            <div class="app-search">
                <input type="text" class="datepicker" placeholder="check in"/>
                <input type="text" class="datepicker" placeholder="check out"/>
            </div>
            <button class="app-big-button">request to book</button>
        </div>
    </div>
</template>
<script>
import pluralize from "~/utils/pluralize";
export default {
    props: {
        home: {
            type: Object,
            required: true
        }
    }
}
</script>