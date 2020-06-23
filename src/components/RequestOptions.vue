<template>
    <component :is="`RequestOptions${upperFirstOption}`">
    </component>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

import RequestOptionsParameters from './RequestOptionsParameters' 
import RequestOptionsQuery from './RequestOptionsQuery' 

export default {
  name:'RequestOptions',
  components: {
    RequestOptionsParameters,
    RequestOptionsQuery,
  },
  computed: {
    ...mapState('request/requestOptions', [
      'option'
    ]),
    upperFirstOption: function() {
      return _.upperFirst(this.option)
    }
  }
}
</script>