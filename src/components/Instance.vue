<template>
  <div id="stat-container">
    <InstanceList />
  </div>
  
</template>

<script>
import InstanceList from './InstanceList'

export default {
  name: 'Stats',
  components: {
    InstanceList,
  }
}
</script>

<style lang="scss">
#stat-container {
  display: flex;
  flex-direction:row;
}
</style>