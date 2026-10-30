
document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('formulario-contato');

    formulario.addEventListener('submit', async (event) => {

        event.preventDefault();

        const botao = formulario.querySelector('button[type="submit"]');

        const dados = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            mensagem: document.getElementById('mensagem').value.trim()
        };

        if (!dados.nome || !dados.email || !dados.mensagem) {
            alert('Preencha todos os campos!');
            return;
        }

        botao.disabled = true;
        botao.textContent = 'Transmitindo sinal...';

        try {

            const resposta = await fetch(
                'http://localhost:3000/enviar-sinal',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dados)
                }
            );

            const resultado = await resposta.json();

            if (!resposta.ok || !resultado.sucesso) {
                throw new Error(
                    resultado.mensagem || 'Erro ao enviar mensagem.'
                );
            }

            alert('✅ Mensagem enviada com sucesso!');
            formulario.reset();

        } catch (erro) {

            console.error('Erro no envio:', erro);

            alert('❌ Falha na transmissão: ' + erro.message);

        } finally {

            botao.disabled = false;
            botao.textContent = 'Transmitir Sinal';

        }

    });

});
