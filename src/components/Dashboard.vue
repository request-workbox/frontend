<template>
  <div id="container">
    <RequestList />
    <RequestDetails />
  </div>
  
</template>

<script>
import RequestList from './RequestList'
import RequestDetails from './RequestDetails'

export default {
  name: 'Dashboard',
  components: {
    RequestList,
    RequestDetails,
  }
}
</script>

<style lang="scss">
#container {
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    position: absolute;
    display: flex;
    background: rgba(29, 30, 33, 1);
}
</style>