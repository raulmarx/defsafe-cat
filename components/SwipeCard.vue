<template>
    <div
      ref="card"
      class="w-64 h-96 bg-white rounded-lg shadow-lg m-4 absolute"
      :style="style"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div class="flex flex-col items-center justify-center h-full p-4">
        <img :src="card.image" class="w-32 h-32 rounded-full mb-4" />
        <h2 class="text-xl ">{{ card.name }}</h2>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue';
  
  const card = {
    name: 'Card 1',
    image: 'https://via.placeholder.com/150'
  };
  
  const position = reactive({ x: 0, y: 0 });
  const initialPosition = reactive({ x: 0, y: 0 });
  const isDragging = ref(false);
  
  
  const style = computed(() => ({
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: isDragging.value ? 'none' : 'transform 0.3s ease',
  }));
  
  
  function startDrag(event) {
    isDragging.value = true;
    initialPosition.x = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    initialPosition.y = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
  
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  }
  
  
  function drag(event) {
    const clientX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;
  
    position.x = clientX - initialPosition.x;
    position.y = clientY - initialPosition.y;
  }
  
  
  function endDrag() {
    isDragging.value = false;
  
    
    if (position.x > 150 || position.x < -150) {
      position.x = position.x > 0 ? 500 : -500; 
      position.y = 0;
      
    } else {
      
      position.x = 0;
      position.y = 0;
    }
  
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
  }
  </script>
  
  <style scoped>
  .card {
    user-select: none; 
  }
  </style>
  