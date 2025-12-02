describe('Home Page', () => {
  it('should display the title and paragraph', () => {
    cy.visit('http://localhost:5175', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "user",
          JSON.stringify({ email: "test@example.com" })
        );
      }
    });

    cy.reload();  // 让 React 再次读取 localStorage

    cy.contains("Welcome to My Portfolio!").should("exist");
    cy.contains("This is my personal website.").should("exist");
  });
});




/*describe('Home Page', () => {
  it('should display the title and paragraph', () => {
    cy.visit('http://localhost:5175')
 // Vite dev server 默认端口
    cy.contains('Welcome to My Portfolio!').should('exist')
    cy.contains('This is my personal website.').should('exist')
  })
})*/