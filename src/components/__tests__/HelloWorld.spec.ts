import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('正確渲染傳入的 msg props', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: '測試訊息' },
    })
    expect(wrapper.text()).toContain('測試訊息')
  })
})
