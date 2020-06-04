<template>
  <div id="container">
    <RequestList />
    <RequestDetails />
    <RequestTemplate />
    <RequestOptions />
  </div>
  
</template>

<script>
import RequestList from './RequestList'
import RequestDetails from './RequestDetails'
import RequestTemplate from './RequestTemplate'
import RequestOptions from './RequestOptions'

export default {
  name: 'Dashboard',
  components: {
    RequestList,
    RequestDetails,
    RequestTemplate,
    RequestOptions,
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