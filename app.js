
      document.addEventListener("DOMContentLoaded", function () {
        const dashboardSection = document.getElementById("dashboardSection");
        const cidadaosSection = document.getElementById("cidadaosSection");
        const dashboardLink = document.getElementById("dashboardLink");
        const cidadaosLink = document.getElementById("cidadaosLink");
        const filterSecretaria = document.getElementById("filterSecretaria");
        const filterStatus = document.getElementById("filterStatus");
        const filterDate = document.getElementById("filterDate");
        const searchProtocolo = document.getElementById("searchProtocolo");
        const citizenTableBody = document.getElementById("citizenTableBody");
        const cobrancaModal = document.getElementById("cobrancaModal");
        const modalTitle = document.getElementById("modalTitle");
        const modalContent = document.getElementById("modalContent");
        const enviarCobrancaBtn = document.getElementById("enviarCobrancaBtn");
        const fecharModalBtn = document.getElementById("fecharModalBtn");

        // Toggle entre Dashboard e Cidadãos
        dashboardLink.addEventListener("click", () => {
          dashboardSection.classList.remove("hidden");
          cidadaosSection.classList.add("hidden");
        });

        cidadaosLink.addEventListener("click", () => {
          dashboardSection.classList.add("hidden");
          cidadaosSection.classList.remove("hidden");
          loadCitizens();
        });
        
       

        // ATENDIMENTOS QUANTITY
       
          // Dados dos atendimentos
          const citizenData = [
            {
              secretaria: "Secretaria de Saúde",
              status: "Em Andamento",
              dataAbertura: "19/02/2025",
              prazoRestante: "20 dias",
              protocolo: "W 001.190225",
              descricao: "Denuncia",
            },
            {
              secretaria: "Secretaria de Educação",
              status: "Finalizado",
              dataAbertura: "14/02/2025",
              prazoRestante: "Concluido",
              protocolo: "W 002.140225",
              descricao: "Reclamacao",
            },
            {
              secretaria: "Secretaria de Transporte",
              status: "Não Respondido",
              dataAbertura: "14/02/2025",
              prazoRestante: "Expirado",
              protocolo: "W 003.140225",
              descricao: "Sugestão",
            },

            {
              secretaria: "Secretaria de Transporte",
              status: "Não Respondido",
              dataAbertura: "14/02/2025",
              prazoRestante: "Expirado",
              protocolo: "W 003.140225",
              descricao: "Sugestão",
            },
            {
              secretaria: "Secretaria de Transporte",
              status: "Não Respondido",
              dataAbertura: "14/02/2025",
              prazoRestante: "Expirado",
              protocolo: "W 003.140225",
              descricao: "Sugestão",
            },
            {
              secretaria: "Secretaria de Transporte",
              status: "Não Respondido",
              dataAbertura: "14/02/2025",
              prazoRestante: "Expirado",
              protocolo: "W 003.140225",
              descricao: "Sugestão",
            },
          ];
        
          // Contadores
          let totalAtendimento = citizenData.length;
          let emAndamento = 0;
          let concluido = 0;
          let naoRespondido = 0;
        
          // Conta os status
          citizenData.forEach((item) => {
            if (item.status === "Em Andamento") emAndamento++;
            else if (item.status === "Concluído") concluido++;
            else if (item.status === "Não Respondido") naoRespondido++;
          });
        
          // Atualiza o HTML
          document.getElementById("total-atendimentos").textContent = totalAtendimento;
          document.getElementById("em-andamento").textContent = emAndamento;
          document.getElementById("concluido").textContent = concluido;
          document.getElementById("nao-respondido").textContent = naoRespondido;
    
        function calcularDiasAtraso(dataAbertura) {
          const hoje = new Date();
          const abertura = new Date(
            dataAbertura.split("/").reverse().join("-")
          );
          const diferencaDias = Math.floor(
            (hoje - abertura) / (1000 * 60 * 60 * 24)
          );
          return Math.max(diferencaDias - 20, 0); // Considera atraso após 20 dias
        }

        function loadCitizens(data = citizenData) {
          citizenTableBody.innerHTML = "";
          data.forEach((citizen) => {
            const row = document.createElement("tr");
            row.className = "hover:bg-gray-50 transition-colors duration-200";
            row.innerHTML = `
              <td class="p-3 text-gray-900 font-medium">${citizen.secretaria}</td>
              <td class="p-3">
                <span class="status-badge px-3 py-1 rounded-full text-sm font-semibold tracking-wide 
                  ${citizen.status === 'Em Andamento' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' : 
                  citizen.status === 'Concluído' ? 'bg-green-100 text-green-700 border border-green-300' : 
                  'bg-red-100 text-red-700 border border-red-300'}">
                  ${citizen.status}
                </span>
              </td>
              <td class="p-3 text-gray-700">${citizen.dataAbertura}</td>
              <td class="p-3 text-gray-700">${citizen.prazoRestante}</td>
              <td class="p-3">
                <span class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-200 bg-blue-900/80 border border-blue-700 rounded-full shadow-md shadow-blue-500/20 tracking-wide uppercase">
                  ${citizen.protocolo}
                </span>
              </td>
              <td class="p-3">
                <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-lg transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" onclick="cobrarCidadao('${citizen.protocolo}')">
                  Cobrar
                </button>
              </td>
            `;
            citizenTableBody.appendChild(row);
          });
        }
        
        function filterCitizens() {
          const secretariaFilter = filterSecretaria.value.toLowerCase();
          const statusFilter = filterStatus.value.toLowerCase();
          const dateFilter = filterDate.value;
          const protocoloSearch = searchProtocolo.value.toLowerCase();

          const filteredData = citizenData.filter(
            (citizen) =>
              (secretariaFilter === "" ||
                citizen.secretaria.toLowerCase().includes(secretariaFilter)) &&
              (statusFilter === "" ||
                citizen.status.toLowerCase() === statusFilter) &&
              (dateFilter === "" || citizen.dataAbertura === dateFilter) &&
              (protocoloSearch === "" ||
                citizen.protocolo.toLowerCase().includes(protocoloSearch))
          );

          loadCitizens(filteredData);
        }

        filterSecretaria.addEventListener("change", filterCitizens);
        filterStatus.addEventListener("change", filterCitizens);
        filterDate.addEventListener("change", filterCitizens);
        searchProtocolo.addEventListener("input", filterCitizens);

    // Função para cobrar cidadão
window.cobrarCidadao = function (protocolo) {
  const citizen = citizenData.find((c) => c.protocolo === protocolo);
  if (citizen) {
      // Preenchendo o título e conteúdo do modal
      document.getElementById('modalTitle').innerHTML = `
          <i class="fas fa-exclamation-circle text-yellow-500 mr-2"></i>
          Cobrança do Protocolo ${protocolo}
      `;
      
      document.getElementById('modalContent').innerHTML = `
          <div class="mb-4">
              <p class="text-sm text-gray-600">Secretaria</p>
              <p class="font-semibold text-gray-900">${citizen.secretaria}</p>
          </div>
          <div class="mb-4">
              <p class="text-sm text-gray-600">Status</p>
              <p class="font-semibold">
                  <span class="status-badge ${citizen.status === 'Em Andamento' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}">
                      ${citizen.status}
                  </span>
              </p>
          </div>
          <div class="mb-4">
              <p class="text-sm text-gray-600">Data de Abertura</p>
              <p class="font-semibold text-gray-900">${citizen.dataAbertura}</p>
          </div>
          <div class="mb-4">
              <p class="text-sm text-gray-600">Prazo Restante</p>
              <p class="font-semibold">${citizen.prazoRestante}</p>
          </div>
          <div class="mb-4">
              <p class="text-sm text-gray-600">Dias em Atraso</p>
              <p class="font-semibold text-red-600">${calcularDiasAtraso(citizen.dataAbertura)} dias</p>
          </div>
          <div class="mt-4">
              <p class="text-sm text-gray-600">Descrição da Solicitação</p>
              <p class="text-gray-900 text-sm mt-1">${citizen.descricao || 'Descrição não disponível'}</p>
          </div>
      `;

      // Exibindo o modal
      const cobrancaModal = document.getElementById('cobrancaModal');
      cobrancaModal.classList.remove('hidden');
  }
};

// Fechar o modal ao clicar no botão 'Cancelar'
document.getElementById('fecharModalBtn').addEventListener('click', function() {
  const cobrancaModal = document.getElementById('cobrancaModal');
  cobrancaModal.classList.add('hidden');
});

// Fechar o modal ao clicar fora do modal (área de fundo)
document.getElementById('cobrancaModal').addEventListener('click', function(event) {
  if (event.target === this) {
      const cobrancaModal = document.getElementById('cobrancaModal');
      cobrancaModal.classList.add('hidden');
  }
});



        const mensagemCobranca = document.getElementById("mensagemCobranca");
        const charCount = document.getElementById("charCount");

        function updateCharCount() {
          const count = mensagemCobranca.value.length;
          charCount.textContent = `${count} / 500 caracteres`;
          if (count > 450) {
            charCount.classList.add("text-red-500");
          } else {
            charCount.classList.remove("text-red-500");
          }
        }

        mensagemCobranca.addEventListener("input", updateCharCount);
        enviarCobrancaBtn.addEventListener("click", function () {
          const mensagem = document.getElementById("mensagemCobranca").value;
          alert("Cobrança enviada com sucesso!\n\nMensagem:\n" + mensagem);
          cobrancaModal.classList.add("hidden");
        });

        fecharModalBtn.addEventListener("click", function () {
          cobrancaModal.classList.add("hidden");
        });

        // Fechar o modal se clicar fora dele
        cobrancaModal.addEventListener("click", function (e) {
          if (e.target === cobrancaModal) {
            cobrancaModal.classList.add("hidden");
          }
        });

        // Carrega os gráficos do dashboard (mantenha a função existente)
        function renderCharts() {
          // ... (código dos gr��ficos permanece o mesmo)
        }

        renderCharts();
      });
    


      

      
     
      document.addEventListener("DOMContentLoaded", function () {
        const exportarRelatorioBtn = document.getElementById("exportarRelatorioBtn");
        const periodoSelect = document.getElementById("periodoSelect");
    
        exportarRelatorioBtn?.addEventListener("click", () => {
            const periodo = periodoSelect.value;
            exportarRelatorioXLSX(periodo);
        });
    });
    
    const dados = [
        ["Secretaria", "Status", "Abertura", "Prazo", "Protocolo"],
        ["Saúde", "Concluído", "2023-01-01", "10 dias", "12345"],
        ["Educação", "Em Andamento", "2023-02-15", "5 dias", "67890"],
        ["Transporte", "Não Respondido", "2023-03-10", "15 dias", "11223"],
        ["Segurança", "Concluído", "2023-04-05", "7 dias", "33456"],
        ["Infraestrutura", "Em Andamento", "2023-05-12", "12 dias", "55678"]
    ];
    
    function exportarRelatorioXLSX(periodo) {
        const ouvidoriaNome = "Ouvidoria Pública Municipal";
    
        // Criando a planilha
        const ws = XLSX.utils.aoa_to_sheet(dados); // Converte os dados para uma planilha
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, ouvidoriaNome);
    
        // Nome do arquivo
        const fileName = `relatorio_ouvidoria_${periodo}.xlsx`;
    
        // Baixando o arquivo .xlsx
        XLSX.writeFile(wb, fileName);
    }
    