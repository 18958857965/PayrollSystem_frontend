<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    window.addEventListener('unload', this.saveState)
    sessionStorage.removeItem('state')
  },
  methods: {
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
}


</script>

<style>
</style>
