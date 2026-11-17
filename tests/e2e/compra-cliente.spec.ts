
import { test, expect } from '@playwright/test';
import { LoginPage} from '../../pages/login-cliente';
import { LojaPage } from '../../pages/lojaPage';
import { CheckoutPage } from '../../pages/checkout-Page';

test('Deve permitir que o cliente realize uma compra na loja', async ({ page }) => {

    const lojaPage = new LojaPage(page);
    const loginPage= new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Dados do cliente
    const email = 'user@system.com';
    const senha = 'UserPassword123';

    // Produto escolhido
    const produto = 'Monitor Gamer Curvo UltraWide 29" IPS';

    // 1. Acessar a loja sem login
    await lojaPage.acessarLoja();

    // 2. Validar produtos
    await lojaPage.validarProduto();

    // 3. Selecionar produto
    await lojaPage.selecionarProduto(produto);

    // 4. Adicionar ao carrinho
    await lojaPage.adicionarAoCarrinho(produto);

    // 5. Acessar carrinho
    await lojaPage.acessarCarrinho();

    // 6. Iniciar checkout
    await lojaPage.iniciarCheckout();

    await expect(page).toHaveURL(/login\.html\?return=checkout/);

await loginPage.realizarLogin(email, senha);

    

    // 9. Validar acesso ao checkout
    await checkoutPage.validarCheckout();

    // 10. Confirmar que o produto chegou ao checkout
    await checkoutPage.validarProdutoNoResumo(produto);

    // 11. Preencher dados de entrega
    await checkoutPage.preencherCPF('52998224725');
    await checkoutPage.preencherCEP('01001000');
    await checkoutPage.preencherNumero('100');
    await checkoutPage.validarEnderecoPreenchido();

    // 12. Selecionar PIX
    await checkoutPage.selecionarPIX();

    // 13. Finalizar compra
    await checkoutPage.finalizarCompra();

    // 14. Validar acesso aos pedidos
    await lojaPage.validarCompraRealizada();

    
});
