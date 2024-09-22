<template>
    <button
      :class="computedClasses"
      @click="handleClick"
    >
      <slot>Register</slot>
    </button>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    type: {
      type: String,
      default: 'button',
    },
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  
  const emit = defineEmits(['click']);
  
  const handleClick = (event) => {
    if (!props.disabled) {
      emit('click', event); 
    }
  };
  
  const baseClasses = 'px-4 py-2 rounded  focus:outline-none transition duration-200';
  const colorClasses = {
    primary: 'bg-purple-700 text-white hover:bg-purple-800',
    secondary: 'bg-gray-700 text-white hover:bg-gray-800',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  
  const computedClasses = computed(() => {
    const colorClass = colorClasses[props.color] || colorClasses.primary;
    const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : '';
    return `${baseClasses} ${colorClass} ${disabledClass}`;
  });
  </script>
  