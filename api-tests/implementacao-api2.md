# Implementação API 2

## URL
https://jsonplaceholder.typicode.com/posts/1

## Método
PUT

## Script de teste

```javascript
pm.test("Status code é 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Título atualizado corretamente", function () {
    var json = pm.response.json();
    pm.expect(json.title).to.eql("teste atualizado");
});
```