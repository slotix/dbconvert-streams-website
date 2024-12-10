<template>
    <header>
        <nav class="bg-white shadow">
            <div class="container mx-auto px-4">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <NuxtLink to="/" class="flex items-center">
                            <span class="text-xl font-bold text-blue-600">DBConvert Streams</span>
                        </NuxtLink>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <NuxtLink to="/features" class="text-gray-700 hover:text-blue-600">Features</NuxtLink>
                        <NuxtLink to="/use-cases" class="text-gray-700 hover:text-blue-600">Use Cases</NuxtLink>
                        <NuxtLink to="/pricing" class="text-gray-700 hover:text-blue-600">Pricing</NuxtLink>
                        <NuxtLink to="/docs" class="text-gray-700 hover:text-blue-600">Documentation</NuxtLink>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>