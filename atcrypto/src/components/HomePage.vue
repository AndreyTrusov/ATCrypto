<template>
  <div class="hero_area">
    <div class="hero_bg_box">
      <div class="bg_img_box">
        <img src="@/assets/images/hero-bg.png" alt="">
      </div>
    </div>

    <header class="header_section">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container">
          <router-link class="navbar-brand" to="/">
            <span>ATCrypto</span>
          </router-link>

          <button class="navbar-toggler" @click="isNavOpen = !isNavOpen">
            <span></span>
          </button>

          <div class="navbar-collapse" :class="{ 'collapse': !isNavOpen }">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'Home' }" active-class="active">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'About' }">About</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'Team' }">Team</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      isNavOpen: false,
    }
  },
}
</script>

<style scoped>

</style>