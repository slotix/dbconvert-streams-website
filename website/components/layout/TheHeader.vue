<template>
    <header>
        <nav class="bg-primary-dark text-white shadow">
            <div class="container mx-auto px-4">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <NuxtLink to="/" class="flex items-center space-x-3">
                            <img src="/images/logo-light.svg" alt="DBConvert Streams Logo" class="h-8 w-auto" />
                            <span class="text-xl font-display font-bold text-white">DBConvert Streams</span>
                        </NuxtLink>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="md:hidden flex items-center">
                        <button @click="toggleMenu"
                            class="text-white hover:text-white/80 focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu">
                            <svg class="h-6 w-6 transition-transform duration-200"
                                :class="{ 'rotate-180 scale-90': isOpen, 'rotate-0': !isOpen }" stroke="currentColor"
                                fill="none" viewBox="0 0 24 24">
                                <path :class="{ 'opacity-0': isOpen }" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M4 6h16M4 12h16M4 18h16"
                                    class="transition-opacity duration-200" />
                                <path :class="{ 'opacity-100': isOpen, 'opacity-0': !isOpen }" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"
                                    class="transition-opacity duration-200" />
                            </svg>
                        </button>
                    </div>

                    <!-- Desktop menu -->
                    <div class="hidden md:flex items-center space-x-8">
                        <template v-for="item in menuItems" :key="item.to">
                            <NuxtLink v-if="!item.external" :to="item.to"
                                class="text-white hover:text-white/80 transition-colors relative group py-2"
                                active-class="text-white/80">
                                {{ item.text }}
                                <span
                                    class="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                            </NuxtLink>
                            <a v-else :href="item.to"
                                class="text-white font-ui hover:text-white/80 transition-colors relative group py-2">
                                {{ item.text }}
                                <span
                                    class="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                            </a>
                        </template>
                        <NuxtLink to="/get-started"
                            class="bg-secondary text-white font-ui px-6 py-2 rounded-lg hover:bg-secondary-dark transition-colors duration-200 hover:shadow-lg">
                            Get Started
                        </NuxtLink>
                        <UserAvatar />
                    </div>
                </div>

                <!-- Mobile menu -->
                <div class="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
                    :style="{ maxHeight: isOpen ? mobileMenuHeight + 'px' : '0px' }">
                    <div ref="mobileMenuContent" class="flex flex-col space-y-4 py-4 border-t border-white/10">
                        <template v-for="item in menuItems" :key="item.to">
                            <NuxtLink v-if="!item.external" :to="item.to"
                                class="text-white hover:text-white/80 transition-colors px-2 py-2 rounded-lg hover:bg-white/10"
                                active-class="bg-white/10" @click="isOpen = false">
                                {{ item.text }}
                            </NuxtLink>
                            <a v-else :href="item.to"
                                class="text-white hover:text-white/80 transition-colors px-2 py-2 rounded-lg hover:bg-white/10"
                                @click="isOpen = false">
                                {{ item.text }}
                            </a>
                        </template>
                        <NuxtLink to="/get-started"
                            class="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors duration-200 text-center mt-2"
                            @click="isOpen = false">
                            Get Started
                        </NuxtLink>
                        <UserAvatar />
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import UserAvatar from './UserAvatar.vue'
const isOpen = ref(false)
const mobileMenuContent = ref(null)
const mobileMenuHeight = ref(0)

const menuItems = [
    { to: '/features', text: 'Features' },
    { to: '/solutions', text: 'Solutions' },
    { to: '/pricing', text: 'Pricing' },
    { to: '/docs/guide/intro.html', text: 'Documentation', external: true },
    { to: '/account', text: 'Account' },
]

const toggleMenu = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value)
    {
        nextTick(() => {
            mobileMenuHeight.value = mobileMenuContent.value.scrollHeight
        })
    }
}

// Close mobile menu on route change
watch(() => useRoute().fullPath, () => {
    isOpen.value = false
})

// Update mobile menu height on window resize
onMounted(() => {
    if (process.client)
    {
        window.addEventListener('resize', () => {
            if (isOpen.value)
            {
                mobileMenuHeight.value = mobileMenuContent.value.scrollHeight
            }
        })
    }
})
</script>