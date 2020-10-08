<template>
  <div class="row">
    <div class="column column-full-width" id="footer">

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "Footer",
  data: function() {
    return {}
  },
};
</script>

<style lang="scss">
#footer {
  width: 100%;
  min-height: 1000px;

  background: #d7dbde;
}
</style>