<template>
  <keep-alive>
    <component :is="componentName" v-if="this.option !== '' && this.selectedData()._id"></component>
  </keep-alive>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import _ from "lodash";

import RequestOptionsQuery from "./RequestOptionsQuery";
import RequestOptionsHeaders from "./RequestOptionsHeaders";
import RequestOptionsBody from "./RequestOptionsBody";
import RequestOptionsAuthorization from './RequestOptionsAuthorization'
import RequestOptionsUrl from "./RequestOptionsUrl";
import Queue from "./Queue";

export default {
  name: "RequestOptions",
  components: {
    RequestOptionsQuery,
    RequestOptionsHeaders,
    RequestOptionsBody,
    RequestOptionsAuthorization,
    RequestOptionsUrl,
    Queue,
  },
  computed: {
    ...mapState("table", ["option"]),
    ...mapGetters('table',['selectedData']),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
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