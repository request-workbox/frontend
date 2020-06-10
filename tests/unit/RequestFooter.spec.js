import { shallowMount } from '@vue/test-utils'
import RequestFooter from '@/components/RequestFooter.vue'

describe('RequestFooter.vue - Renders buttons', () => {

    it('renders footer text', () => {
        const msg = 'Footer'
        const wrapper = shallowMount(RequestFooter, {
            propsData: {}
        })
        expect(wrapper.find('#request-footer-text').text()).toMatch(msg)
    })

})