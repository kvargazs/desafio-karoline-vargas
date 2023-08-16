class CaixaDaLanchonete {
    desconto; //variavel para os descontos e taxas do pagamento
    valor = 0; //variavel para os valores
    aviso; //variavel para avisos de acordo com a compra
    itens; //variavel para cada item
    //cardapio
    itensDoCardapio = {
        "cafe": 3.00,
        "chantily": 1.50,
        "suco": 6.20,
        "sanduiche": 6.50,
        "queijo": 2.00,
        "salgado": 7.25,
        "combo1": 9.50,
        "combo2": 7.50
    };
    //calcula os valores
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens) { 
            let verificaItens = this.verificaItens(itens); //verifica os itens
            if (verificaItens) { //chama a função dentro do if e retorna false ou true
                let verificarMetodoDePagamento = this.verificarMetodoDePagamento(metodoDePagamento); //verifica o pagamento
                if (verificarMetodoDePagamento) {
                    for (let i = 0; i < this.itens.length; i++) { //i acessa cada array dentro do array principal
                        this.valor += this.itensDoCardapio[this.itens[i][0]] * this.itens[i][1];//posição 0 nome e 1 item
                    }
                    this.valor = this.valor * this.desconto; //calcula o valor + a taxa/desconto
                    console.log(this.valor);
                } else { //se não existir o pagamento da essa mensagem
                    this.aviso = "Forma de pagamento inválida!";
                }
            }
        } else { //se não existir os itens no cardapio da essa mensagem
            this.aviso = "Não há itens no carrinho de compra!";
        }
        //se tiver uma mensagem armazenada ele retorna mensagem pq deu erro
        if (this.aviso) {
            return this.aviso;
        //se não, retorna os resultados e muda o ponto "." para vírgula ","
        } else {
            return `R$ ${this.valor.toFixed(2).toString().replace(".", ",")}`;
        }
    }
    //separa os itens da quantidade q foi pedido
    separaItemQuantidade(itens) { //recebe o pedido
        let itensSeparadosDaQuantidade = []; //[["cafe", "2"], ["sanduiche", "2"]]
        //separa os pedidos de acordo com cada item do array
        for(let i = 0; i < itens.length; i++){ 
            itensSeparadosDaQuantidade.push(itens[i].split(','));
        }
        //acessa cada array, acessa o 1 do array (número) e transforma de string em number e ja arredonda para baixo
        for(let i = 0; i < itensSeparadosDaQuantidade.length; i++){
            itensSeparadosDaQuantidade[i][1] = Math.floor(parseInt(itensSeparadosDaQuantidade[i][1]));
        }
        //adiciona os itens já separados
        this.itens = itensSeparadosDaQuantidade;
        return this.itens;
    }
    //
    verificaItens(itens) {
        let existeItem = true;
        let existeCafe = false;
        let existeChantily = false;
        let existeSanduiche = false;
        let existeQueijo = false;
        let quantidade = true;
        if (itens.length > 0) {
        itens = this.separaItemQuantidade(itens);
        //verifica se item existe
        for(let i = 0; i < itens.length; i++){
            if (!this.itensDoCardapio.hasOwnProperty(itens[i][0])) { //verifica a propriedade dentro do cardapio, se nao tiver ele retorna false
                existeItem = false;
            }
        }
        if (existeItem === false) { //se fitem nao existir, retorna mensagem
            this.aviso = "Item inválido!";
            return false;
        }
        //verifica se existe o principal para adicionar o extra
        for (let i = 0; i < itens.length; i++) {
            if (itens[i][0] === "cafe") {
                existeCafe = true;
            }
            if (itens[i][0] === "sanduiche") {
                existeSanduiche = true;
            }
            if (itens[i][0] === "chantily") {
                existeChantily = true;
            }
            if (itens[i][0] === "queijo") {
                existeQueijo = true;
            }        
        }
        if (existeChantily && !existeCafe || existeQueijo && !existeSanduiche) {
            this.aviso = "Item extra não pode ser pedido sem o principal";
            return false;
        }
        //verifica se a quantidade de itens for maior que 0 se não "Quantidade inválida!"
        for(let i = 0; i < itens.length; i++){
            if(!itens[i][1] || itens[i][1] < 1){ //se a qualidade for menor que 1, retorna quantidade false
                quantidade = false;
            }   
        }
            if (!quantidade) { //se quantidade for negativa ou 0 da a mensagem
                this.aviso = "Quantidade inválida!";
                return false;
            }
            return true;
        } else { //se nao tiver itens, retorna a mensagem
            this.aviso = "Não há itens no carrinho de compra!";
            return false;
        }
    }
    //verifica se o metodo de pagamento está correto com suas devidas atribuições
    verificarMetodoDePagamento(metodoDePagamento){
        if (metodoDePagamento === "debito") {
            this.desconto = 1; //no debito o preço continua o mesmo
            return true;
        }
        if (metodoDePagamento === "dinheiro") {
            this.desconto = 0.95; //no dinheiro o preço diminui 5%
            return true;
        }
        if (metodoDePagamento === "credito") {
            this.desconto = 1.03; //no credito o preço aumenta 3%
            return true;
        }
        return false;
    }
} 
//passou em todos os testes!!!
export { CaixaDaLanchonete };
