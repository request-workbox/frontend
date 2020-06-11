import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import RequestProject from '@/components/RequestProject.vue'

describe('RequestProject.vue - Renders buttons', () => {

  it('renders share button', () => {
    const msg = 'Share'
    const wrapper = shallowMount(RequestProject, {
      propsData: { }
    })
    expect(wrapper.find('#project-share-button').text()).toMatch(msg)
  })

  it('renders team button', () => {
    const msg = 'Team'
    const wrapper = shallowMount(RequestProject, {
      propsData: { }
    })
    expect(wrapper.find('#project-team-button').text()).toMatch(msg)
  })

})

describe('RequestProject.vue - Initializes properly', () => {

  it('sets initial data', () => {
    const defaultData = RequestProject.data()
    expect(defaultData.editing).toBe(false)
    expect(defaultData.updatedProjectName).toBe('')
  })

  it('renders project name based on incoming prop', () => {
    const projectName = 'Project Name'
    const wrapper = shallowMount(RequestProject, {
      propsData: { projectName }
    })
    expect(wrapper.find('#project-name-input').element.value).toBe(projectName)
  })

})

describe('RequestProject.vue - Input responds to change event', () => {

  it('input event sets editing to true', async () => {
    const wrapper = shallowMount(RequestProject)
    const input = wrapper.find('#project-name-input')
    await input.trigger('input')

    expect(wrapper.vm.$data.editing).toBe(true)
  })

  it('focusin event sets editing to false', async () => {
    const wrapper = shallowMount(RequestProject)
    const input = wrapper.find('#project-name-input')
    await input.trigger('focusin')

    expect(wrapper.vm.$data.editing).toBe(false)
  })

})



describe('RequestProject.vue - Input responds to async events', () => {

  const localVue = createLocalVue()
  localVue.use(Vuex)

  let actions
  let store

  beforeEach(() => {
    actions = {
      updateAction: jest.fn(),
    }
    const requestProject = {
      namespaced: true,
      actions
    }
    const requestModule = {
      namespaced: true,
      modules: {
        requestProject
      }
    }
    store = new Vuex.Store({
      modules: {
        request: requestModule
      }
    })
  })

  it('focusout event dispatches action', async () => {
    const projectName = 'Project Name'
    const wrapper = shallowMount(RequestProject, {
      store,
      localVue,
      propsData: { projectName }
    })

    const updatedProjectName = `${projectName}1`
    const input = wrapper.find('#project-name-input')

    await input.setValue(updatedProjectName)
    await input.trigger('focusout')

    expect(wrapper.vm.$data.updatedProjectName).toBe(updatedProjectName)
    expect(actions.updateAction).toHaveBeenCalled()
  })

})

