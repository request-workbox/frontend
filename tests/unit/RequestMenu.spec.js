import { shallowMount } from '@vue/test-utils'
import RequestMenu from '@/components/RequestMenu.vue'

describe('RequestMenu.vue - Renders buttons', () => {

    it('renders new button', () => {
        const msg = 'New'
        const wrapper = shallowMount(RequestMenu, {
            propsData: {}
        })
        expect(wrapper.find('#menu-new-button').text()).toMatch(msg)
    })

    it('renders save changes', () => {
        const msg = 'Save Changes'
        const wrapper = shallowMount(RequestMenu, {
            propsData: {}
        })
        expect(wrapper.find('#menu-save-changes').text()).toMatch(msg)
    })

    it('renders create workflow', () => {
        const msg = 'Create Workflow'
        const wrapper = shallowMount(RequestMenu, {
            propsData: {}
        })
        expect(wrapper.find('#menu-create-workflow').text()).toMatch(msg)
    })

    it('renders add to workflow', () => {
        const msg = 'Add to Workflow'
        const wrapper = shallowMount(RequestMenu, {
            propsData: {}
        })
        expect(wrapper.find('#menu-add-to-workflow').text()).toMatch(msg)
    })

    it('renders test request', () => {
        const msg = 'Test Request'
        const wrapper = shallowMount(RequestMenu, {
            propsData: {}
        })
        expect(wrapper.find('#menu-test-request').text()).toMatch(msg)
    })

})