<p align="center">
  <a href="https://github.com/BrunooBarross/valex-api">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    $valex-api
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/BrunooBarross/valex-api

$ cd $valex-api

$ npm install

$ npm run dev
```

API:

```
- POST /cards  (autenticada)
    - Rota para cadastrar um novo cartão
    - headers: {"x-api-key": "Api da empresa"}
    - body: {
        "employeeId": "id da empresa integer",
        "type": "tipo do cartão"
    }
- PUT /cards
    - Rota para ativar o cartão
    - headers: {}
    - body: {
        "cardId": "id do cartão integer",
        "securityCode": "código segurança string",
        "password": "senha do cartão string"
    }
- GET /cards/:id
    - Rota para buscar as transações do cartão
    - headers: {}
    - params: { id: id do cartão}
    - body: {}
- PUT /cards/:id/block 
    - Rota para bloquear o cartão
    - headers: {}
    - params: { id: id do cartão}
    - body: {  
	    "password": "senha do cartão"
    }
- PUT /cards/:id/unlock 
    - Rota para desbloquear o cartão
    - headers: {}
    - params: { id: id do cartão}
    - body: {  
	    "password": "senha do cartão"
    }
- POST /cards/:id/recharge  (autenticada)
    - Rota para recarregar um cartão
    - headers: {"x-api-key": "Api da empresa"}
    - body: {
        "amount": "valor de recarga integer"
    }
- POST /cards/:id/recharge
    - Rota para realizar um pagamento
    - headers: {}
    - body: {
        "cardId": "id do cartão integer",
        "password": "senha do cartão string",
        "businessId": "id da empresa integer",
        "amount": "valor do pagamento integer"
    }
```
