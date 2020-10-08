<template>
  <div id="product-container">
    <ProductMenu />
    <component :is="`Product${upperFirstOption}`"/>
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import _ from 'lodash'

import ProductMenu from './ProductMenu'
import ProductDatetime from './ProductDatetime'
import Footer from './Footer'

export default {
  name: "Product",
  props: ['projectId'],
  components: {
    ProductMenu,
    ProductDatetime,
    Footer,
  },
  mounted: function () {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    this.init();
    return next();
  },
  computed: {
    ...mapState('product', ['option']),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
  },
  methods: {
    ...mapMutations('table', ['setCurrentRoute']),
    ...mapActions('project', ['getProjectName']),
    init: function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjectName({ projectId: this.projectId })
    },
  },
};
</script>

<style lang="scss">
#product-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}
</style>