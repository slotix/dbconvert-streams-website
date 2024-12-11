<template>
    <header>
        <nav class="bg-primary-dark text-white shadow">
            <div class="container mx-auto px-4">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <NuxtLink to="/" class="flex items-center">
                            <span class="text-xl font-bold text-white">DBConvert Streams</span>
                        </NuxtLink>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <NuxtLink to="/features" class="text-white hover:text-white/80">Features</NuxtLink>
                        <NuxtLink to="/use-cases" class="text-white hover:text-white/80">Use Cases</NuxtLink>
                        <NuxtLink to="/pricing" class="text-white hover:text-white/80">Pricing</NuxtLink>
                        <NuxtLink to="/docs" class="text-white hover:text-white/80">Documentation</NuxtLink>
                        <button class="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>