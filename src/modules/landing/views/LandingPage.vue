<script setup lang="ts">
import CTASection from '../components/CTASection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import FooterSection from '../components/FooterSection.vue'
import HeroSection from '../components/HeroSection.vue'
import HowItWorksSection from '../components/HowItWorksSection.vue'
import StatsSection from '../components/StatsSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-app text-app">
    <NavBar />
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </main>

    <FooterSection />
  </div>
</template>
