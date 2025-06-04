describe('表單提交', () => {
  beforeEach(() => {
    cy.visit('/form')
  })

  it('成功提交表單時顯示對話框', () => {
    // 填寫表單
    cy.get('#name').type('測試姓名')
    cy.get('#phone').type('0912345678')
    cy.get('#address').type('測試住址')
    cy.get('#birthday').type('2000-01-01')

    // 提交表單
    cy.get('button[type="submit"]').click()

    // 驗證對話框是否顯示
    cy.get('.p-dialog').should('be.visible')
    cy.get('.p-dialog').should('contain', '表單已成功提交！')
  })
})
