<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom row-border-bottom-tall">
        <div class="column column-data column-header-text column-20 padding-10">Type</div>
        <div class="column column-data column-header-text column-grow padding-10">Configuration</div>
      </div>

      <div class="row row-border-bottom row-border-bottom-tall row-align-start">
        <div class="column column-data column-20 padding-10 break-spaces">
          <select class="column-input-select column-input-select-stretch">
            <option value="textInput">No Auth</option>
            <option value="storage">API Key</option>
            <option value="storage">Bearer Token</option>
            <option value="storage">Basic Auth</option>
          </select>
          <p>The authorization header will be automatically generated when you send the request. Learn more about authorization</p>
        </div>
        <div class="column column-data column-full-width column-grow">

            <div class="row row-border-bottom">
              <div class="column column-data column-5">Username</div>
              <!-- <div class="column column-data column-10">
                <input
                  type="text"
                  placeholder=""
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div> -->
              <div class="column column-data column-10">
                <select class="column-input-select border-hidden column-input-select-stretch">
                    <option value="textInput">Text Input</option>
                    <option value="storage">Storage</option>
                    <option value="runtimeResult">Runtime Result</option>
                    <option value="incomingField">Incoming Field</option>
                  </select>
              </div>
              <div class="column column-10" v-if="valueType === 'textInput'">
                <input
                  type="text"
                  placeholder="Text Input Value"
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div>
              <div class="column column-data column-10" v-if="valueType === 'storage'">
                <select class="column-input-select border-hidden column-input-select-stretch">
                    <option
                        v-for="(storage) in storagesForSelect()"
                        :key="storage._id"
                        :value="storage._id"
                      >{{ storage.name }}</option>
                  </select>
              </div>
              <div class="column column-data column-10" v-if="valueType === 'runtimeResult'">
                <input
                  type="text"
                  placeholder="Request result name"
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div>
              <div class="column column-data column-10" v-if="valueType === 'incomingField'">
                <input
                  type="text"
                  placeholder="Field Name"
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div>
              <div class="column text-button action">
                Show
              </div>
            </div>



            <div class="row row-border-bottom">
              <div class="column column-data column-5">Password</div>
              <!-- <div class="column column-data column-10">
                <input
                  type="text"
                  placeholder=""
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div> -->
              <div class="column column-data column-10">
                <select class="column-input-select border-hidden column-input-select-stretch">
                    <option value="textInput">Text Input</option>
                    <option value="storage">Storage</option>
                    <option value="runtimeResult">Runtime Result</option>
                    <option value="incomingField">Incoming Field</option>
                  </select>
              </div>
              <div class="column column-10" v-if="valueType === 'textInput'">
                <input
                  type="text"
                  placeholder="Text Input Value"
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div>
              <div class="column column-data column-10" v-if="valueType === 'storage'">
                <select class="column-input-select border-hidden column-input-select-stretch">
                    <option
                        v-for="(storage) in storagesForSelect()"
                        :key="storage._id"
                        :value="storage._id"
                      >{{ storage.name }}</option>
                  </select>
              </div>
              <div class="column column-data column-10" v-if="valueType === 'runtimeResult'">
                <input
                  type="text"
                  placeholder="Request result name"
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div>
              <div class="column column-data column-10" v-if="valueType === 'incomingField'">
                <input
                  type="text"
                  placeholder="Field Name"
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div>
              <div class="column text-button action">
                Show
              </div>
            </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "RequestOptionsAuthorization",
  data: function() {
    return {
      valueType: 'incomingField',
    }
  },
  computed: {
    ...mapGetters("table", ['selectedData']),
    ...mapGetters("table", ["selectedData",'storagesForSelect']),
  },
  methods: {
    ...mapMutations('table', ['editRequestKey']),
    edit: function(key, event) {
      this.editRequestKey({key, value: event.target.value, requestId: this.selectedData()._id})
    }
  },
  filters: {
    capitalize: function (key) {
      if (!key) return ''
      return key.charAt(0).toUpperCase() + key.slice(1)
    }
  }
};
</script>