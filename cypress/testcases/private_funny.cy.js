// Private testcase: funny
const solution = 'funny'
const solList = 'f u n n y'.split(' ')
const KBrow_1 = 'q w e r t y u i o p'.split(' ')
const KBrow_2 = 'a s d f g h j k l'.split(' ')
const KBrow_3 = 'z x c v b n m'.split(' ')

describe('Hack#1 Private Test-2', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080')
    })

    context('Problem 1', () => {
        it('1-1 Keyboard-container exists and the third row is correct', () => {
            cy.get('.Keyboard-container').should('be.visible')
        })
        it('1-2-1 Keyboard-container first row correct', () => {
            const chars = 'q w e r t y u i o p'.split(' ')
            
            cy.get('.Keyboard-container > #KBrow_1')
                .should('have.class', 'Keyboard-row')
                .children().should('have.length', 10)
            
            cy.get('.Keyboard-container > #KBrow_1')
                .children()
                .each(($el, index) => {
                    cy.wrap($el).should('have.text', chars[index])
                    .should('have.id', 'char_'+chars[index])
                }
            )
        })
        it('1-2-2 Keyboard-container second row correct', () => {
            const chars = 'a s d f g h j k l'.split(' ')
            cy.get('.Keyboard-container > #KBrow_2')
                .should('have.class', 'Keyboard-row')
                .children().should('have.length', 9)
            
            cy.get('.Keyboard-container > #KBrow_2')
                .children()
                .each(($el, index) => {
                    cy.wrap($el).should('have.text', chars[index])
                    .should('have.id', 'char_'+chars[index])
                }
            )
        })
    })

    context('Problem 2', () => {
        it('2-1 Board-container exists', () => {
            cy.get('.Board-container').should('be.visible')
        })
        it('2-2-1 There are six Row-containers', () => {
            cy.get('.Board-container > .Row-container').should('have.length', 6)
        })
        it('2-2-2 CurRow is at the first row', () => {
            cy.get('.Board-container > .Row-container')
            .children()
            .eq(0)
            .should('have.class', 'current')
        })
    })

    context('Problem 3', () => {
        it('3-1 curGuess is rendered onto CurRow', () => {
            cy.get('body').type('{a}')
            cy.get('.Row-wrapper.current')
            .children()
            .eq(0)
            .should('have.text', 'a').and('have.id', '0-0')
            cy.get('body').type('{b}').type('{c}').type('{e}')
            cy.get('.Row-wrapper.current').children().eq(1).should('have.text', 'b').and('have.id', '0-1')
            cy.get('.Row-wrapper.current').children().eq(2).should('have.text', 'c').and('have.id', '0-2')
            cy.get('.Row-wrapper.current').children().eq(3).should('have.text', 'e').and('have.id', '0-3')
        })
        it('3-2 Type more than 5 letters', () => {
            const test = ['a','b','c','d','e','f']
            for(let i=0; i < test.length; i+=1){
                cy.get('body').type(`{${test[i]}}`)
            }
            cy.get('.Row-wrapper.current')
            .children()
            .each(($el, index) => {
                cy.wrap($el).should('have.text', test[index]).and('have.id', '0-'+index)
            })
        })
        it('3-3 Backspace is working', () => {
            const test = ['z','x','c','v','backspace','b','n']
            const ans = ['z','x','c','b','n']
            for(let i=0; i < test.length; i+=1){
                cy.get('body').type(`{${test[i]}}`)
            }
            cy.get('.Row-wrapper.current')
            .children()
            .each(($el, index) => {
                cy.wrap($el).should('have.text', ans[index])
            })        
        })
        it('3-4 Filled wordboxes should have class filled', () => {
            cy.get('.Row-wrapper.current')
            .children()
            .each(($el, index) => {
                cy.wrap($el).not('have.class', 'filled')
            })

            cy.get('body').type('{z}').type('{x}')

            cy.get('.Row-wrapper.current')
            .children()
            .each(($el, index) => {
                if(index < 2){
                    if(index == 0) cy.wrap($el).should('have.text', 'z').and('have.class', 'filled')
                    else if(index == 1) cy.wrap($el).should('have.text', 'x').and('have.class', 'filled')
                }
                else{
                    cy.wrap($el).not('have.class', 'filled')
                    cy.wrap($el).should('have.text', '')
                }
            })
        })
    })

    context('Problem 4',() => {
        it('4-1 CurRow change after pressing enter', () => {
            const test = ['a','b','c','d','e','enter']
            for(let i=0; i < test.length; i+=1){
                cy.get('body').type(`{${test[i]}}`)
            }
            cy.get('.Board-container')
            .children()
            .eq(0).get('.Row-wrapper')
            .not('have.class', 'current')

            cy.get('.Board-container')
            .children()
            .eq(1).get('.Row-wrapper')
            .should('have.class', 'current')
        })
        it('4-2 Green rendered correctly (only one line)', () => {
            const test = ['a','a','n','n','y','enter']
            const answer = ['grey','grey','green','green','green']
            for(let i=0; i < test.length; i+=1){
                cy.get('body').type(`{${test[i]}}`)
            }
            cy.get('.Board-container > .Row-container > .Row-wrapper')
            .eq(0).children()
            .each(($el, index) => {
                cy.wrap($el).should('have.class', answer[index]).and('have.text', test[index])
            })
        })
        it('4-3 Green and yellow rendered correctly (only one line)', () => {
            const test = ['n','a','n','a','n','enter']
            const answer = ['yellow','grey','green','grey','grey']
            for(let i=0; i < test.length; i+=1){
                cy.get('body').type(`{${test[i]}}`)
            }
            cy.get('.Board-container > .Row-container > .Row-wrapper')
            .eq(0).children()
            .each(($el, index) => { 
                cy.wrap($el).should('have.class', answer[index]).and('have.text', test[index])
            })
        })
        it('4-4 Multiple Lines Test', ()=>{
            const tests=[
                ['z','x','c','v','b','enter'],
                ['n','n','a','f','n','enter'],
                ['n','n','n','f','f','enter'],
                ['f','n','n','f','y','enter'],
                ['f','u','n','n','y','enter'],
            ]
            const answers=[
                ['grey','grey','grey','grey','grey'],
                ['yellow','yellow','grey','yellow','grey'],
                ['yellow','grey','green','yellow','grey'],
                ['green','yellow','green','grey','green'],
                ['green','green','green','green','green'],
            ]
            for(let line = 0; line < tests.length; line += 1){
                for(let i=0; i < tests[0].length; i+=1){
                    cy.get('body').type(`{${tests[line][i]}}`)
                }
            }

            cy.get('.Board-container')
            .children()
            .each(($el, line) => { 
                if(line<answers.length){
                    cy.wrap($el)
                    .children().eq(0).children()
                    .each(($el, i) => { 
                        cy.wrap($el)
                        .should('have.text', tests[line][i])
                        .should('have.class', answers[line][i])
                        .should('have.id', line+'-'+i)
                    })
                }
            })

        })
    })

    context('Problem 5', () => {
        it('5-1 Render green correctly', () => {
            const test = ['a','a','n','n','y','enter']
            for(let i=0; i < test.length; i+=1){
                cy.get('body').type(`{${test[i]}}`)
            }
            cy.get('.Keyboard-container > .Keyboard-row > #char_n').should('have.class', 'green').and('have.text', 'n')
            cy.get('.Keyboard-container > .Keyboard-row > #char_y').should('have.class', 'green').and('have.text', 'y')
            cy.get('.Keyboard-container > .Keyboard-row > #char_a').should('have.text', 'a').not('have.class', 'green').not('have.class', 'yellow')
            cy.get('.Keyboard-container > .Keyboard-row > #char_f').should('have.text', 'f').not('have.class', 'green').not('have.class', 'yellow')
            cy.get('.Keyboard-container > .Keyboard-row > #char_u').should('have.text', 'u').not('have.class', 'green').not('have.class', 'yellow')
            
        })
        it('5-2 Multiple Lines', () => {
            const tests=[
                ['n','n','a','f','n','enter'],
                ['z','x','c','v','b','enter'],
                ['f','x','n','y','n','enter'],
                ['f','n','n','y','u','enter'],
                ['n','u','f','f','y','enter'],
                ['a','b','c','d','e','enter']
            ]
            // key match with "f u n n y"
            const key_match = [
                ['yellow','','yellow','yellow',''],
                ['yellow','','yellow','yellow',''],
                ['green','','green','green','yellow'],
                ['green','yellow','green','green','yellow'],
                ['green','green','green','green','green'],
                ['green','green','green','green','green'],
            ]
            
            for(let line = 0; line < tests.length; line += 1){
                for(let i=0; i < tests[0].length; i+=1){
                    cy.get('body').type(`{${tests[line][i]}}`)
                }

                for(let i = 0; i < KBrow_1.length; i++){
                    if(!solList.includes(KBrow_1[i])){
                        cy.get('.Keyboard-container > #KBrow_1 > #char_'+KBrow_1[i])
                        .should('have.text', KBrow_1[i])
                        .not('have.class', 'green')
                        .not('have.class', 'yellow')
                    }
                    else{
                        if(key_match[line][solList.indexOf(KBrow_1[i])]){
                            cy.get('.Keyboard-container > #KBrow_1 > #char_'+KBrow_1[i])
                            .should('have.text', KBrow_1[i])
                            .and('have.class', key_match[line][solList.indexOf(KBrow_1[i])])
                        }
                        else{
                            cy.get('.Keyboard-container > #KBrow_1 > #char_'+KBrow_1[i])
                            .should('have.text', KBrow_1[i])
                            .not('have.class', 'green')
                            .not('have.class', 'yellow')
                        }
                    }
                }

                for(let i = 0; i < KBrow_2.length; i++){
                    if(!solList.includes(KBrow_2[i])){
                        cy.get('.Keyboard-container > #KBrow_2 > #char_'+KBrow_2[i])
                        .should('have.text', KBrow_2[i])
                        .not('have.class', 'green')
                        .not('have.class', 'yellow')
                    }
                    else{
                        if(key_match[line][solList.indexOf(KBrow_2[i])]){
                            cy.get('.Keyboard-container > #KBrow_2 > #char_'+KBrow_2[i])
                            .should('have.text', KBrow_2[i])
                            .and('have.class', key_match[line][solList.indexOf(KBrow_2[i])])
                        }
                        else{
                            cy.get('.Keyboard-container > #KBrow_2 > #char_'+KBrow_2[i])
                            .should('have.text', KBrow_2[i])
                            .not('have.class', 'green')
                            .not('have.class', 'yellow')
                        }
                    }
                }

                for(let i = 0; i < KBrow_3.length; i++){
                    if(!solList.includes(KBrow_3[i])){
                        cy.get('.Keyboard-container > #KBrow_3 > #char_'+KBrow_3[i])
                        .should('have.text', KBrow_3[i])
                        .not('have.class', 'green')
                        .not('have.class', 'yellow')
                    }
                    else{
                        if(key_match[line][solList.indexOf(KBrow_3[i])]){
                            cy.get('.Keyboard-container > #KBrow_3 > #char_'+KBrow_3[i])
                            .should('have.text', KBrow_3[i])
                            .and('have.class', key_match[line][solList.indexOf(KBrow_3[i])])
                        }
                        else{
                            cy.get('.Keyboard-container > #KBrow_3 > #char_'+KBrow_3[i])
                            .should('have.text', KBrow_3[i])
                            .not('have.class', 'green')
                            .not('have.class', 'yellow')
                        }
                    }
                }
            }
        })
    })

    context('Problem 6', () => {
        it('6-1 Show winning info', ()=>{
            const tests=[
                ['a','b','c','d','e','enter'],
                ['a','b','m','d','e','enter'],
                ['m','b','c','s','e','enter'],
                ['m','u','i','n','s','enter'],
                ['f','u','n','n','y','enter'],
            ]
            for(let line = 0; line < tests.length; line += 1){
                for(let i=0; i < tests[0].length; i+=1){
                    cy.get('body').type(`{${tests[line][i]}}`)
                }
                if(line != tests.length-1){
                    cy.get('.Wordle-lose').should('have.class', 'Hidden')
                }
            }
            cy.get('.Wordle-win').should('have.text', 'You win!!!!')
        })
        it('6-2 Show losing info', ()=>{
            const tests=[
                ['a','b','c','d','e','enter'],
                ['f','g','h','i','j','enter'],
                ['l','m','n','o','p','enter'],
                ['k','q','r','s','t','enter'],
                ['u','v','w','x','y','enter'],
                ['z','b','c','d','e','enter']
            ]
            for(let line = 0; line < tests.length; line += 1){
                for(let i=0; i < tests[0].length; i+=1){
                    cy.get('body').type(`{${tests[line][i]}}`)
                }
                if(line != tests.length-1){
                    cy.get('.Wordle-lose').should('have.class', 'Hidden')
                }
            }
            cy.get('.Wordle-lose')
            .not('have.class', 'Hidden')
            .should('have.text', 'You lose!!!! The answer is '+ solution + '.')
        })
    })

  })