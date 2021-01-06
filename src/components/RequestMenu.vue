<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button text-button-and-logo" v-on:click="createRequestAction()">
            <img src="/cursor.svg" alt="">
            <span>New Request</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RequestMenu',
  computed: {
    ...mapState('project', ['selectedProjectId'])
  },
  methods: {
    ...mapActions('request', ['createRequest',]),
    createRequestAction: async function() {
      try {
        await this.createRequest({ projectId: this.selectedProjectId })
      } catch(err) {
        console.log('Request menu error', err.message)
      }
    },
  }
}
</script>