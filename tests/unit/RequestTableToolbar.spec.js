import { shallowMount, createLocalVue } from '@vue/test-utils'
import { cloneDeep } from 'lodash'
import Vuex from 'vuex'
import RequestTableToolbar from '@/components/RequestTableToolbar.vue'
import requestTable from '@/shared/plugins/modules/RequestTable'

describe('RequestTableToolbar.vue - getters render data correctly', () => {

  const localVue = createLocalVue()
  localVue.use(Vuex)

  let store
  let requestModule
  let requestTableModule

  beforeEach(() => {
    requestTable.state.allRequests = [{ isActive: true }]
    requestTableModule = cloneDeep(requestTable)
    
    requestModule = {
      namespaced: true,
      state: {
        apiUrl: 'http://localhost:3000',
      },
      modules: {
        requestTable: requestTableModule,
      }
    }

    store = new Vuex.Store({
      modules: {
        request: requestModule,
      }
    })

  })

  it('displays pagination correctly', async () => {
    const paginationText = '1 / 1'
    const wrapper = shallowMount(RequestTableToolbar, {
      store,
      localVue,
      propsData: { }
    })

    await wrapper.vm.$nextTick()

    const pagination = wrapper.find('#table-toolbar-pagination')
    expect(pagination.text()).toMatch(paginationText)
  })

})


