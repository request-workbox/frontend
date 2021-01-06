<template>
  <keep-alive>
    <component :is="componentName" v-if="this.option !== '' && this.selectedRequest()._id"></component>
  </keep-alive>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import _ from 'lodash'

import RequestOptionsUrl from './RequestOptionsUrl'
import RequestOptionsAuthorization from './RequestOptionsAuthorization'
import RequestOptionsQuery from './RequestOptionsQuery'
import RequestOptionsHeaders from './RequestOptionsHeaders'
import RequestOptionsBody from './RequestOptionsBody'

import Queue from './Queue'

export default {
  name: 'RequestOptions',
  components: {
    RequestOptionsUrl,
    RequestOptionsAuthorization,
    RequestOptionsQuery,
    RequestOptionsHeaders,
    RequestOptionsBody,
    Queue,
  },
  computed: {
    ...mapState('request', ['option']),
    ...mapGetters('request', ['selectedRequest']),
    
    upperFirstOption: function() {
      return _.upperFirst(this.option)
    },
    componentName: function() {
      if (this.option === 'queue') {
        return 'Queue'
      } else {
        return `RequestOptions${this.upperFirstOption}`
      }
    }
  }
};
</script>