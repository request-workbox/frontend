<template>
  <div id="requestlist-container">
      <RequestListActionButtons />
      <RequestListRows />
  </div>
  
</template>

<script>
import RequestListRows from './RequestListRows'
import RequestListActionButtons from './RequestListActionButtons'

export default {
  name: 'RequestList',
  components: {
    RequestListRows,
    RequestListActionButtons,
  }
}
</script>

<style lang="scss">
#requestlist-container {
  display: flex;
  flex-direction:column;
  width: 100%;
}
</style>