import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import RequestMenu from '@/components/RequestMenu.vue'

describe('RequestMenu.vue - Renders buttons', () => {

    it('renders new request button', () => {
        const msg = 'New Request'
        const wrapper = shallowMount(RequestMenu, {
            propsData: {}
        })
        expect(wrapper.find('#menu-new-request').text()).toMatch(msg)
    })

    it('renders new project button', () => {
        const msg = 'New Project'
        const wrapper = shallowMount(RequestMenu, {
            propsData: {}
        })
        expect(wrapper.find('#menu-new-project').text()).toMatch(msg)
    })

    it('renders new workflow', () => {
        const msg = 'New Workflow'
        const wrapper = shallowMount(RequestMenu, {
            propsData: {}
        })
        expect(wrapper.find('#menu-new-workflow').text()).toMatch(msg)
    })
 
    // it('renders add to workflow', () => {
    //     const msg = 'Add to Workflow'
    //     const wrapper = shallowMount(RequestMenu, {
    //         propsData: {}
    //     })
    //     expect(wrapper.find('#menu-add-to-workflow').text()).toMatch(msg)
    // })

    it('renders test request', () => {
        const msg = 'Test Request'
        const wrapper = shallowMount(RequestMenu, {
            propsData: {}
        })
        expect(wrapper.find('#menu-test-request').text()).toMatch(msg)
    })

})


describe('RequestMenu.vue - Initializes properly', () => {

    it('renders project name based on incoming prop', () => {
        const projectId = 'ABC'
        const requestId = '123'
        const wrapper = shallowMount(RequestMenu, {
            propsData: { projectId, requestId }
        })
        
        expect(wrapper.vm.$props.projectId).toBe(projectId)
        expect(wrapper.vm.$props.requestId).toBe(requestId)
    })

})


describe('RequestMenu.vue - Button events dispatch actions', () => {

    const localVue = createLocalVue()
    localVue.use(Vuex)

    let actions
    let store

    beforeEach(() => {
        actions = {
            newRequest: jest.fn(),
            newWorkflow: jest.fn(),
            newProject: jest.fn(),
            // addToWorkflow: jest.fn(),
            testRequest: jest.fn(),
        }
        const requestMenu = {
            namespaced: true,
            actions
        }
        const requestModule = {
            namespaced: true,
            modules: {
                requestMenu
            }
        }
        store = new Vuex.Store({
            modules: {
                request: requestModule
            }
        })
    })

    it('new request dispatches action', async () => {
        const projectId = 'ABC'
        const wrapper = shallowMount(RequestMenu, {
            store,
            localVue,
            propsData: { projectId }
        })

        const button = wrapper.find('#menu-new-request')
        await button.trigger('click')

        expect(actions.newRequest).toHaveBeenCalled()
    })

    it('new workflow dispatches action', async () => {
        const requestId = '123'
        const wrapper = shallowMount(RequestMenu, {
            store,
            localVue,
            propsData: { requestId }
        })

        const button = wrapper.find('#menu-new-workflow')
        await button.trigger('click')

        expect(actions.newWorkflow).toHaveBeenCalled()
    })

    it('new project dispatches action', async () => {
        const wrapper = shallowMount(RequestMenu, {
            store,
            localVue,
        })

        const button = wrapper.find('#menu-new-project')
        await button.trigger('click')

        expect(actions.newProject).toHaveBeenCalled()
    })

    // it('add to workflow dispatches action', async () => {
    //     const requestId = '123'
    //     const workflowId = 'ABC'
    //     const wrapper = shallowMount(RequestMenu, {
    //         store,
    //         localVue,
    //         propsData: { requestId, workflowId }
    //     })

    //     const button = wrapper.find('#menu-add-to-workflow')
    //     await button.trigger('click')

    //     expect(actions.addToWorkflow).toHaveBeenCalled()
    // })


    it('test request dispatches action', async () => {
        const requestId = '123'
        const wrapper = shallowMount(RequestMenu, {
            store,
            localVue,
            propsData: { requestId }
        })

        const button = wrapper.find('#menu-test-request')
        await button.trigger('click')

        expect(actions.testRequest).toHaveBeenCalled()
    })

})