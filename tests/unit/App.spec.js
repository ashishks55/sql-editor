import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import VTooltip from 'v-tooltip'
import Notifications from 'vue-notification'

const localVue = createLocalVue()
localVue.use(VTooltip)
localVue.use(Notifications)

describe('App.vue', () => {

	const wrapper = shallowMount(App,{
	  localVue
	})

	it('dropdown is closed initially', () => {

		const dropdown = wrapper.find('.dropdown')
		expect(dropdown.classes('is-active')).toBe(false)

	})

	it('on click dropdown opens', () => {

		const dropdown = wrapper.find('.dropdown')
		dropdown.trigger('click')
		expect(dropdown.classes('is-active')).toBe(true)
		
	})

})