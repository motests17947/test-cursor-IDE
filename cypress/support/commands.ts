export {}

// 在這裡可以定義自定義的 Cypress 指令
declare global {
  namespace Cypress {
    interface Chainable {
      // 可以在這裡定義自定義指令
    }
  }
}
