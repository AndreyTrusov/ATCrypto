<script lang="ts">
import {defineComponent} from 'vue'
import {useNavigationStore} from "@/stores/navigation.ts";
import HeroBackground from "@/components/layout/HeroBackground.vue";
import InfoSection from "@/components/InfoSection.vue";
import FooterSection from "@/components/FooterSection.vue";

export default defineComponent({
  name: "AboutPage",
  components: {FooterSection, InfoSection, HeroBackground},
  data() {
    return {
      isNavOpen: false,
    }
  },
  setup() {
    const navigationStore = useNavigationStore();
    return {
      navigationStore
    };
  },
})
</script>

<template>
  <div class="sub_page">
    <div class="hero_area">
      <HeroBackground/>

      <header class="header_section">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg custom_nav-container">
            <router-link class="navbar-brand" to="/">
              <span>ATCrypto</span>
            </router-link>

            <button class="navbar-toggler" @click="navigationStore.toggleNav()">
              <span></span>
            </button>

            <div class="navbar-collapse" :class="{ 'collapse': !navigationStore.isNavOpen }">
              <ul class="navbar-nav">
                <li v-for="link in navigationStore.navLinks" :key="link.name" class="nav-item">
                  <router-link class="nav-link" :to="link.route" active-class="active">
                    {{ link.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>

    <section class="about_section layout_padding">
      <div class="container  ">
        <div class="heading_container heading_center">
          <h2>
            About <span>Us</span>
          </h2>
          <p>
            Magni quod blanditiis non minus sed aut voluptatum illum quisquam aspernatur ullam vel beatae rerum ipsum voluptatibus
          </p>
        </div>
        <div class="row">
          <div class="col-md-6 ">
            <div class="img-box">
              <img src="../assets/images/about-img.png" alt="">
            </div>
          </div>
          <div class="col-md-6">
            <div class="detail-box">
              <h3>
                We Are Finexo
              </h3>
              <p>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                in some form, by injected humour, or randomised words which don't look even slightly believable. If you
                are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
                the middle of text. All
              </p>
              <p>
                Molestiae odio earum non qui cumque provident voluptates, repellendus exercitationem, possimus at iste corrupti officiis unde alias eius ducimus reiciendis soluta eveniet. Nobis ullam ab omnis quasi expedita.
              </p>
              <a href="">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div>
      <InfoSection/>
      <FooterSection/>
    </div>

  </div>
</template>

<style scoped>

</style>