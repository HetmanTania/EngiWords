<template>
  <div class="min-h-screen bg-background">
    <div class="h-full mx-auto">
      <TheHeader/>
      <slot />
    </div>
  </div>

</template>

<script>


import {defineComponent} from "vue";
import TheHeader from "~/components/TheHeader.vue";

export default defineComponent({
  components: {TheHeader}
})
</script>

