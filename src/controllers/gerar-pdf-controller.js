const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const controller_responsavel = require('../services/cadastro-responsaveis-service');
const controller_familia = require('../services/cadastro-demografico-service')
const controller_controle = require('../services/cadastro-dados-controle-service')
module.exports = {
    get: async (req, res) => {
        try {
            const numero_cadastro = req.body.numero_cadastro;
            const projeto_id = req.body.projeto_id;

            // Buscar os dados necessários
            const dados_responsavel1 = await controller_responsavel.buscarUm(projeto_id, numero_cadastro, 'primeiroResponsavel');
            const dados_responsavel2 = await controller_responsavel.buscarUm(projeto_id, numero_cadastro, 'segundoResponsavel');
            const dados_demografico = await controller_familia.buscarUm(projeto_id, numero_cadastro)
            const dados_controle = await controller_controle.buscarUm(projeto_id, numero_cadastro)
            // Carregar o PDF modelo
            const templatePath = path.resolve(process.cwd(), 'termosgerados', 'MO29881025.pdf');
            const templateBytes = fs.readFileSync(templatePath);
            const pdfDoc = await PDFDocument.load(templateBytes);

            // Obter a primeira página do PDF
            const page = pdfDoc.getPages()[0];
            const page2 = pdfDoc.getPages()[1];
            const { width, height } = page.getSize();

            // Configurar a fonte
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const fontSize = 12;

            // Preencher o campo "Nome completo"
            page.drawText(`${dados_responsavel1.nome_completo}`, {
                x: 60, // Ajuste conforme necessário (posição horizontal)
                y: height - 190, // Ajuste conforme necessário (posição vertical)
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0), // Preto
            });
            const dataNascimentoFormatada = dados_responsavel1.data_nascimento.replace(/\//g, '  ');
            page.drawText(`${dataNascimentoFormatada
                }`, {
                x: 66, // Ajuste conforme necessário (posição horizontal)
                y: height - 235, // Ajuste conforme necessário (posição vertical)
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0), // Preto
            });
            //sexo
            let sexo
            if (dados_demografico[0].genero == 'MASCULINO') {
                sexo = 1
                page.drawText(sexo.toString(), {
                    x: 167, // Ajuste conforme necessário
                    y: height - 235, // Ajuste conforme necessário
                    width: 18,
                    height: 10,
                    color: rgb(0, 0, 0),
                });
            } else {
                sexo = 2
                page.drawText(sexo.toString(), {
                    x: 167, // Ajuste conforme necessário
                    y: height - 235, // Ajuste conforme necessário
                    width: 18,
                    height: 10,
                    color: rgb(0, 0, 0),
                });
            }
            //nacionalidade
            let nacionalidade
            if (dados_responsavel1.pais == 'BRASIL' || dados_responsavel1.pais == 'brasil') {
                nacionalidade = 1
                page.drawText(nacionalidade.toString(), {
                    x: 253, // Ajuste conforme necessário
                    y: height - 235, // Ajuste conforme necessário
                    width: 18,
                    height: 10,
                    color: rgb(0, 0, 0),
                });
            } else {
                nacionalidade = 3
                page.drawText(nacionalidade.toString(), {
                    x: 253, // Ajuste conforme necessário
                    y: height - 235, // Ajuste conforme necessário
                    width: 18,
                    height: 10,
                    color: rgb(0, 0, 0),
                });
            }
            //cidade estado
            page.drawText(dados_responsavel1.uf, {
                x: 407, // Ajuste conforme necessário
                y: height - 235, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            page.drawText(dados_responsavel1.naturalidade, {
                x: 430, // Ajuste conforme necessário
                y: height - 235, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            page.drawText(req.body.nome_mae1, {
                x: 60, // Ajuste conforme necessário
                y: height - 275, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            //doducmentos
            page.drawText(req.body.tipo_documento1, {
                x: 60, // Ajuste conforme necessário
                y: height - 320, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            if (req.body.tipo_documento1 == 'RG') {
                page.drawText(dados_responsavel1.rg, {
                    x: 203, // Ajuste conforme necessário
                    y: height - 320, // Ajuste conforme necessário
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0),
                });
            } else {
                page.drawText(dados_responsavel1.cpf, {
                    x: 203, // Ajuste conforme necessário
                    y: height - 320, // Ajuste conforme necessário
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0),
                });
            }

            //orgao emissor 

            page.drawText(dados_responsavel1.rg_uf, {
                x: 337, // Ajuste conforme necessário
                y: height - 320, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            // uf denovo
            page.drawText(dados_responsavel1.uf, {
                x: 429, // Ajuste conforme necessário
                y: height - 320, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            //data documento
            page.drawText(dados_responsavel1.rg_data_expedicao.replace(/\//g, '  '), {
                x: 462, // Ajuste conforme necessário
                y: height - 320, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            //nis
            page.drawText(dados_responsavel1.nis, {
                x: 60, // Ajuste conforme necessário
                y: height - 358, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            //cpf 
            page.drawText(dados_responsavel1.cpf, {
                x: 205, // Ajuste conforme necessário
                y: height - 358, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            //profissao 
            page.drawText(dados_demografico[0].profissao, {
                x: 375, // Ajuste conforme necessário
                y: height - 358, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            //endereco
            page.drawText(dados_controle.endereco, {
                x: 60, // Ajuste conforme necessário
                y: height - 400, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            page.drawText(dados_controle.numero, {
                x: 408, // Ajuste conforme necessário
                y: height - 400, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            page.drawText(dados_controle.complemento, {
                x: 60, // Ajuste conforme necessário
                y: height - 437, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            page.drawText(dados_controle.cidade, {
                x: 310, // Ajuste conforme necessário
                y: height - 437, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            page.drawText(dados_controle.uf, {
                x: 422, // Ajuste conforme necessário
                y: height - 437, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            page.drawText(dados_controle.cep, {
                x: 465, // Ajuste conforme necessário
                y: height - 437, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            //contatos 
            let contato
            if (dados_responsavel1.tipo_contato1 == 'RESIDENCIAL') {
                page.drawText(dados_responsavel1.contato1, {
                    x: 60, // Ajuste conforme necessário
                    y: height - 496, // Ajuste conforme necessário
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0),
                });
            } else if (dados_responsavel1.tipo_contato1 == 'CELULAR') {
                page.drawText(dados_responsavel1.contato1, {
                    x: 216, // Ajuste conforme necessário
                    y: height - 496, // Ajuste conforme necessário
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0),
                });
            } else if (dados_responsavel1.tipo_contato1 == 'RECADO') {
                page.drawText(dados_responsavel1.contato1, {
                    x: 371, // Ajuste conforme necessário
                    y: height - 496, // Ajuste conforme necessário
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0),
                });
            }

            // estado civil
            if (dados_demografico[0].estado_civil == 'SOLTEIRO') {
                page.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 550, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (dados_demografico[0].estado_civil == 'DIVORCIADO./DESQ.') {
                page.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 574, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (dados_demografico[0].estado_civil == 'VIÚVO(A)') {
                page.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 598, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (dados_demografico[0].estado_civil == 'UNIÃO ESTÁVEL') {
                page.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 622, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }
            //grau de instrucao fund 1



            if (dados_demografico[0].estudou_ate == '4ºANO ENS. FUND.') {
                page.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 668, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (dados_demografico[0].estudou_ate == '3ºANO ENS. FUND.' || dados_demografico[0].estudou_ate == '3ºANO ENS. FUND.' || dados_demografico[0].estudou_ate == '2ºANO ENS. FUND.' || dados_demografico[0].estudou_ate == '1ºANO ENS. FUND.') {
                page.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 692, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }


            //grau de instrucao fund 2
            if (dados_demografico[0].estudou_ate == '9ºANO ENS. FUND.') {
                page.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 716, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (dados_demografico[0].estudou_ate == '9ºANO ENS. FUND.' || dados_demografico[0].estudou_ate == '8ºANO ENS. FUND.' || dados_demografico[0].estudou_ate == '7ºANO ENS. FUND.' || dados_demografico[0].estudou_ate == '6ºANO ENS. FUND.' || dados_demografico[0].estudou_ate == '5ºANO ENS. FUND.') {
                page.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 740, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }

            //grau de instrucao medio 
            if (dados_demografico[0].estudou_ate == '3ª SÉRIE ENS. MÉD.') {
                page.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 764, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (dados_demografico[0].estudou_ate == '2ª SÉRIE ENS. MÉD.' || dados_demografico[0].estudou_ate == '1ª SÉRIE ENS. MÉD.') {
                page.drawRectangle({
                    x: 348, // Posição no eixo X
                    y: height - 668, // Posição no eixo Y
                    width: 20.7, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }
            if (dados_demografico[0].estudou_ate == '3ª SÉRIE ENS. MÉD.') {
                page.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 764, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (dados_demografico[0].estudou_ate == '2ª SÉRIE ENS. MÉD.' || dados_demografico[0].estudou_ate == '1ª SÉRIE ENS. MÉD.') {
                page.drawRectangle({
                    x: 348, // Posição no eixo X
                    y: height - 668, // Posição no eixo Y
                    width: 20.7, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }
            //grau superior e analfabeto 
            if (dados_demografico[0].estudou_ate == 'NÍVEL SUPERIOR') {
                page.drawRectangle({
                    x: 348, // Posição no eixo X
                    y: height - 692, // Posição no eixo Y
                    width: 20.7, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (dados_demografico[0].estudou_ate == 'SEM ESCOLARIZAÇÃO') {
                page.drawRectangle({
                    x: 348, // Posição no eixo X
                    y: height - 740, // Posição no eixo Y
                    width: 20.7, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });

            } else {
                page.drawRectangle({
                    x: 348, // Posição no eixo X
                    y: height - 716, // Posição no eixo Y
                    width: 20.7, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }
            //pagina 2
//dados de renda
page2.drawText(dados_responsavel1.cpf_cnpj_fonte_pegadora, {
    x: 60, // Ajuste conforme necessário
    y: height - 130 , // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});
const rawDate = dados_responsavel1.data_admissao; // Exemplo: "01012023"

// Formatar a data com espaços
const formattedDate = `${rawDate.slice(0, 2)}  ${rawDate.slice(2, 4)}  ${rawDate.slice(4)}`;

// Desenhar no PDF
page2.drawText(formattedDate, {
    x: 427, // Ajuste conforme necessário
    y: height - 130, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});
page2.drawText('R$' + dados_responsavel1.valor_renda_bruta.toString(), {
    x: 60, // Ajuste conforme necessário
    y: height - 168, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});

page2.drawText('R$' + dados_responsavel1.valor_renda_liquida.toString(), {
    x: 238, // Ajuste conforme necessário
    y: height - 168, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});

page2.drawText( dados_responsavel1.mes_referencia_renda, {
    x: 398, // Ajuste conforme necessário
    y: height - 168, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});
const rawDate2 = dados_responsavel1.data_inicio_renda_declarada; // Exemplo: "01012023"

// Formatar a data com espaços
const formattedDate2 = `${rawDate2.slice(0, 2)}  ${rawDate2.slice(2, 4)}  ${rawDate2.slice(4)}`;
page2.drawText( formattedDate2, {
    x: 60, // Ajuste conforme necessário
    y: height - 230, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});
page2.drawText('R$' + dados_responsavel1.valor_renda_declarada_liquida.toString(), {
    x: 217, // Ajuste conforme necessário
    y: height - 233, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});
page2.drawText( dados_responsavel1.mes_referencia_renda_declarada, {
    x: 381, // Ajuste conforme necessário
    y: height - 233, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});
if(dados_responsavel1.beneficio_prestacao =='SIM'){
    page2.drawRectangle({
        x: 57, // Posição no eixo X
        y: height - 287, // Posição no eixo Y
        width: 20, // Largura do retângulo
        height: 13, // Altura do retângulo
        // Cor da borda (preto, nesse caso)
        color: rgb(0, 0, 0)
    });
}else{
    page2.drawRectangle({
        x: 127, // Posição no eixo X
        y: height - 288, // Posição no eixo Y
        width: 20.7, // Largura do retângulo
        height: 13, // Altura do retângulo
        // Cor da borda (preto, nesse caso)
        color: rgb(0, 0, 0)
    });
}

if(dados_responsavel1.programa_bolsa_familia =='SIM'){
    page2.drawRectangle({
        x: 57, // Posição no eixo X
        y: height - 337, // Posição no eixo Y
        width: 20, // Largura do retângulo
        height: 13, // Altura do retângulo
        // Cor da borda (preto, nesse caso)
        color: rgb(0, 0, 0)
    });
}else{
    page2.drawRectangle({
        x: 127, // Posição no eixo X
        y: height - 337, // Posição no eixo Y
        width: 20.7, // Largura do retângulo
        height: 13, // Altura do retângulo
        // Cor da borda (preto, nesse caso)
        color: rgb(0, 0, 0)
    });
}
//menor 18
if(dados_responsavel1.menor_18 =='MENOR EMANCIPADO'){
    page2.drawRectangle({
        x: 57, // Posição no eixo X
        y: height - 385, // Posição no eixo Y
        width: 20, // Largura do retângulo
        height: 13, // Altura do retângulo
        // Cor da borda (preto, nesse caso)
        color: rgb(0, 0, 0)
    });
}else if(dados_responsavel1.menor_18 =='MENOR ASSISTIDO'){
    page2.drawRectangle({
        x: 57, // Posição no eixo X
        y: height - 410, // Posição no eixo Y
        width: 20, // Largura do retângulo
        height: 13, // Altura do retângulo
        // Cor da borda (preto, nesse caso)
        color: rgb(0, 0, 0)
    });
}

page2.drawText( dados_responsavel1.nome_tutor, {
    x: 60, // Ajuste conforme necessário
    y: height - 520, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});



            // Salvar o PDF gerado
            const pdfBytes = await pdfDoc.save();

            // Caminho de saída
            const outputPath = path.resolve(process.cwd(), 'termosgerados', 'mo_preenchido.pdf');
            fs.writeFileSync(outputPath, pdfBytes);

            // Enviar o PDF gerado como resposta
            return res.type('pdf').sendFile(outputPath);
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
            res.status(500).send('Erro ao gerar o PDF');
        }
    },
};
