// Função para buscar os dados do TreeMap
async function buscarDadosTreeMap() {
    try {
        const response = await fetch('https://2943e797-97a6-40df-9518-a8d2b62c4d92.mock.pstmn.io');
        const dados = await response.json();
        return dados.apps;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para criar o TreeMap
function criarTreeMap(dados) {
    const containerTreeMap = document.getElementById('treemap');

    if (!Array.isArray(dados)) {
        console.error('Dados recebidos não é um array:', dados);
        return;
    }

    const totalDownloads = dados.reduce((soma, item) => soma + item.downloads, 0);
    const classes = [
        'item-1', 'item-2', 'item-3', 'item-4', 'item-5',
        'item-6', 'item-7', 'item-8', 'item-9', 'item-10'
    ];

    dados.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `item ${classes[index]}`;

        const spanNome = document.createElement('span');
        spanNome.textContent = item.nome;

        const spanDownloads = document.createElement('span');
        spanDownloads.textContent = `Downloads: ${item.downloads.toLocaleString()}`;

        const spanPercentual = document.createElement('span');
        const percentual = ((item.downloads / totalDownloads) * 100).toFixed(2);
        spanPercentual.textContent = `(${percentual}%)`;

        div.appendChild(spanNome);
        div.appendChild(spanDownloads);
        div.appendChild(spanPercentual);

        containerTreeMap.appendChild(div);
    });
}

// Função para buscar os dados e criar o TreeMap
(async () => {
    const dados = await buscarDadosTreeMap();
    criarTreeMap(dados);
})();