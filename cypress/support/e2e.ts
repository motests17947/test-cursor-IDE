// 引入 Cypress 的指令
import './commands'

// 隱藏 Cypress 的 fetch/XHR 請求
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
