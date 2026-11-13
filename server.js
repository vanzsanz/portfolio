
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();


app.use(cors({
    origin: function (origin, callback) {
        const origensPermitidas = [
            "https://vanzsanz.github.io"
        ];

        const acessoLocal =
            !origin ||
            /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

        if (acessoLocal || origensPermitidas.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Origem não permitida pelo CORS"));
        }
    }
}));


app.use(express.json());

app.post("/enviar-sinal", async (req, res) => {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_TO,
            replyTo: email,
            subject: `Nova mensagem do portfólio: ${nome}`,
            text: `
Nome: ${nome}
E-mail: ${email}

Mensagem:
${mensagem}
            `
        });

        return res.status(200).json({
            sucesso: true,
            mensagem: "Mensagem enviada com sucesso!"
        });

    } catch (erro) {
        console.error("Erro ao enviar e-mail:", erro);

        return res.status(500).json({
            sucesso: false,
            mensagem: "Não foi possível enviar sua mensagem."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
});
