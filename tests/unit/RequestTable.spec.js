import { shallowMount } from '@vue/test-utils'
import RequestTable from '@/components/RequestTable.vue'

describe('RequestTable.vue - Renders table headers', () => {

  it('renders table header 1', () => {
    const msg = 'Method'
    const wrapper = shallowMount(RequestTable, {
      propsData: { }
    })
    expect(wrapper.find('#table-header-1').text()).toMatch(msg)
  })

  it('renders table header 2', () => {
    const msg = 'Protocol'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-header-2').text()).toMatch(msg)
  })

  it('renders table header 3', () => {
    const msg = 'Name'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-header-3').text()).toMatch(msg)
  })

  it('renders table header 4', () => {
    const msg = 'Url'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-header-4').text()).toMatch(msg)
  })

})

describe('RequestTable.vue - Renders table data', () => {

  it('renders table data 1', () => {
    const msg = 'GET'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-data-1').text()).toMatch(msg)
  })

  it('renders table data 2', () => {
    const msg = 'HTTPS'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-data-2').text()).toMatch(msg)
  })

  it('renders table data 3', () => {
    const msg = 'API'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-data-3').text()).toMatch(msg)
  })

  it('renders table data 4', () => {
    const msg = 'https://api.com'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-data-4').text()).toMatch(msg)
  })

})
