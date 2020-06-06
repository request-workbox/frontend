<template>
  <div id="requestlist-container">
      <RequestListRows />
  </div>
  
</template>

<script>
import RequestListRows from './RequestListRows'
export default {
  name: 'RequestList',
  components: {
    RequestListRows,
  }
}
</script>

<style lang="scss">
#requestlist-container {
  display: flex;
  flex-direction:row;
  width: 100%;
}
</style>