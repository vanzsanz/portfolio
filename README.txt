BACKEND DO FORMULARIO DE CONTATO — PORTFOLIO

CONTEUDO
- package.json: dependências e comandos do projeto.
- server.js: servidor que recebe o formulário e envia o e-mail.
- .env.example: modelo das configurações secretas.
- .gitignore: impede o envio de node_modules e .env ao Git.

COMO USAR NO SEU COMPUTADOR
1. Extraia esta pasta.
2. Instale o Node.js (versão LTS) se ainda não estiver instalado.
3. Abra o terminal dentro desta pasta.
4. Execute: npm install
5. Faça uma cópia de .env.example e renomeie a cópia para .env.
6. Preencha EMAIL_USER, EMAIL_PASS e CONTACT_TO no arquivo .env.
   Para Gmail, EMAIL_PASS deve ser uma senha de aplicativo do Google,
   não a senha normal da sua conta.
7. Execute: npm start
8. O servidor ficará disponível localmente em http://localhost:3000.

IMPORTANTE
- Não compartilhe nem publique seu arquivo .env.
- Este servidor precisa ficar hospedado em um serviço de backend para
  receber mensagens quando o site estiver publicado.
- Depois da hospedagem, será necessário trocar no script.js o endereço
  http://localhost:3000/enviar-sinal pela URL pública do backend.
- O CORS já permite https://vanzsanz.github.io e os endereços locais
  localhost:5500 e 127.0.0.1:5500. Se o site usar outro domínio ou porta,
  será necessário ajustar allowedOrigins em server.js.
