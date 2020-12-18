<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-grow column-padded">
          <span class="text-17 text-weight-600">{{ projectName }}</span>
        </div>
        <div class="column text-button-blue action margin-right-15"><span>Currently in beta</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "StatuscheckRegister",
  computed: {
    ...mapState('project', ['projectName']),
  },
};
</script>