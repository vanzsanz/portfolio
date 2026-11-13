
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares essenciais ---

// Permite receber dados em JSON
app.use(express.json());

// Permite receber dados de formulários
app.use(express.urlencoded({ extended: true }));

// Permite a comunicação entre o site e o servidor
app.use(cors());

// --- Configuração do Nodemailer ---

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// --- Rota para envio de mensagens ---

app.post('/enviar-sinal', async (req, res) => {

    const { nome, email, mensagem } = req.body;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!nome || !email || !mensagem) {
        return res.status(400).json({
            success: false,
            message: 'Por favor, preencha todos os campos.'
        });
    }

    try {

        // Configura os dados do e-mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_TO,
            replyTo: email,
            subject: `Novo contato do Portfólio - ${nome}`,
            text: `
Você recebeu uma nova mensagem através do site:

Nome: ${nome}
E-mail: ${email}

Mensagem:
${mensagem}
            `
        };

        // Envia o e-mail e aguarda a resposta do Gmail
        const info = await transporter.sendMail(mailOptions);

        // Exibe informações no terminal
        console.log('E-mail enviado com sucesso!');
        console.log('Destinatário:', process.env.CONTACT_TO);
        console.log('Remetente:', process.env.EMAIL_USER);
        console.log('ID da mensagem:', info.messageId);
        console.log('Aceitos pelo servidor:', info.accepted);
        console.log('Recusados pelo servidor:', info.rejected);
        console.log('Resposta SMTP:', info.response);

        // Retorna sucesso para o JavaScript do site
        return res.status(200).json({
            success: true,
            message: 'Mensagem enviada com sucesso!'
        });

    } catch (error) {

        // Exibe o erro completo no terminal
        console.error('Erro ao enviar e-mail:', error);

        return res.status(500).json({
            success: false,
            message: 'Não foi possível enviar sua mensagem.'
        });
    }

});

// --- Inicialização do servidor ---

app.listen(PORT, () => {
    console.log(`Servidor rodando perfeitamente em http://localhost:${PORT}`);
});
