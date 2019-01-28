import { shallowMount, createLocalVue } from '@vue/test-utils'
import CodeEditor from '@/components/CodeEditor.vue'
import VTooltip from 'v-tooltip'

const localVue = createLocalVue()
localVue.use(VTooltip)


describe('CodeEditor.vue', () => {

    const wrapper = shallowMount(CodeEditor, {
      localVue,
      propsData: {
        query:  {
	              name: 'All Orders',
	              id: 2,
	              code: `SELECT * ORDERS;`
	            }
      },
      stubs: ['monaco-editor']
    })
    
	it('Check props data by passing a query', () => {

	    expect(wrapper.props().query.name).toBe('All Orders')
	    expect(wrapper.props().query.id).toBe(2)
	    expect(wrapper.props().query.code).toBe(`SELECT * ORDERS;`)

	})

	it('on initial load query is not executed', () => {

	  	expect(wrapper.classes('query-output')).toBe(false)
	  	
	})

})