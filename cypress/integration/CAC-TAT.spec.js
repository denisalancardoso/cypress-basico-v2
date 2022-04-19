/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {

        cy.visit('./src/index.html')

    })

    it('Verifica o título da aplicação', () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {

        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste.'

        cy.get('input[id="firstName"]')
            .type('Joãozinho')

        cy.get('input[id="lastName"]')
            .type('trinta')

        cy.get('input[id="email"]')
            .type('joaozinho30@teste.com')

        cy.get('textarea[id="open-text-area"]')
            .type(longText, { delay: 0 })

        cy.get('button[type="submit"]')
            .should('be.enabled')
            .click('center')

        cy.get('.success')
            .should('be.visible')

        cy.get('span[class="success"] > strong')
            .should('have.text', 'Mensagem enviada com sucesso.')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

        cy.get('input[id="firstName"]')
            .type('Joãozinho')
            .should('have.value', 'Joãozinho')

        cy.get('input[id="lastName"]')
            .type('trinta')
            .should('have.value', 'trinta')

        cy.get('input[id="email"]')
            .type('joaozinho30@teste,com')

        cy.get('textarea[id="open-text-area"]')
            .type('Cypress Básico', { delay: 0 })
            .should('have.value', 'Cypress Básico')

        cy.contains('button', 'Enviar')
            .click('center')

        cy.get('.error')
            .should('be.visible')

    });

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {


        cy.get('input[id="phone"]')
            .type('abcdefghij')
            .should('have.value', '')

    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {

        cy.get('input[id="firstName"]')
            .type('Joãozinho')
            .should('have.value', 'Joãozinho')

        cy.get('input[id="lastName"]')
            .type('trinta')
            .should('have.value', 'trinta')

        cy.get('input[id="email"]')
            .type('joaozinho30@teste.com')

        cy.get('input[id="phone-checkbox"]')
            .check()

        cy.get('textarea[id="open-text-area"]')
            .type('Cypress Básico', { delay: 0 })
            .should('have.value', 'Cypress Básico')

        cy.contains('button', 'Enviar')
            .click('center')

        cy.get('.error')
            .should('be.visible')

    });

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('input[id="firstName"]')
            .should('be.visible')
            .type('Joãozinho')
            .should('have.value', 'Joãozinho')
            .clear()
            .should('have.value', '')

        cy.get('input[id="lastName"]')
            .should('be.visible')
            .type('trinta')
            .should('have.value', 'trinta')
            .clear()
            .should('have.value', '')

        cy.get('input[id="email"]')
            .should('be.visible')
            .type('joaozinho30@teste.com')
            .should('have.value', 'joaozinho30@teste.com')
            .clear()
            .should('have.value', '')

        cy.get('input[id="phone"]')
            .type('12345678910')
            .should('have.value', '12345678910')
            .clear()
            .should('have.value', '')

    });

    it('Exibe mensagem de erro ao submeter formulário sem preencher campos obrigatórios', () => {

        cy.contains('button', 'Enviar')
            .click('center')

        cy.get('.error')
            .should('be.visible')

    });

    it('Envia o formulário com sucesso usando um comando customizado', () => {

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success')
            .should('be.visible')

    });

    it('Seleciona um produto (Youtube) por seu texto', () => {

        cy.get('select[id="product"]')
            .select('YouTube')
            .should('have.value', 'youtube')

    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {

        const mentoria = 'mentoria'

        cy.get('select[id="product"]')
            .select(mentoria)
            .should('have.value', mentoria)

    })

    it('Seleciona um produto (Blog) por seu índice', () => {

        cy.get('select[id="product"]')
            .select(1)
            .should('have.value', 'blog')

    })

    it('Marca o tipo de atendimento "Feedback"', () => {

        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')

        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value', 'feedback')

    });

    it('Marca cada tipo de atendimento', () => {

        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {

                cy.wrap($radio)
                    .check()
                cy.wrap($radio)
                    .should('be.checked')

            })

    })

    it('Marcar ambos checkboxes, depois desmarca o último', () => {

        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })

    it('Seleciona um arquivo da pasta fixtures', () => {

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(($input) => {

                expect($input[0].files[0].name).to.equal('example.json')

            })

    });

    it('Seleciona um arquivo simulando um drag-and-drop', () => {

        // drag-drop simula estar arrastando o arquivo para upload.

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) => {

                expect($input[0].files[0].name).to.equal('example.json')

            })

    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

        cy.fixture('example.json')
            .as('sampleFile')

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(($input) => {

                expect($input[0].files[0].name).to.equal('example.json')

            })

    });

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {

        cy.get('[href="privacy.html"]')
            .should('have.attr', 'target', '_blank')

    });

    it('Acessa a página da política de privacidade removendo o target e então clicanco no link', () => {

        cy.get('[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click('center')

        cy.contains('Talking About Testing').should('be.visible')

    });

})

// https://cac-tat.s3.eu-central-1.amazonaws.com/index.html
// https://github.com/wlsf82/cypress-basico-v2/blob/main/lessons/