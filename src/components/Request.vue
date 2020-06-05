<template>
  <div id="request-container">
    <RequestDetails />
    <RequestTemplate />
    <RequestOptions />
  </div>
  
</template>

<script>
import RequestDetails from './RequestDetails'
import RequestTemplate from './RequestTemplate'
import RequestOptions from './RequestOptions'

export default {
  name: 'Request',
  components: {
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