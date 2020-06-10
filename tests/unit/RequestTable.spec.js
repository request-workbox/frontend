import { shallowMount } from '@vue/test-utils'
import RequestTable from '@/components/RequestTable.vue'

describe('RequestTable.vue - Renders table headers', () => {

  it('renders table header 1', () => {
    const msg = 'Heading 1'
    const wrapper = shallowMount(RequestTable, {
      propsData: { }
    })
    expect(wrapper.find('#table-header-1').text()).toMatch(msg)
  })

  it('renders table header 2', () => {
    const msg = 'Heading 2'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-header-2').text()).toMatch(msg)
  })

  it('renders table header 3', () => {
    const msg = 'Heading 3'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-header-3').text()).toMatch(msg)
  })

  it('renders table header 4', () => {
    const msg = 'Heading 4'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-header-4').text()).toMatch(msg)
  })

})

describe('RequestTable.vue - Renders table data', () => {

  it('renders table data 1', () => {
    const msg = 'Value 1'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-data-1').text()).toMatch(msg)
  })

  it('renders table data 2', () => {
    const msg = 'Value 2'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-data-2').text()).toMatch(msg)
  })

  it('renders table data 3', () => {
    const msg = 'Value 3'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-data-3').text()).toMatch(msg)
  })

  it('renders table data 4', () => {
    const msg = 'Value 4'
    const wrapper = shallowMount(RequestTable, {
      propsData: {}
    })
    expect(wrapper.find('#table-data-4').text()).toMatch(msg)
  })

})
