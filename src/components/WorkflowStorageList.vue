<template>
  <div class="row">
    <div class="column column-full-width padding-left-right-15">

      <div
        v-for="(storage) in visibleStorages()"
        v-bind:key="storage._id"
        class="row storage-row"
        v-on:click="selectOrDeselectRowAction(storage)">

        <div 
          v-bind:class="{'storage-button-nav-selected':rowIsActive(storage)}"
          class="column column-full-width storage-button-nav">
            <div class="row">
              <div class="column column-grow">
                <p class="storage-button-nav-text">{{ storage.name }}</p>
              </div>
              <div class="column text-light-blue text-22 padding-right-13" v-if="rowIsActive(storage)">•</div>
          <div class="column text-white text-22 padding-right-13" v-if="!rowIsActive(storage)">•</div>
            </div>
          </div>

      </div>

      <div class="row row-border-bottom-light padding-top-bottom-5" v-if="!numberOfStorages">
        <div class="column column-grow text-center text-12 text-light-grey">You don't have any storages here.</div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'WorkflowStorageList',
  computed: {
    ...mapState('storage', ['option','editing']),
    ...mapGetters('storage', ['visibleStorages','selectedStorage']),

    numberOfStorages: function() {
      if (!this.visibleStorages()) return 0
      else return _.size(this.visibleStorages())
    }
  },
  methods: {
    ...mapActions('storage', ['selectOrDeselectRow']),
    rowIsActive: function (data) {
      if (data._id === this.selectedStorage()._id) return true
      else return false
    },
    storageType: function(storage) {
      if (storage.storageType === 'file') return 'File'
      if (storage.storageType === 'text') return 'Text'
    },
    dateCreated: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    },
    selectOrDeselectRowAction: function(storage) {
      this.selectOrDeselectRow(storage)

      // if (this.selectedStorage()._id === storage._id) {
      //   this.$router.replace({ path: this.$route.name, query: { option: this.option, }}).catch((err) => err)
      // } else {
      //   this.$router.replace({ path: this.$route.name, query: { id: storage._id, option: this.option, }}).catch((err) => err)
      // }
    },
  },
};
</script>

<style lang="scss">
.storage-row-selectable {
  cursor: pointer;
  background:white;
}
.storage-row-selectable:hover {
  background: #dcf0ff !important;
  // border-top: #2196f3 solid 1px !important;
  // border-bottom: #2196f3 solid 1px !important;

  

  .text-white {
    color: #dcf0ff !important;
  }
}
.storage-row-selected {
    background: #dcf0ff;
    font-weight: 600;
  }

  .padding-right-13 {
    padding-right: 13px;
  }
  .padding-left-right-5 {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  .padding-left-5 {
    padding-left: 5px !important;
  }


  .storage-row {
    .text-button-selected {
      background: #e3f5e2;
    }

    display: flex;
    flex-direction: column;
    width: 175px;

    padding-bottom:25px;

    background:white;

    padding: 0 15px
  }

 .storage-button-nav {
    background: white;
    color: #395b75;
    cursor: pointer;
    font-size: 11px;

    width: 100%;

    margin: 2px 2px;

    border-radius: 3px;

    transition: 0.7s;

    border: solid 1px #9bce9a;
  }

  .storage-button-nav-off {
    background: white;
    color: #395b75;
    font-size: 12px;

    width: 100%;
  }

  .storage-button-nav-text {
    padding-left: 7px;
    margin: 7px;
  }

  .storage-button-nav-selected {
    .storage-button-nav-text {
      color: #060b3e;
      font-weight: 600;
    }
  }

  .storage-button-nav:hover {

    .storage-button-nav-text {
      color: #0c5894;
      color: #060b3e;
      font-weight: 600;
    }

    background: #d1f5e0;
  }

  .storage-button-nav-text-header {
    padding-left: 7px;
    font-weight: 700;
    cursor: default;
    font-size: 10px !important;
    text-transform: uppercase;
  }
</style>