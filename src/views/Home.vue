<template>
  <div class="home">
    {{this.data}}
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      data: {},
    }
  },
  created() {
    this.request('/').then(res => this.data = res)
  },
}
</script>
