import { shallowMount } from '@vue/test-utils'
import RequestOptionsToolbar from '@/components/RequestOptionsToolbar.vue'

describe('RequestOptionsToolbar.vue - Renders buttons', () => {

    it('renders query button', () => {
        const msg = 'Query'
        const wrapper = shallowMount(RequestOptionsToolbar, {
            propsData: {}
        })
        expect(wrapper.find('#request-options-query').text()).toMatch(msg)
    })

    it('renders headers button', () => {
        const msg = 'Headers'
        const wrapper = shallowMount(RequestOptionsToolbar, {
            propsData: {}
        })
        expect(wrapper.find('#request-options-headers').text()).toMatch(msg)
    })

    it('renders body button', () => {
        const msg = 'Body'
        const wrapper = shallowMount(RequestOptionsToolbar, {
            propsData: {}
        })
        expect(wrapper.find('#request-options-body').text()).toMatch(msg)
    })

    it('renders plugins button', () => {
        const msg = 'Plugins'
        const wrapper = shallowMount(RequestOptionsToolbar, {
            propsData: {}
        })
        expect(wrapper.find('#request-options-plugins').text()).toMatch(msg)
    })

    it('renders details button', () => {
        const msg = 'Details'
        const wrapper = shallowMount(RequestOptionsToolbar, {
            propsData: {}
        })
        expect(wrapper.find('#request-options-details').text()).toMatch(msg)
    })

})