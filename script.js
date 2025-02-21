document.addEventListener('DOMContentLoaded', () => {
    const dashboardLink = document.getElementById('dashboardLink');
    const cidadaosLink = document.getElementById('cidadaosLink');
    const dashboardSection = document.getElementById('dashboardSection');
    const cidadaosSection = document.getElementById('cidadaosSection');

    // Dados fictícios de cidadãos
    const registrosCidadaos = [
        { secretaria: 'Secretaria de Saúde', status: 'Em Andamento', dataAbertura: '19/02/2025', prazoRestante: '5 dias', protocolo: 'W 001.190225' },
        { secretaria: 'Secretaria de Educação', status: 'Finalizado', dataAbertura: '14/01/2024', prazoRestante: 'Concluído', protocolo: '#12346-2024' },
        { secretaria: 'Secretaria de Transporte', status: 'Aberto', dataAbertura: '16/01/2024', prazoRestante: '7 dias', protocolo: '#12347-2024' },
    ];

    // Alterna entre as seções Dashboard e Cidadãos
    function toggleSection(showDashboard) {
        if (showDashboard) {
            dashboardSection.classList.remove('hidden');
            cidadaosSection.classList.add('hidden');
            dashboardLink.classList.add('bg-indigo-700');
            cidadaosLink.classList.remove('bg-indigo-700');
            renderCharts(); // Renderiza os gráficos
        } else {
            dashboardSection.classList.add('hidden');
            cidadaosSection.classList.remove('hidden');
            dashboardLink.classList.remove('bg-indigo-700');
            cidadaosLink.classList.add('bg-indigo-700');
            renderCidadaosTable(); // Renderiza a tabela de cidadãos
        }
    }

    // Renderiza gráficos de Reclamações por Departamento e Status das Reclamações
    function renderCharts() {
        renderDepartmentChart();
        renderStatusChart(); // Certifique-se de que esta função também exista
    }

    // Gráfico de Reclamações por Departamento
    function renderDepartmentChart() {
        const atendimentosCtx = document.getElementById('atendimentosChart').getContext('2d');
        
        if (atendimentosCtx) {
            new Chart(atendimentosCtx, {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [{
                        label: '',
                        data: [50, 75], // Dados de exemplo para o gráfico
                        backgroundColor: '#4F46E5', // Cor do gráfico (pode mudar conforme necessidade)
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Evolução de Atendimentos por Mês'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        } else {
            console.error('O elemento #atendimentosChart não foi encontrado.');
        }
    }

                     
    // Gráfico de Status das Reclamações
    function renderStatusChart() {
        const statusCtx = document.getElementById('statusChart').getContext('2d');
        new Chart(statusCtx, {
            type: 'bar',
            data: {
                labels: ['Em Andamento', 'Não Respondida', 'Concluída'],
                datasets: [{
                    label: 'Quantidade',
                    data: [1, 4, 3],
                    backgroundColor: ['#F59E0B', '#EF4444', '#10B981'],
                }],
                
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Atendimentos em Progresso'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Quantidade'
                        }
                    }
                }
            }
        });
    }

     
    // Renderiza a Tabela de Cidadãos
    function renderCidadaosTable() {
        const tableBody = document.getElementById('cidadaosTableBody');
        tableBody.innerHTML = '';

        registrosCidadaos.forEach(registro => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${registro.secretaria}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(registro.status)}">
                        ${registro.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${registro.dataAbertura}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${registro.prazoRestante}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${registro.protocolo}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Determina a cor do status
    function getStatusColor(status) {
        const statusColors = {
            'Em Andamento': 'bg-yellow-400',
            'Concluído': 'bg-green-400',
            'Aberto': 'bg-blue-400'
        };
        return statusColors[status] || 'bg-gray-400';
    }

    // Adiciona os eventos de clique nos links de navegação
    dashboardLink.addEventListener('click', () => toggleSection(true));
    cidadaosLink.addEventListener('click', () => toggleSection(false));

    // Chama a função para exibir a seção do dashboard inicialmente
    toggleSection(true);
});
