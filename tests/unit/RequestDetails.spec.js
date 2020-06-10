import { shallowMount } from '@vue/test-utils'
import RequestDetails from '@/components/RequestDetails.vue'

describe('RequestDetails.vue - Renders text', () => {

    it('renders request name', () => {
        const msg = 'Request Name'
        const wrapper = shallowMount(RequestDetails, {
            propsData: {}
        })
        expect(wrapper.find('#request-details-name').text()).toMatch(msg)
    })

    it('renders last edited', () => {
        const msg = 'Last Edited'
        const wrapper = shallowMount(RequestDetails, {
            propsData: {}
        })
        expect(wrapper.find('#request-details-last-edited').text()).toMatch(msg)
    })

})