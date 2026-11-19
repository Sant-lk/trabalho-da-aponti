
import { test, expect } from '@playwright/test';

test('Deve filtrar produtos por categoria e preço máximo', async ({ request }) => {

    const resposta = await request.get(
        'https://api-qa-fap2026.onrender.com/api/products',
        {
            params: {
                category: 'Periféricos',
                maxPrice: '300'
            }
        }
    );

    expect(resposta.status()).toBe(200);

    const dados = await resposta.json();

    const produtos = dados.products ?? dados;

    expect(produtos.length).toBeGreaterThan(0);

    for (const produto of produtos) {
        expect(produto.category).toBe('Periféricos');
        expect(produto.price).toBeLessThanOrEqual(300);
    }

    console.log('Produtos encontrados:', produtos.length);
    console.log('Categoria: Periféricos');
    console.log('Preço máximo: R$ 300');
});
