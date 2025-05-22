<template>
    <div class="mt-4 bg-dark text-light min-vh-100">
        <div v-for="r in restaurants" :key="r.place_id" class="card mb-3 text-start">
            <div class="card-body row">
                <div class="col-12">
                    <img class="card-img" :src="getPhoto(r.photos[0].photo_reference)">
                </div>
                <div class="col-12 mt-3">
                    <h5 class="card-title">{{ r.name }}</h5>
                </div>
                <div class="col-12">
                    <p class="card-text">{{ r.formatted_address }}</p>
                </div>
                <div class="col-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc107" class="bi bi-star-fill mb-1" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696 2.107-4.28c.197-.4.73-.4.927 0l2.107 4.28 4.898.696c.441.062.612.63.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    {{r.rating ? r.rating : '-'}}
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center">
                    <button class="btn btn-primary px-4 py-2 rounded-pill shadow" @click="clickFindRestaurants(r.name)">
                        ค้นหาร้านอาหาร
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig()
const apiPhoto = config.public.apiPhoto
const apiKey = config.public.apiKey

defineProps(['restaurants'])
const getPhoto = (refer: string) => {
    const photo: any = `${apiPhoto}${refer}&key=${apiKey}`
    return photo
}

const emit = defineEmits(['find'])

const clickFindRestaurants = (name: string) => {
    emit('find', name)
}

</script>

<style scoped>
.card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    overflow: hidden;
    display: block;
}
.card-text {
    font-size: 12px;
}
</style>