<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-full-width">
          <div class="row row-border-bottom">
            <div
              class="column column-data column-header-text column-grow column-group-header"
            >Request Adapters</div>
          </div>

          <div
            class="row"
            v-for="requestAdapter in this.selectedData().requestAdapters"
            :key="requestAdapter._id"
          >
            <div class="column column-full-width">
              <div class="row row-border-bottom column-group-header">
                <div class="column column-data column-header-text column-uparrow-header">
                  <span>▲</span>
                </div>
                <div
                  class="column column-data column-header-text column-grow"
                >{{ getRequestName(requestAdapter) }}</div>
              </div>

              <!-- Data -->
              <div class="row" v-for="(input, key) in getRequestInputs(requestAdapter)" :key="key">
                <div class="column column-full-width">
                  <div class="row row-border-bottom" v-for="(inputKey, key2) in input" :key="key2">
                    <div class="column column-data column-header-text column-uparrow-header">
                      <span>▲</span>
                    </div>
                    <div class="column column-data column-20">
                      <input
                        type="text"
                        placeholder="Key"
                        class="column-input-text"
                        :value="inputKey"
                        disabled
                      />
                    </div>
                    <div class="column column-data column-grow">
                      <input
                        type="text"
                        placeholder="Value"
                        class="column-input-text"
                        :value="getInputValue(key, inputKey, requestAdapter)"
                        v-on:input="editAdapterInputAction('requestAdapters', key, inputKey, requestAdapter, $event)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row row-border-bottom">
            <div
              class="column column-data column-header-text column-grow column-group-header"
            >Response Adapters</div>
          </div>

          <div
            class="row"
            v-for="responseAdapter in this.selectedData().responseAdapters"
            :key="responseAdapter._id"
          >
            <div class="column column-full-width">
              <div class="row row-border-bottom column-group-header">
                <div class="column column-data column-header-text column-uparrow-header">
                  <span>▲</span>
                </div>
                <div
                  class="column column-data column-header-text column-grow"
                >{{ getRequestName(responseAdapter) }}</div>
              </div>

              <!-- Data -->
              <div class="row" v-for="(input, key) in getRequestInputs(responseAdapter)" :key="key">
                <div class="column column-full-width">
                  <div class="row row-border-bottom" v-for="(inputKey, key2) in input" :key="key2">
                    <div class="column column-data column-header-text column-uparrow-header">
                      <span>▲</span>
                    </div>
                    <div class="column column-data column-20">
                      <input
                        type="text"
                        placeholder="Key"
                        class="column-input-text"
                        :value="inputKey"
                        disabled
                      />
                    </div>
                    <div class="column column-data column-grow">
                      <input
                        type="text"
                        placeholder="Value"
                        class="column-input-text"
                        :value="getInputValue(key, inputKey, responseAdapter)"
                        v-on:input="editAdapterInputAction('responseAdapters', key, inputKey, responseAdapter, $event)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "WorkflowOptionsTasksInputs",
  computed: {
    ...mapGetters("table", ["selectedData", "adapters"]),
  },
  methods: {
    ...mapMutations("table", ["editAdapterInput"]),
    getRequestName: function (adapter) {
      const request = _.filter(this.adapters(), (adapterObj) => {
        if (adapterObj._id === adapter.adapterId) return true;
        else return false;
      });

      if (_.size(request) === 0) return "";

      return request[0].url.name;
    },
    getRequestInputs: function (adapter) {
      const request = _.filter(this.adapters(), (adapterObj) => {
        if (adapterObj._id === adapter.adapterId) return true;
        else return false;
      });

      if (_.size(request) === 0) return [];

      let inputs = {
        parameters: [],
        query: [],
        headers: [],
        cookies: [],
        body: [],
      };

      _.each(inputs, (inputValue, inputKey) => {
        _.each(request[0][inputKey], (input) => {
          if (input.acceptInput) {
            inputs[inputKey].push(input.key);
          }
        });
      });

      return inputs;
    },
    getInputValue: function (input, inputKey, adapter) {
      if (!adapter.inputs) return "";
      if (!_.size(adapter.inputs[input])) return "";

      return adapter.inputs[input][inputKey];
    },
    editAdapterInputAction: function (type, input, inputKey, adapter, event) {
      this.editAdapterInput({
        type,
        input,
        inputKey,
        value: event.target.value,
        requestId: this.selectedData()._id,
        adapterId: adapter._id,
      });
    },
  },
};
</script>