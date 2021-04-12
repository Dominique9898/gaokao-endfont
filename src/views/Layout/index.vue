<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <navbar />
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppMain from '../../appMain.vue';
import navbar from './components/NavBar/index'
import sidebar from './components/SideBar/index'
export default {
  name: "Layout",
  components: {
    navbar,
    AppMain,
    sidebar
  },
  computed: {
    ...mapState({
      // sidebar: state => state.app.sidebar,
      // device: state => state.app.device,
      // showSettings: state => state.settings.showSettings,
    })
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped>
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>

