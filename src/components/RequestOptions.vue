<template>
    <component :is="`RequestOptions${upperFirstOption}`">
    </component>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

import RequestOptionsParameters from './RequestOptionsParameters' 

export default {
  name:'RequestOptions',
  components: {
    RequestOptionsParameters,
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