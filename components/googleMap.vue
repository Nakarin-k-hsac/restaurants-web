<template>
    <div ref="mapContainer" v-if="props.keyword" style="width: 100%; height: 500px;"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const config = useRuntimeConfig()
const apiKey = config.public.apiKey

const props = withDefaults(defineProps<{
    keyword: string
}>(), {
    keyword: 'bang sue'
})

const mapContainer = ref<HTMLDivElement | null>(null)

// ตัวแปรเก็บ instance ของแผนที่, geocoder, และ marker
let map: google.maps.Map | null = null
let geocoder: google.maps.Geocoder | null = null
let marker: google.maps.Marker | null = null

// ฟังก์ชันโหลด Google Maps JavaScript API แบบ async
function loadGoogleMapsScript(apiKey: string) {
    return new Promise<void>((resolve) => {
        // ถ้าสคริปต์ Google Maps โหลดไปแล้ว ให้ resolve ทันที
        if ((window as any).google) {
            resolve()
            return
        }
        // สร้างแท็ก script เพื่อโหลด Google Maps API
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
        script.async = true
        script.onload = () => resolve() // เมื่อโหลดเสร็จ resolve promise
        document.head.appendChild(script)
    })
}

// เริ่มต้นสร้างแผนที่และ geocoder
async function initMap() {
    if (!mapContainer.value) return
    // รอโหลด Google Maps API
    await loadGoogleMapsScript(apiKey)

    // สร้างแผนที่ใหม่ โดยเริ่มต้นที่กรุงเทพฯ (lat,lng) และ zoom ระดับ 13
    map = new google.maps.Map(mapContainer.value, {
        center: { lat: 13.7563, lng: 100.5018 },
        zoom: 13
    })

    // สร้าง geocoder สำหรับแปลงที่อยู่เป็นพิกัด
    console.log('initMap keyword:', props.keyword)  // <-- เพิ่มตรงนี้
    geocoder = new google.maps.Geocoder()

    // แสดงหมุดตำแหน่งตาม keyword ที่รับมา
    updateMarker(props.keyword)
}

// ฟังก์ชันอัพเดตตำแหน่งหมุดบนแผนที่ตามที่อยู่ (keyword)
async function updateMarker(address: string) {
    if (!geocoder || !map) return

    // ใช้ geocoder แปลงที่อยู่เป็นตำแหน่งพิกัด
    geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location

            // ย้ายจุดศูนย์กลางแผนที่ไปยังตำแหน่งที่ geocode ได้
            map!.setCenter(location)

            // ถ้ามี marker เก่าอยู่ ให้ลบออกก่อน
            if (marker) {
                marker.setMap(null)
            }

            // สร้าง marker ใหม่ที่ตำแหน่ง location พร้อมตั้งชื่อ tooltip เป็น address
            marker = new google.maps.Marker({
                map: map!,
                position: location,
                title: address
            })
        } else {
            // กรณี geocode ไม่สำเร็จ แจ้งเตือนใน console
            console.warn('Geocode was not successful for the following reason: ' + status)
        }
    })
}

// เมื่อ component โหลดเสร็จ เรียกฟังก์ชัน initMap สร้างแผนที่
onMounted(() => {
    initMap()
})

// เมื่อ props.keyword เปลี่ยน ให้เรียก updateMarker อัพเดตหมุดตำแหน่งใหม่
watch(() => props.keyword, (newKeyword) => {
    updateMarker(newKeyword)
})
</script>