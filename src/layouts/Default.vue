<template>
    <div>
        <Header />

        <main class="flex-1 overflow-auto p-4 bg-[#fff] h-[calc(100vh-114px)]">
            <RouterView />
        </main>

        <Footer />
    </div>
</template>

<script setup>
import Header from '@/components/layout/appHeader.vue';
import Footer from '@/components/layout/appFooter.vue';
</script>