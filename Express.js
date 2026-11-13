Express.js
app.post('/enviar-contato', async (req, res) => {
    const { nome, email, mensagem } = req.body;
    await enviarEmail('seu-email@gmail.com', `Novo contato de ${nome}`, `E-mail: ${email}\n\nMensagem:\n${mensagem}`);
    res.status(200).send({ status: 'E-mail enviado com sucesso!' });
});