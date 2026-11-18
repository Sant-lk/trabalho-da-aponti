
import { test, expect } from '../../fixtures/authFixtures';
import { LoginPage } from '../../pages/login-cliente';
import { LojaPage } from '../../pages/lojaPage';
import { CheckoutPage } from '../../pages/checkout-Page';

test('Deve permitir que o cliente realize uma compra na loja', async ({ page, loginCliente }) => {

    const lojaPage = new LojaPage(page);
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    const produto = 'Mouse Óptico Atlas Pro 16000 DPI';

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

    // 7. Realizar login com a fixture
    await loginPage.realizarLogin(loginCliente.email, loginCliente.senha);

    // 8. Validar checkout
    await checkoutPage.validarCheckout();

    // 9. Confirmar produto no resumo
    await checkoutPage.validarProdutoNoResumo(produto);

    // 10. Preencher dados de entrega
    await checkoutPage.preencherCPF('52998224725');
    await checkoutPage.preencherCEP('01001000');
    await checkoutPage.preencherNumero('100');
    await checkoutPage.validarEnderecoPreenchido();

    // 11. Selecionar PIX
    await checkoutPage.selecionarPIX();

    // 12. Finalizar compra
    await checkoutPage.finalizarCompra();

    // 13. Validar acesso aos pedidos
    await lojaPage.validarCompraRealizada();
});
