import { test, expect } from '@playwright/test';

test('Deve filtrar produtos com preço máximo de 300 reais', async ({ page }) => {

    // Configurar tamanho da tela
    await page.setViewportSize({ width: 1600, height: 1000 });

    // Acessar loja
    await page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/loja.html');

    // Aplicar filtro de preço máximo
    await page.locator('#maxPrice').fill('300');

    // Localizar produtos
    const produtos = page.locator('.product-card');

    // Validar que os produtos foram encontrados
    await expect(produtos.first()).toBeVisible();

    // Contar produtos encontrados
    const quantidade = await produtos.count();

    // Verificar preço de cada produto
    for (let i = 0; i < quantidade; i++) {

        const precoTexto = await produtos.nth(i)
            .locator('.product-bottom strong')
            .innerText();

        const preco = Number(
            precoTexto
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim()
        );

        expect(preco).toBeLessThanOrEqual(300);
    }

    // Exibir resultado no terminal
    console.log(`${quantidade} produtos encontrados com preço até R$ 300`);

    // Rolar a tela para mostrar os produtos
    await produtos.first().scrollIntoViewIfNeeded();

    // Descer mais para visualizar preços e estoques
    await page.evaluate(() => window.scrollBy(0, 350));

    // Manter navegador aberto para apresentação
   await page.waitForTimeout(3000);
});