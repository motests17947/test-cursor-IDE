import { describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { type ComponentPublicInstance } from 'vue'
import FormView from '../FormView.vue'
import PrimeVue from 'primevue/config'

interface FormViewInstance extends ComponentPublicInstance {
  formData: {
    name: string
    phone: string
    address: string
    birthday: Date | null
  }
  errors: {
    name: string
    phone: string
    address: string
    birthday: string
  }
  showSuccessDialog: boolean
  submitForm: () => void
  // 如果有其他需要直接存取的屬性或方法，也可以在這裡定義
}

describe('FormView', () => {
  beforeEach(() => {
    // Clear the document body before each test to avoid DOM pollution
    document.body.innerHTML = ''
  })

  it('表單驗證：未填寫時顯示錯誤訊息', async () => {
    const wrapper = mount(FormView, {
      global: {
        plugins: [PrimeVue],
      },
      attachTo: document.body,
    })
    const vm = wrapper.vm as FormViewInstance
    await vm.submitForm()
    await wrapper.vm.$nextTick()

    console.log('Errors state (initial validation):', vm.errors)
    console.log('Wrapper HTML (initial validation):', wrapper.html())

    expect(wrapper.find('#name-error').exists()).toBe(true)
    expect(wrapper.find('#name-error').text()).toContain('請輸入姓名')
    expect(wrapper.find('#phone-error').exists()).toBe(true)
    expect(wrapper.find('#phone-error').text()).toContain('請輸入電話號碼')
    expect(wrapper.find('#address-error').exists()).toBe(true)
    expect(wrapper.find('#address-error').text()).toContain('請輸入住址')
    expect(wrapper.find('#birthday-error').exists()).toBe(true)
    expect(wrapper.find('#birthday-error').text()).toContain('請選擇生日日期')
  })

  it('表單驗證：電話號碼格式錯誤', async () => {
    const wrapper = mount(FormView, {
      global: {
        plugins: [PrimeVue],
      },
      attachTo: document.body,
    })
    await wrapper.find('#name').setValue('測試姓名')
    await wrapper.find('#phone').setValue('無效電話')
    await wrapper.find('#address').setValue('測試住址')
    const vm = wrapper.vm as FormViewInstance
    vm.formData.birthday = new Date('2000-01-01')

    await vm.submitForm()
    await wrapper.vm.$nextTick()

    console.log('Errors state (phone validation):', vm.errors)
    console.log('Wrapper HTML (phone validation):', wrapper.html())

    expect(wrapper.find('#phone-error').exists()).toBe(true)
    expect(wrapper.find('#phone-error').text()).toContain('請輸入有效的電話號碼')
  })

  it('表單提交成功時顯示對話框', async () => {
    const wrapper = mount(FormView, {
      global: {
        plugins: [PrimeVue],
        stubs: { teleport: false },
      },
      attachTo: document.body,
    })
    const vm = wrapper.vm as FormViewInstance
    await wrapper.find('#name').setValue('測試姓名')
    await wrapper.find('#phone').setValue('0912345678')
    await wrapper.find('#address').setValue('測試住址')
    vm.formData.birthday = new Date('2000-01-01')

    await vm.submitForm()
    await wrapper.vm.$nextTick()
    await flushPromises()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await wrapper.vm.$nextTick()
    await flushPromises()

    console.log('showSuccessDialog state:', vm.showSuccessDialog)
    console.log('Wrapper HTML (success dialog):', wrapper.html())

    expect(vm.showSuccessDialog).toBe(true)
  })
})
