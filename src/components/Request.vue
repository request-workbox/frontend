<template>
  <div id="request-container">
    <RequestList />
    <RequestDetails />
  </div>
  
</template>

<script>
import RequestList from './RequestList'
import RequestDetails from './RequestDetails'

export default {
  name: 'Request',
  components: {
    RequestList,
    RequestDetails,
  }
}
</script>

<style lang="scss">
#request-container {
  display: flex;
  flex-direction:column;
  align-items: flex-start;

  // background: #1b59c2;
  // background: #0059c1;
  
  padding: 15px 0 0 15px;
}
</style>