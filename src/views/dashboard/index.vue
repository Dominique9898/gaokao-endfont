<template>
  <div class="dashboard-container">
    {{user.username}},欢迎回来,{{currentRole}}
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  created(){
    user = sessionStorage.getItem('userinfo')
  },
  data() {
    return {
      user: {},
      currentRole: '智能高考后台管理系统'
    }
  },
}
</script>
