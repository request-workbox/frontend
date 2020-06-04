<template>
  <div id="request-container">
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
  name: 'Request',
  components: {
    RequestList,
    RequestDetails,
    RequestTemplate,
    RequestOptions,
  }
}
</script>

<style lang="scss">
#request-container {
  display: flex;
  flex-direction:row;
}
</style>