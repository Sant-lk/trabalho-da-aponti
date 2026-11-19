import { test, expect } from '@playwright/test';

test('Deve validar os detalhes do produto', async ({ page }) => {

    await page.setViewportSize({ width: 1600, height: 1000 });

    await page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/loja.html');

    // Localizar produto específico
    const produto = page.locator('.product-card')
        .filter({ hasText: 'PRD-11710' });

    // Validar presença do produto
    await expect(produto).toBeVisible();

    // Validar nome
    await expect(produto.locator('h3'))
        .toHaveText('Mouse Óptico Atlas Pro 16000 DPI');

    // Validar código
    await expect(produto.locator('.product-id-badge'))
        .toContainText('PRD-11710');

    // Validar preço
    await expect(produto.locator('.product-bottom strong'))
        .toHaveText('R$ 149,90');

    // Validar descrição
    await expect(produto.locator('p'))
        .toBeVisible();

    // Validar estoque
    await expect(produto.locator('.stock-available'))
        .toBeVisible();

    // Mostrar produto na tela
    await produto.scrollIntoViewIfNeeded();

    await page.evaluate(() => window.scrollBy(0, 350));

    console.log('Produto validado: Mouse Óptico Atlas Pro 16000 DPI');

    await page.waitForTimeout(3000);
});