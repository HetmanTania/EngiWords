<template>
  <div class="relative w-full flex items-center justify-between">
    <input :id="id"
           :type="isPasswordVisible ? 'text' : 'password'"
           :name="name"
           :class="inputClasses"
           :placeholder="placeholder"
           v-model.trim="value"
           @input="$emit('update:modelValue', $event.target.value)"
           @change="$emit('change', $event.target.value)"/>
    <button @click="isPasswordVisible = !isPasswordVisible" class="right-[30px] mr-[15px] top-[8px] absolute"
            aria-label="Toggle password visibility">
      <CloseEyeIcon class="absolute" style="font-size: 28px"/>
      <OpenEyeIcon class="absolute" style="font-size: 28px"/>
    </button>
  </div>
</template>

<script setup>
import  CloseEyeIcon  from "~/components/Icons/CloseEyeIcon.vue";
import  OpenEyeIcon  from "~/components/Icons/OpenEyeIcon.vue";
import gsap from "~/gsap.js";

import {isString} from "~/utils/validation/validators.js";

const { id, name, customClasses, placeholder, modelValue } = defineProps({
    id: {
      type: String,
      required: true,
      validator: isString
    },
    name: {
      type: String,
      required: true,
      validator: isString
    },
    placeholder: {
      type: String,
      required: true,
      validator: isString
    },
    modelValue: {
      type: String,
      required: true,
      validator: isString,
    },
    customClasses: {
      type: String,
      validator: isString,
      default: '',
    }
})


const baseInputClasses = `block border-2 rounded-full border-primary w-full px-[20px] py-[10px] bg-transparent
  outline-none transition duration-500 placeholder:text-text-600`
const focusInputClasses = ` focus:border-primary-500 focus:ring-0 sm:text-sm sm:leading-6`;

defineEmits(['update:modelValue', 'change']);
const value = ref('');
const isPasswordVisible = ref(false);

const inputClasses = computed(() => {
  return  [
    baseInputClasses,
    focusInputClasses,
    customClasses
  ].join(' ');
})

onMounted(() => {
  animClosingEye();
})

watch(isPasswordVisible, (newValue) => {
    if(newValue) {
      animOpeningEye();
    }
    else {
      animClosingEye();
    }
})

const animOpeningEye = () => {
  const tl = gsap.timeline()
      .set('#openEyeLine', {scaleY: 1})
      .to('#closeEye', {
        duration: .4,
        transformOrigin: 'center',
        scaleY: -1,
      })
      .to('#closeEye', {
        autoAlpha: 0,
        duration: .4
      })
      .to('#openEyeLine', {
        autoAlpha: 1,
        duration: .4,
      })
      .to('#openEyeCircle', {
        transformOrigin: 'center',
        autoAlpha: 1,
        duration: .4,
      })
      .to('#closeEye', {
        scaleY: 1,
        transformOrigin: 'center',
        duration: .4
      });
}

const animClosingEye = () => {
  const tl = gsap.timeline()
      .to('#openEyeCircle', {
        autoAlpha: 0,
        duration: .4
      })
      .to('#openEyeLine', {
        scaleY: -1,
        transformOrigin: 'center 60%',
        duration: .4
      })
      .to('#openEyeLine', {
        autoAlpha: 0,
        duration: .4
      })
      .to('#closeEye', {
        autoAlpha: 1,
        duration: .4
      });
}


</script>
