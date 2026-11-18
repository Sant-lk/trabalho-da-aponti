
import { test, expect } from '@playwright/test';

test('Deve consultar produtos da Americanas usando GET', async ({ request }) => {

    const resposta = await request.get(
        'https://www.americanas.com.br/api/catalog_system/pub/products/search',
        {
            params: {
                ft: 'notebook',
                _from: '0',
                _to: '9'
            },
            headers: {
                Accept: 'application/json'
            },
            timeout: 20000
        }
    );

    console.log('Status:', resposta.status());

   expect([200, 206]).toContain(resposta.status());

    const produtos = await resposta.json();

    expect(produtos.length).toBeGreaterThan(0);

    console.log('Produtos encontrados:', produtos.length);
    console.log('Primeiro produto:', produtos[0].productName);

});
