# Implementação API 1

## URL
https://jsonplaceholder.typicode.com/posts

## Método
POST

## Script de teste

```javascript
pm.test("Status code é 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Resposta possui id", function () {
    var json = pm.response.json();
    pm.expect(json.id).to.exist;
});
```