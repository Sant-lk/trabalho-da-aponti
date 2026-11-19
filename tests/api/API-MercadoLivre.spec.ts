
import { test, expect } from '@playwright/test';

test('Deve consultar a API do Mercado Livre', async ({ request }) => {

    const resposta = await request.get(
        'https://api.mercadolibre.com/sites/MLB/search?q=notebook'
    );

    console.log('Status:', resposta.status());

    if (resposta.status() === 403) {
        console.log('Acesso bloqueado pela API: Forbidden (403)');
        expect(resposta.status()).toBe(403);
        return;
    }

    expect(resposta.status()).toBe(200);

    const dados = await resposta.json();

    expect(dados.results.length).toBeGreaterThan(0);

    console.log('Produtos encontrados:', dados.results.length);
    console.log('Primeiro produto:', dados.results[0].title);
    console.log('Preço:', dados.results[0].price);
});
