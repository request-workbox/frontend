import { shallowMount } from '@vue/test-utils'
import RequestTableToolbar from '@/components/RequestTableToolbar.vue'

describe('RequestTableToolbar.vue - Renders buttons', () => {

  it('renders prev button', () => {
    const msg = 'Prev'
    const wrapper = shallowMount(RequestTableToolbar, {
      propsData: { }
    })
    expect(wrapper.find('#table-toolbar-prev').text()).toMatch(msg)
  })

  it('renders next button', () => {
    const msg = 'Next'
    const wrapper = shallowMount(RequestTableToolbar, {
      propsData: { }
    })
    expect(wrapper.find('#table-toolbar-next').text()).toMatch(msg)
  })

  it('renders pagination', () => {
    const msg = '2 / 60'
    const wrapper = shallowMount(RequestTableToolbar, {
      propsData: {
        page: 2,
        totalPages: 60
      }
    })
    expect(wrapper.find('#table-toolbar-pagination').text()).toMatch(msg)
  })

  it('renders filter public button', () => {
    const msg = 'Public'
    const wrapper = shallowMount(RequestTableToolbar, {
      propsData: {}
    })
    expect(wrapper.find('#table-toolbar-filter-public').text()).toMatch(msg)
    
  })

  it('renders filter private button', () => {
    const msg = 'Private'
    const wrapper = shallowMount(RequestTableToolbar, {
      propsData: {}
    })
    expect(wrapper.find('#table-toolbar-filter-private').text()).toMatch(msg)
  })

  it('renders filter active button', () => {
    const msg = 'Active'
    const wrapper = shallowMount(RequestTableToolbar, {
      propsData: {}
    })
    expect(wrapper.find('#table-toolbar-filter-active').text()).toMatch(msg)
  })

  it('renders filter Deleted button', () => {
    const msg = 'Deleted'
    const wrapper = shallowMount(RequestTableToolbar, {
      propsData: {}
    })
    expect(wrapper.find('#table-toolbar-filter-deleted').text()).toMatch(msg)
  })

})

describe('RequestTableToolbar.vue - Renders table toolbar search input', () => {
  it('renders search input placeholder', () => {
    const placeholder = 'Search'
    const msg = null
    const wrapper = shallowMount(RequestTableToolbar, {
      propsData: { }
    })
    expect(wrapper.find('#table-toolbar-search-input').element.placeholder).toBe(placeholder)
    expect(wrapper.find('#table-toolbar-search-input').element.text).toBeUndefined()
  })

})
