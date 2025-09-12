describe("Flujos de Registro en NodoVerde", () => {
  let users: any

  before(() => {
    cy.fixture("users").then((data) => {
      users = data
    })
  })

  beforeEach(() => {
    cy.visit("/register")
  })

  it("Registro exitoso con datos válidos", () => {
    cy.wait(1000)
    cy.get("body").then(($body) => {
  cy.log($body.html()) 
})
    cy.get("#register-email").type(users.newUser.email)
    cy.get("#register-password").type(users.newUser.password)
    cy.get("#register-confirm-password").type(users.newUser.password)
    cy.get("#register-terms").click()
    cy.get("#register-submit").click()


    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Registro exitoso")
    })
  })

  it("Mostrar error si las contraseñas no coinciden", () => {
    cy.get("#register-email").type(users.newUser.email)
    cy.get("#register-password").type(users.newUser.password)
    cy.get("#register-confirm-password").type(users.newUser.password)
    cy.get("#register-terms").click()
    cy.get("#register-submit").click()


    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Las contraseñas no coinciden")
    })
  })

  it("Mostrar error si no se aceptan los términos", () => {
    cy.get('[data-cy="register-email"]').type(users.invalidUser.email)
    cy.get('[data-cy="register-password"]').type(users.validUser.password)
    cy.get('[data-cy="register-confirm-password"]').type(users.validUser.password)
    cy.get('[data-cy="register-submit"]').click()

    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Debes aceptar los términos y condiciones")
    })
  })
})
