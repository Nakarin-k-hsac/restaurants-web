<template>
    <div class="bg-dark text-light min-vh-100 p-4">
        <div class="container text-center">
            <h1 class="display-4 mb-4">🍽️ Find Restaurant</h1>
            <SearchBox @search="fetchRestaurants" />
            <div class="row outer-box">
                <div class="col-lg-8 col-sm-12" style="height: 100%;">
                    <google-map v-if="keywordLocation" :keyword="keywordLocation" style="height: 100%;" />
                </div>
                <div class="col-lg-4 col-sm-12" style="height: 100%;">
                    <div class="h-100 overflow-auto rounded text-dark">
                        <RestaurantList v-if="restaurants" :restaurants="restaurants" @find="clickFind"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const restaurants = ref([])
const center = ref({
    lat: 13.819900,
    lng: 100.514000
})
const config = useRuntimeConfig()
const api = config.public.apiService
const keywordLocation = ref<string>('')


//ฟังชั่นเอาไว้ fetch data ตอนค้นหา
async function fetchRestaurants(keyword: string) {
    keywordLocation.value = keyword
    const { data } = await useFetch(`${api}/search?location=${keyword}`)
    restaurants.value = data.value
    console.log('Fetched restaurants:', data.value)

    if (restaurants.value.length > 0) {
        center.value = restaurants.value[0].geometry.location
    }
}

const clickFind = (name: string) => {
    keywordLocation.value = name
}

onMounted(() => {
    fetchRestaurants('bang sue')
})
</script>

<style scoped>

.outer-box {
    height: 4cat ~/.ssh/id_ed25519.pub00px;
}

@media (max-width: 576px) {
    .outer-box {
        height: 300px;
    }
}
@media (min-width: 992px) {
    .outer-box {
        height: 600px;
    }
}
</style>