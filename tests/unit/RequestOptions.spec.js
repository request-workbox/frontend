import { shallowMount } from '@vue/test-utils'
import RequestOptions from '@/components/RequestOptions.vue'

describe('RequestOptions.vue - Renders options headers', () => {

    it('renders options header checkbox', () => {
        const wrapper = shallowMount(RequestOptions, {
            propsData: {}
        })
        expect(wrapper.find('#options-header-checkbox').element.checked).toBeFalsy()
        expect(wrapper.find('#options-header-checkbox').element.disabled).toBeTruthy()
    })

    it('renders options header 1', () => {
        const msg = 'Heading 1'
        const wrapper = shallowMount(RequestOptions, {
            propsData: {}
        })
        expect(wrapper.find('#options-header-1').text()).toMatch(msg)
    })

    it('renders options header 2', () => {
        const msg = 'Heading 2'
        const wrapper = shallowMount(RequestOptions, {
            propsData: {}
        })
        expect(wrapper.find('#options-header-2').text()).toMatch(msg)
    })

})

describe('RequestOptions.vue - Renders options data', () => {

    it('renders options data checkbox', () => {
        const wrapper = shallowMount(RequestOptions, {
            propsData: {}
        })
        expect(wrapper.find('#options-data-checkbox').element.checked).toBeFalsy()
        expect(wrapper.find('#options-data-checkbox').element.disabled).toBeFalsy()
    })

    it('renders options data 1', () => {
        const msg = 'Value 1'
        const wrapper = shallowMount(RequestOptions, {
            propsData: {}
        })
        expect(wrapper.find('#options-data-1').element.placeholder).toMatch(msg)
    })

    it('renders options data 2', () => {
        const msg = 'Value 2'
        const wrapper = shallowMount(RequestOptions, {
            propsData: {}
        })
        expect(wrapper.find('#options-data-2').element.placeholder).toMatch(msg)
    })

})