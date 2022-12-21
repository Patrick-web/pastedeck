<template>
    <div class="fixed sm:absolute bottom-[80px] sm:bottom-[20px] left-[10px] sm:left-[8px] z-10 flex flex-col items-center justify-center gap-2">
        <p v-for="peer in peers" :key="peer" class="bg-base-color rounded-full p-2 shadow-xl shadow-black/20 animate__animated animate__faster animate__zoomIn">
          <img :src="'https://robohash.org/' + peer + '.png'" class="w-[20px] sm:w-[30px]"/>
        </p>
      <img src="../assets/wifi-icon.svg" class="relative z-10 w-[25px] sm:w-[30px] bg-base-color p-2 rounded-full shadow-2xl animate__animated animate__faster animate__slideInUp"/>
    </div>
</template>

<script>
  export default {
    name:"LiveIndicator",
    props:{
      peers: {
        type: Array,
      }
    } 
  }
</script>

<style lang="scss" scoped>
.circles {
  position: relative;
  div {
    /*animation: growAndFade 3s infinite ease-out;*/
    border-radius: 50%;
    height: 100%;
    opacity: 0;
    position: absolute;
    width: 100%;
  }
  
  .circle1 {
    animation-delay: 1s;    
  }
  .circle2 {
    animation-delay: 2s; 
  }
  .circle3 {
    animation-delay: 3s;
  }
}

@keyframes growAndFade {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
