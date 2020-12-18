<template>
    <div class="row">
      <div class="column column-full-width">
        <div class="row row-border-bottom">
          <div class="column column-grow column-padded">
            <span class="text-17 text-weight-600">{{ projectName }}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProjectInfo',
  computed: {
    ...mapState('project', ['projectName']),
  },
}
</script>