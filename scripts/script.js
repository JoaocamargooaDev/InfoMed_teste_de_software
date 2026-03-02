let usuarioAutenticado = null;
let listaExames = [];

// =============================
// INICIALIZAÇÃO
// =============================
window.onload = function () {
  const usuarioSalvo = localStorage.getItem("usuario_exdex");
  const examesSalvos = localStorage.getItem("exames_exdex");

  if (usuarioSalvo) {
    usuarioAutenticado = JSON.parse(usuarioSalvo);
    mostrarSistema();
  }

  if (examesSalvos) {
    listaExames = JSON.parse(examesSalvos);
  }

  atualizarListaExames();
};

// =============================
// LOGIN
// =============================
function realizarLogin() {
  const email = document.getElementById("campoEmail").value;
  const senha = document.getElementById("campoSenha").value;

  if (email === "teste@exdex.com" && senha === "123456") {
    usuarioAutenticado = { email };
    localStorage.setItem("usuario_exdex", JSON.stringify(usuarioAutenticado));
    mostrarSistema();
  } else {
    document.getElementById("mensagemErroLogin").innerText =
      "E-mail ou senha inválidos";
  }
}

// =============================
// LOGOUT
// =============================
function realizarLogout() {
  usuarioAutenticado = null;
  localStorage.removeItem("usuario_exdex");

  document.getElementById("telaSistema").classList.add("d-none");
  document.getElementById("telaLogin").classList.remove("d-none");
}

// =============================
// MOSTRAR SISTEMA
// =============================
function mostrarSistema() {
  document.getElementById("telaLogin").classList.add("d-none");
  document.getElementById("telaSistema").classList.remove("d-none");
}

// =============================
// CADASTRAR EXAME
// =============================
function cadastrarExame() {
  const nome = document.getElementById("campoNome").value;
  const data = document.getElementById("campoData").value;
  const tipo = document.getElementById("campoTipo").value;
  const observacoes = document.getElementById("campoObservacoes").value;

  if (!nome || !data) {
    alert("Nome e data são obrigatórios.");
    return;
  }

  const novoExame = {
    id: Date.now(),
    nome: nome,
    data: data,
    tipo: tipo,
    observacoes: observacoes,
    status: "Pendente",
    resultado: ""
  };

  listaExames.push(novoExame);
  salvarExames();
  atualizarListaExames();

  limparFormulario();
}

// =============================
// ATUALIZAR LISTA
// =============================
function atualizarListaExames() {
  const container = document.getElementById("listaExames");
  container.innerHTML = "";

  listaExames.forEach(function (exame) {
    const div = document.createElement("div");
    div.className = "border rounded p-3 mb-3";

    let botoes = "";

    if (exame.status === "Pendente") {
      botoes += `<button class="btn btn-warning me-2"
        onclick="marcarComoRealizado(${exame.id})">
        Marcar como Realizado
      </button>`;
    }

    if (exame.status === "Realizado") {
      botoes += `<button class="btn btn-info me-2"
        onclick="registrarResultado(${exame.id})">
        Registrar Resultado
      </button>`;
    }

    botoes += `<button class="btn btn-danger"
      onclick="excluirExame(${exame.id})">
      Excluir
    </button>`;

    div.innerHTML = `
      <h5>${exame.nome}</h5>
      <p><strong>Data:</strong> ${exame.data}</p>
      <p>
        <strong>Status:</strong>
        <span class="${
          exame.status === "Pendente"
            ? "status-pendente"
            : "status-realizado"
        }">
          ${exame.status}
        </span>
      </p>
      ${
        exame.resultado
          ? `<p><strong>Resultado:</strong> ${exame.resultado}</p>`
          : ""
      }
      <div class="mt-2">${botoes}</div>
    `;

    container.appendChild(div);
  });
}

// =============================
// MARCAR COMO REALIZADO
// =============================
function marcarComoRealizado(id) {
  listaExames = listaExames.map(function (exame) {
    if (exame.id === id) {
      exame.status = "Realizado";
    }
    return exame;
  });

  salvarExames();
  atualizarListaExames();
}

// =============================
// REGISTRAR RESULTADO
// =============================
function registrarResultado(id) {
  const exame = listaExames.find(function (e) {
    return e.id === id;
  });

  if (exame.status !== "Realizado") {
    alert("Marque o exame como realizado para adicionar o resultado.");
    return;
  }

  const novoResultado = prompt("Digite o resultado do exame:");

  if (novoResultado !== null) {
    exame.resultado = novoResultado; // substitui anterior
    salvarExames();
    atualizarListaExames();
  }
}

// =============================
// EXCLUIR EXAME
// =============================
function excluirExame(id) {
  listaExames = listaExames.filter(function (exame) {
    return exame.id !== id;
  });

  salvarExames();
  atualizarListaExames();
}

// =============================
// UTILITÁRIOS
// =============================
function salvarExames() {
  localStorage.setItem("exames_exdex", JSON.stringify(listaExames));
}

function limparFormulario() {
  document.getElementById("campoNome").value = "";
  document.getElementById("campoData").value = "";
  document.getElementById("campoTipo").value = "";
  document.getElementById("campoObservacoes").value = "";
}