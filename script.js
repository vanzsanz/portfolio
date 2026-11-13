
document.addEventListener("DOMContentLoaded", () => {

    // FORMULÁRIO DE CONTATO
    const formulario = document.getElementById("formulario-contato");

    if (formulario) {
        formulario.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nome = formulario.querySelector('[name="nome"]').value.trim();
            const email = formulario.querySelector('[name="email"]').value.trim();
            const mensagem = formulario.querySelector('[name="mensagem"]').value.trim();

            const botao = formulario.querySelector('button[type="submit"]');

            if (!nome || !email || !mensagem) {
                alert("Preencha todos os campos!");
                return;
            }

            botao.disabled = true;
            botao.textContent = "Enviando mensagem...";

            try {
                const resposta = await fetch("http://localhost:3000/enviar-sinal", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome,
                        email,
                        mensagem
                    })
                });

                const resultado = await resposta.json();

                if (!resposta.ok || !resultado.success) {
                     throw new Error(
                 resultado.message || 'Erro ao enviar mensagem.'
    );
}

alert('Mensagem enviada com sucesso!');
formulario.reset();

            } catch (erro) {
                console.error("Erro ao enviar mensagem:", erro);
                alert("Não foi possível enviar a mensagem. Tente novamente.");

            } finally {
                botao.disabled = false;
                botao.textContent = "Transmitir Sinal";
            }
        });
    }

    // ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
    const elementos = document.querySelectorAll(".reveal");

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("active");
                observador.unobserve(entrada.target);
            }
        });
    });

    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });

    // NAVEGAÇÃO SUAVE ENTRE AS SEÇÕES
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const destino = document.querySelector(link.getAttribute("href"));

            if (destino) {
                event.preventDefault();
                destino.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

});
