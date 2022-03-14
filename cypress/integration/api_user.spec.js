const {id, userName, firstName, lastName, email, password, phone, userStatus, updatedPhone} = require("../fixtures/api_data.json")

describe("API tests", () => {
    it("Should create new user", () => {
        cy.createUser(id[0], userName[0], firstName, lastName, email, password, phone, userStatus)
        .then((response) => {
              cy.log(JSON.stringify(response));
              expect(response.status).to.eql(200);
              expect(response.body.message).to.eql(`${id[0]}`);  
        });
        cy.wait(5000);
        // дополнительно проверяем, что такой user, действительно существует
        cy.getUser(userName[0]).then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body.id).to.eql(id[0]);
        expect(response.body.username).to.eql(`${userName[0]}`);
        }); 
        cy.wait(5000);
        // удаляем user, чтобы это не мешало другим тестам
        cy.deleteUser(userName[0]);    
    });

    it("Should update user phone", () => {
        cy.createUser(id[1], userName[1], firstName, lastName, email, password, phone, userStatus);
        cy.wait(5000);
        cy.updateUser(id[1], userName[1], firstName, lastName, email, password, updatedPhone, userStatus)
        .then((response) => {
            expect(response.status).to.eql(200);
            expect(response.body.message).to.eql(`${id[1]}`);
        });
        cy.wait(5000);
        // еще раз убеждаемся, что у пользователя обновился номер телефона
        cy.getUser(userName[1]).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.body.phone).to.eql(`${updatedPhone}`);
        });
        // удаляем user, чтобы это не мешало другим тестам
        cy.deleteUser(userName[1]); 
    });

    it("Should delete user", () => { 
        cy.createUser(id[2], userName[2], firstName, lastName, email, password, phone, userStatus)
        .then((response) => {
            cy.log(JSON.stringify(response));
        });
        cy.wait(5000);
        cy.deleteUser(userName[2]).then((response) => {
             cy.log(JSON.stringify(response.body));
             expect(response.status).to.eql(200);
             expect(response.body.message).to.eql(`${userName[2]}`);
         });
         cy.wait(5000);
        // дополнительно проверяем, что теперь такого user, действительно, нет
        cy.getUser(userName[2]).then((response) => {
            expect(response.status).to.eql(404);
            expect(response.body.type).to.eql('error');
            expect(response.body.message).to.eql('User not found');
        });
    });
});