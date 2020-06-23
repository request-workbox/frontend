<template>
    <component :is="`RequestOptions${upperFirstOption}`">
    </component>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

import RequestOptionsParameters from './RequestOptionsParameters' 
import RequestOptionsQuery from './RequestOptionsQuery' 
import RequestOptionsHeaders from './RequestOptionsHeaders' 
import RequestOptionsCookies from './RequestOptionsCookies' 
import RequestOptionsBody from './RequestOptionsBody' 
import RequestOptionsUrl from './RequestOptionsUrl' 
import RequestOptionsPermissions from './RequestOptionsPermissions' 
import RequestOptionsDetails from './RequestOptionsDetails' 

export default {
  name:'RequestOptions',
  components: {
    RequestOptionsParameters,
    RequestOptionsQuery,
    RequestOptionsHeaders,
    RequestOptionsCookies,
    RequestOptionsBody,
    RequestOptionsUrl,
    RequestOptionsPermissions,
    RequestOptionsDetails,
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