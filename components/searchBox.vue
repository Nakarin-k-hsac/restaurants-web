<template>
    <div class="input-group mb-4">
        <input
            type="text"
            v-model="keyword"
            @keyup.enter="handleSearch"
            class="form-control"
            placeholder="Enter location (e.g. Bang sue)"
        />
        <button class="btn btn-primary" @click="handleSearch">Search</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('Bang sue') // default keyword

const emit = defineEmits(['search'])

function handleSearch() {
    if (keyword.value.trim() !== '') {
        emit('search', keyword.value.trim())
    }
}
</script>