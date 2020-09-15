<template>
  <div id='app'>
    <div class="container">
      <carousel
        :autoplay='true'
        :duration='3000'
        :initial='0'
        :hasDot='true'
        :hasDirector='true'
      >
        <car-item
          v-for='(item,index) in 5'
          :key="index"
        >
          <img draggable="false" :src="require(`./assets/img/${item}.jpg`)" alt="">
        </car-item>
      </carousel>
    </div>
    <ButtonColor size='lg' type='success'> sss </ButtonColor>
  </div>
</template>

<style lang="scss" scoped>
  .container{
    width: 520px;
    height: 280px;
    margin: 0 auto;
  }
</style>
