const express = require('express');
const cors = require('cors');

const {Sequelize} = require('./models');

const models = require('./models');


const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

let comprascli = models.compra;
let itemcompra = models.itemCompra;
let produtos = models.produto;



app.get('/', function(req,res){
    res.send('Olá Mundo')
});

app.post('/servicos', async(req, res)=>{
     await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message:'Serviço criado com sucesso'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:'Impossivel conectar'
        });
    });
    
});

app.post('/clientes', async(req, res)=>{
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente inserido com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "Impossivel inserir cleinte"
        });
    })
        
});


app.post('/pedidos', async(req,res)=>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido adicionado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao adicionar o pedido"
        });
    })
});
app.post('/itemPedido', async(req,res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            
            message:"Item adicionado ao pedido com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            
            message: "Erro"
        });
    });
});

app.get('/listaservicos', async(req, res)=>{
    await servico.findAll({
        //raw: true
        //order: [['nome', 'DESC']]
        order: [['id', 'ASC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});

app.get('/ofertaservicos', async(req, res)=>{
    await servico.count('id').then(function(servico){
        res.json({servico});
    });
});

app.get('/servico/:id', async(req, res)=>{
    await servico.findByPk(req.params.id)
    .then(serv => {
        return res.json({       
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
        message: "Erro"
        
        });
    });

    
})
app.get('/clientesall', async(req,res)=>{
    await cliente.findAll({
        order: [['nome', 'ASC']]
    }).then(function(clieAll){
        res.json({clieAll});
    });
});

app.get('/clientesdados', async(req,res)=>{
    await cliente.count('id').then(function(clie){
        res.json(`Número total de clientes no momente é ${clie}`);
    });
});

app.get('/clientesdadosinorder', async(req,res)=>{
    await cliente.findAll({
        order: [['clienteDesde', 'ASC']]
    }).then(function(cliente){
        res.json({cliente})
    });
});

app.get('/pedidosquant', async(req,res)=>{
    await pedido.count('id').then(function(ped){
        res.json(`Numero de pedidos: ${ped}`);
    });
});

app.get('/itempedidosorder', async(req,res)=>{
    await itempedido.findAll({
        order: [['valor', 'ASC']]
    }).then(function(itemp){
        res.json({itemp})
    });
});

app.get('/listaservicos', async(req,res)=>{
    await servico.findAll({
        order: [['id', 'ASC']]
    }).then(function(list){
        res.json({list})
    });
})

app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id, {include: [{all: true}]})
    .then(ped=>{
        return res.json({
            ped
        })
    })
})

app.put('/updateservico', async(req, res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            message: 'Opreação concluida com sucesso'
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro na operação'
        });
    });
});

app.put('/pedidos/:id/editaritem', async(req,res)=>{
    const item ={
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            message: 'Pedido não encontrado'
        });
    };

    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            message: 'Serviço não encontrado'
        });
    }

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            message:'Pedido alterado com sucesso',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro ao alterar o pedido'
        });
    });
});

app.get('/listaclientes', async(req,res)=>{
    await cliente.findAll({
        raw: true
    }).then(function(clientes){
        res.json({clientes})
    });
});
app.get('/excluircliente/:id', async(req,res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            message:'Cliente removido com seucesso'
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro ao remover cliente'
        })
    })
});




app.post('/produto', async(req,res)=>{
    await produtos.create(
        req.body
    ).then(function(){
        return res.json({
            message: 'Prdotuto adicionado com sucesso'
        })
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro ao adicionar produto'
        });
    });
    
});

app.post('/compra', async(req,res)=>{
    await comprascli.create(
        req.body
    ).then(function(){
        return res.json({
            message: 'Operação concluida com sucesso'
        });
    }).catch(function(erro){
        return res.json({
            message: 'Erro na compra'
        });
    });
});

app.post('/itemcompra', async(req,res)=>{
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            message: 'Operação concluida com sucesso'
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro na compra'
        });
    });
});

//>>List



app.get('/listasprodutos', async (req, res) => {
    await produtos.findAll({
        order: [['nome', 'ASC']]
    }).then(function (produtos) {
        res.json({ produtos })
    });
});
app.get('/listaprodutos2', async(req,res)=>{
    await produtos.findAll({
        raw: true
    }).then(function(prod){
        res.json({prod})
    });
});

app.get('/listascompras', async (req, res) => {
    await comprascli.findAll({
        order: [['id', 'ASC']]
    }).then(function (compras) {
        res.json({ compras })
    });
});

app.get('/listaitenscompras', async (req, res) => {
    await itemcompra.findAll({
        order: [['valor', 'DESC']]
    }).then(function (itemcompras) {
        res.json({ itemcompras })
    });
});



app.get('/excluirproduto/:id', async(req,res)=>{
    await produtos.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            message:'Produto removido com sucesso'
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro ao remover produto'
        })
    })
});

app.get('/excluicompra/:id', async(req,res)=>{
    await comprascli.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            message:'Compra removida com sucesso'
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro ao remover compra'
        })
    })
});

app.get('/excluiritemcompra/:id', async(req,res)=>{
    await itemcompra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            message:'Item removido com sucesso'
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro ao remover item'
        })
    })
});



app.put('/updateproduto', async(req, res)=>{
    await produtos.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            message: 'Produto atualizado com sucesso'
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro no Produto'
        });
    });
});

app.put('/updatecompra', async(req, res)=>{
    await comprascli.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            message: 'Compra atualizada com sucesso'
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro na compra'
        });
    });
});

app.put('/updatitem', async(req, res)=>{
    await itemcompra.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            message: 'Item atualizado com sucesso'
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Erro no item'
        });
    });
});



app.put('/compra/:id/editarsub', async(req,res)=>{
    const editar ={
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await comprascli.findByPk(req.params.id)){
        return res.status(400).json({
            message: 'Compra não encontrada'
        });
    };

    if(!await produtos.findByPk(req.body.CompraId)){
        return res.status(400).json({
            message: 'Produto não encontrado'
        });
    }

    await itemcompra.update(editar, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId},
            {CompraId: req.params.id})
    }).then(function(editar){
        return res.json({
            message:'Item alterado com sucesso!',
            editar
        });
    }).catch(function(erro){
        return res.status(400).json({
            message: 'Ocorreu um erro!'
        });
    });
});




let port = process.env.PORT || 3001;

app.listen(port,(req,res) => {
    console.log('Servidor Ativo: http://localhost:3001');
})