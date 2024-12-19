<template>
    <ClientOnly>
        <div class="flex items-center">
            <template v-if="mounted">
                <template v-if="isSignedIn">
                    <UserButton />
                </template>
                <template v-else>
                    <button @click="signIn" class="flex items-center text-white hover:text-primary transition-colors">
                        <UserCircle class="w-6 h-6 mr-2" />
                        <span class="font-ui">Sign In</span>
                    </button>
                </template>
            </template>
        </div>
    </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UserCircle } from 'lucide-vue-next'
import { UserButton } from '@clerk/vue'

const { $clerk } = useNuxtApp()
const mounted = ref(false)
const isSignedIn = ref(false)

onMounted(() => {
    isSignedIn.value = $clerk.user?.id !== undefined
    mounted.value = true
})

const signIn = () => {
    $clerk.openSignIn()
}
</script>