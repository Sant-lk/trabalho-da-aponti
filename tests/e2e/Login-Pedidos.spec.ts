
import { test } from '@playwright/test';
import { LoginLojistaPage } from '../../pages/Login-Lojista';
import { PedidosLojistaPage } from '../../pages/Pedidos-Lojista';

test('Deve permitir que o lojista acesse e consulte os pedidos', async ({ page }) => {

    const loginPage = new LoginLojistaPage(page);
    const pedidosPage = new PedidosLojistaPage(page);

    const email = 'lojistagamer@system.com';
    const senha = 'SellerPass123';

    // 1. Acessar a página de login
    await page.goto(
        'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html'
    );

    // 2. Realizar login como lojista
    await loginPage.realizarLogin(email, senha);

    // 3. Validar acesso ao painel
    await pedidosPage.validarPainel();

    // 4. Localizar pedidos recebidos
    await pedidosPage.localizarPedidos();

    // 5. Listar pedidos no terminal
    await pedidosPage.listarPedidos();

});
