# FIND FRIEND API
## Routes

### Create an Organization
- **Route:** `POST /orgs`
- **Controller:** `createOrgController`
- **Description:** This route is used to create a new organization.

### Authenticate an Organization
- **Route:** `POST /orgs/authenticate`
- **Controller:** `authenticateOrgController`
- **Description:** This route is used to authenticate an organization.

### Create a Pet for an Organization
- **Route:** `POST /org/pet/create`
- **Controller:** `createPetController`
- **Middleware:** `verifyJwt`
- **Description:** This route is used to create a new pet for an organization. It requires authentication using a JSON Web Token (JWT).

### Find Multiple Pets
- **Route:** `GET /pets`
- **Controller:** `findManyPetsController`
- **Description:** This route is used to find multiple pets.

### Find a Unique Pet by ID
- **Route:** `GET /pet/:id`
- **Controller:** `findUniquePet`
- **Description:** This route is used to find a unique pet by its ID.

// Route to create an organization
     app.post('/orgs', createOrgController);

     // Route to authenticate an organization
     app.post('/orgs/authenticate', authenticateOrgController);

     // Route to create a pet for an organization
     app.post('/org/pet/create', { onRequest: [verifyJwt] }, createPetController);

     // Route to find multiple pets
     app.get('/pets', findManyPetsController);

     // Route to find a unique pet by ID
     app.get('/pet/:id', findUniquePet);


### Regras da aplicação

- Deve ser possível cadastrar um pet
- Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- Deve ser possível filtrar pets por suas características
- Deve ser possível visualizar detalhes de um pet para adoção
- Deve ser possível se cadastrar como uma ORG
- Deve ser possível realizar login como uma ORG

### Regras de negócio

- Para listar os pets, obrigatoriamente precisamos informar a cidade
- Uma ORG precisa ter um endereço e um número de WhatsApp
- Um pet deve estar ligado a uma ORG
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- Todos os filtros, além da cidade, são opcionais
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada