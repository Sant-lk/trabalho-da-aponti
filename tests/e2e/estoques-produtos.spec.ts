import { test, expect } from '@playwright/test';

test('Deve validar produtos disponíveis e esgotados', async ({ page }) => {

    await page.setViewportSize({ width: 1600, height: 1000 });

    await page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/loja.html');

    // Produto disponível
    const produtoDisponivel = page.locator('.product-card')
        .filter({ hasText: 'PRD-11710' });

    await expect(produtoDisponivel).toBeVisible();

    await expect(produtoDisponivel.locator('.stock-available'))
        .toBeVisible();

    // Produto esgotado
    const produtoEsgotado = page.locator('.product-card')
        .filter({ hasText: 'PRD-11711' });

    await expect(produtoEsgotado).toBeVisible();

    await expect(produtoEsgotado)
        .toContainText('Esgotado');

    await expect(produtoEsgotado)
        .toContainText('Fora de estoque');

   // Mostrar a informação de estoque na tela
await produtoEsgotado.getByText('Fora de estoque')
    .scrollIntoViewIfNeeded();

await page.waitForTimeout(3000);

    console.log('Produto disponível e produto esgotado validados');

    await page.waitForTimeout(3000);
});