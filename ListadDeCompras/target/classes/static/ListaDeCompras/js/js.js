
let itens = [];
let editando = null;
let proximoId = 1;

function adicionarItem() {
    const produto = document.getElementById("produto");
    const quantidade = document.getElementById("quantidade");

    const nome = produto.value.trim();
    const qtd = Number(quantidade.value);

    if (nome === "" || qtd < 1 || !Number.isInteger(qtd)) {
        alert("Digite um produto e uma quantidade válida!");
        return;
    }

    if (editando !== null) {
        itens[editando].nome = nome;
        itens[editando].quantidade = qtd;

        editando = null;
        document.getElementById("btnAdicionar").textContent = "Adicionar";
    } else {
        itens.push({
            id: proximoId++,
            nome: nome,
            quantidade: qtd,
            comprado: false
        });
    }

    produto.value = "";
    quantidade.value = 1;

    mostrarItens(document.getElementById("pesquisarId").value);
}

function mostrarItens(filtro = "") {
    const lista = document.getElementById("listaCompras");
    const mensagem = document.getElementById("mensagemVazia");

    lista.innerHTML = "";

    const filtrados = itens.filter(item =>
        String(item.id).includes(filtro)
    );

    mensagem.style.display = filtrados.length === 0 ? "block" : "none";

    filtrados.forEach(item => {
        const li = document.createElement("li");

        li.className = item.comprado ? "item comprado" : "item";

        li.innerHTML = `
            <div class="info">
                <input type="checkbox"
                    ${item.comprado ? "checked" : ""}
                    onchange="marcarComprado(${item.id})">

                <div>
                    <span class="id-produto">ID: ${item.id}</span><br>
                    <span class="nome">
                        ${item.nome} (${item.quantidade})
                    </span>
                </div>
            </div>

            <div class="acoes">
                <button class="editar"
                    onclick="editarItem(${item.id})">
                    Editar
                </button>

                <button class="excluir"
                    onclick="excluirItem(${item.id})">
                    Excluir
                </button>
            </div>
        `;

        lista.appendChild(li);
    });
}

function pesquisarItem() {
    const id = document.getElementById("pesquisarId").value;
    mostrarItens(id);
}

function editarItem(id) {
    const index = itens.findIndex(item => item.id === id);

    if (index === -1) return;

    document.getElementById("produto").value = itens[index].nome;
    document.getElementById("quantidade").value = itens[index].quantidade;

    editando = index;

    document.getElementById("btnAdicionar").textContent = "Salvar";
    document.getElementById("produto").focus();
}

function excluirItem(id) {
    const index = itens.findIndex(item => item.id === id);

    if (index === -1) return;

    itens.splice(index, 1);

    if (editando === index) {
        cancelarEdicao();
    } else if (editando !== null && editando > index) {
        editando--;
    }

    mostrarItens(document.getElementById("pesquisarId").value);
}

function marcarComprado(id) {
    const item = itens.find(item => item.id === id);

    if (item) {
        item.comprado = !item.comprado;
    }

    mostrarItens(document.getElementById("pesquisarId").value);
}

function cancelarEdicao() {
    editando = null;

    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = 1;
    document.getElementById("btnAdicionar").textContent = "Adicionar";
}

mostrarItens();
