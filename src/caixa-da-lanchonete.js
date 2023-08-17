class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        this.formasDePagamento = {
            dinheiro: 0.95,
            debito: 1.00,
            credito: 1.03,
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        const itensComQuantidade = {};
        let total = 0;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (this.cardapio[codigo] === undefined) {
                return "Item inválido!";
            }

            if (codigo.startsWith('combo')) {
                total += this.cardapio[codigo];
            } else {
                if (!itensComQuantidade[codigo]) {
                    itensComQuantidade[codigo] = parseInt(quantidade);
                } else {
                    itensComQuantidade[codigo] += parseInt(quantidade);
                }
            }
        }

        for (const codigo in itensComQuantidade) {
            if (this.cardapio[codigo] && codigo !== 'chantily' && codigo !== 'queijo') {
                total += this.cardapio[codigo] * itensComQuantidade[codigo];
            } else if (codigo === 'chantily' || codigo === 'queijo') {
                const itemPrincipal = codigo === 'chantily' ? 'cafe' : 'sanduiche';
                if (!itensComQuantidade[itemPrincipal]) {
                    return "Item extra não pode ser pedido sem o principal";
                }
                total += this.cardapio[codigo] * itensComQuantidade[itemPrincipal];
            }
        }

        for (const quantidade in itensComQuantidade) {
            if (itensComQuantidade[quantidade] === 0) {
                return "Quantidade inválida!";
            }
        }

        if (total === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (!this.formasDePagamento[formaDePagamento]) {
            return "Forma de pagamento inválida!";
        }

        total *= this.formasDePagamento[formaDePagamento];

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
