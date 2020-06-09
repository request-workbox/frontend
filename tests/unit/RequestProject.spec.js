import { shallowMount } from '@vue/test-utils'
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

describe('RequestProject.vue - Renders project name', () => {
  it('renders project name based on incoming prop', () => {
    const projectName = 'Project Name'
    const wrapper = shallowMount(RequestProject, {
      propsData: { projectName }
    })
    expect(wrapper.find('#project-name-input').element.value).toBe(projectName)
  })

})
