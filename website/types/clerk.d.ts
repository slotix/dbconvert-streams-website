import Clerk from '@clerk/clerk-js'

declare module '#app' {
    interface NuxtApp {
        $clerk: Clerk
    }
}

export { } 