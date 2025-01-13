const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk')
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const controller_responsavel = require('../services/cadastro-responsaveis-service');
const controller_familia = require('../services/cadastro-demografico-service')
const controller_controle = require('../services/cadastro-dados-controle-service')
const controller_moradia = require('../services/cadastro-ocupacao-service')
const cadastro_arquivo = require('../services/salva-pdf-service')
const moment = require('moment'); // Para manipular datas



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
            const existe_conjugue = await controller_familia.buscarUmConjugue(projeto_id,numero_cadastro)
            const deficiencia = await controller_familia.buscarUmDeficiencia(projeto_id,numero_cadastro)
            const moradia = await controller_moradia.buscarUm(projeto_id,numero_cadastro)
            // Carregar o PDF modelo
            const templatePath = path.resolve(process.cwd(), 'termosgerados', 'MO29881025.pdf');
            const templateBytes = fs.readFileSync(templatePath);
            const pdfDoc = await PDFDocument.load(templateBytes);

            // Obter a primeira página do PDF
            const page = pdfDoc.getPages()[0];
            const page2 = pdfDoc.getPages()[1];
            const page3 = pdfDoc.getPages()[2];
            const page4 = pdfDoc.getPages()[3];
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
let mes_declarada =''
if(dados_responsavel1.mes_referencia_renda_declarada == null || dados_responsavel1.mes_referencia_renda_declarada == undefined){
    mes_declarada =''
    page2.drawText( mes_declarada, {
        x: 381, // Ajuste conforme necessário
        y: height - 233, // Ajuste conforme necessário
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
    });
}else{
    page2.drawText( dados_responsavel1.mes_referencia_renda_declarada, {
        x: 381, // Ajuste conforme necessário
        y: height - 233, // Ajuste conforme necessário
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
    });
}

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
    y: height - 488, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});
page2.drawText( dados_responsavel1.cpf_tutor, {
    x: 398, // Ajuste conforme necessário
    y: height - 488, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});

page2.drawText( dados_responsavel2.nome_completo, {
    x: 60, // Ajuste conforme necessário
    y: height - 549, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});

page2.drawText( dados_responsavel2.data_nascimento.replace(/\//g, '  '), {
    x: 63, // Ajuste conforme necessário
    y: height - 596, // Ajuste conforme necessário
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
});

            //nacionalidade
            let nacionalidade2
            if (dados_responsavel2.pais == 'BRASIL' || dados_responsavel2.pais == 'brasil') {
                nacionalidade2 = 1
                page2.drawText(nacionalidade2.toString(), {
                    x: 253, // Ajuste conforme necessário
                    y: height - 596, // Ajuste conforme necessário
                    width: 18,
                    height: 10,
                    color: rgb(0, 0, 0),
                });
            } else {
                nacionalidade2 = 3
                page2.drawText(nacionalidade2.toString(), {
                    x: 253, // Ajuste conforme necessário
                    y: height - 596, // Ajuste conforme necessário
                    width: 18,
                    height: 10,
                    color: rgb(0, 0, 0),
                });
            }
            //cidade estado
            page2.drawText(dados_responsavel2.uf, {
                x: 407, // Ajuste conforme necessário
                y: height - 596, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            page2.drawText(dados_responsavel2.naturalidade, {
                x: 430, // Ajuste conforme necessário
                y: height - 596, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });


            page2.drawText(req.body.nome_mae2, {
                x: 60, // Ajuste conforme necessário
                y: height - 632, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            page2.drawText(req.body.nome_mae2, {
                x: 60, // Ajuste conforme necessário
                y: height - 632, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            
            page2.drawText(dados_responsavel2.rg, {
                x: 60, // Ajuste conforme necessário
                y: height - 669, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            page2.drawText(dados_responsavel2.rg_uf, {
                x: 191, // Ajuste conforme necessário
                y: height - 669, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            page2.drawText(dados_responsavel2.uf, {
                x: 307, // Ajuste conforme necessário
                y: height - 669, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            page2.drawText(dados_responsavel2.rg_data_expedicao.replace(/\//g, '  '), {
                x: 341, // Ajuste conforme necessário
                y: height - 669, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            page2.drawText(dados_responsavel2.nis, {
                x: 434, // Ajuste conforme necessário
                y: height - 669, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            page2.drawText(dados_responsavel2.cpf, {
                x: 60, // Ajuste conforme necessário
                y: height - 707, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            if (dados_responsavel2.tipo_contato1 == 'RESIDENCIAL') {
                page2.drawText(dados_responsavel2.contato1, {
                    x: 60, // Ajuste conforme necessário
                    y: height - 757, // Ajuste conforme necessário
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0),
                });
            } else if (dados_responsavel2.tipo_contato1 == 'CELULAR') {
                page2.drawText(dados_responsavel2.contato1, {
                    x: 217, // Ajuste conforme necessário
                    y: height - 757, // Ajuste conforme necessário
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0),
                });
            } else if (dados_responsavel2.tipo_contato1 == 'RECADO') {
                page2.drawText(dados_responsavel2.contato1, {
                    x: 372, // Ajuste conforme necessário
                    y: height - 757, // Ajuste conforme necessário
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0),
                });
            }

            //page3



            if (existe_conjugue.estado_civil == 'SOLTEIRO') {
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 117, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (existe_conjugue.estado_civil == 'DIVORC./DESQ.') {
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 141, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (existe_conjugue.estado_civil == 'VIÚVO(A)') {
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 165, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (existe_conjugue.estado_civil == 'UNIÃO ESTÁVEL') {
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 189, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }

            if (existe_conjugue.estudou_ate == '4ºANO ENS. FUND.') {
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 235, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (existe_conjugue.estudou_ate == '3ºANO ENS. FUND.' || existe_conjugue.estudou_ate == '2ºANO ENS. FUND.' || existe_conjugue.estudou_ate == '1ºANO ENS. FUND.') {
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 259, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }


            //grau de instrucao fund 2
            if (existe_conjugue.estudou_ate == '9ºANO ENS. FUND.') {
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 283, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if ( existe_conjugue.estudou_ate == '8ºANO ENS. FUND.' || existe_conjugue.estudou_ate == '7ºANO ENS. FUND.' || existe_conjugue.estudou_ate == '6ºANO ENS. FUND.' || existe_conjugue.estudou_ate == '5ºANO ENS. FUND.') {
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 307, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }

            //grau de instrucao medio 
            
            if (existe_conjugue.estudou_ate == '3ª SÉRIE ENS. MÉD.') {
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 235, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (existe_conjugue.estudou_ate == '2ª SÉRIE ENS. MÉD.' || existe_conjugue.estudou_ate == '1ª SÉRIE ENS. MÉD.') {
                page3.drawRectangle({
                    x: 348, // Posição no eixo X
                    y: height - 235, // Posição no eixo Y
                    width: 20.7, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }
            //grau superior e analfabeto 
            if (existe_conjugue.estudou_ate == 'NÍVEL SUPERIOR') {
                page3.drawRectangle({
                    x: 348, // Posição no eixo X
                    y: height - 259, // Posição no eixo Y
                    width: 20.7, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            } else if (existe_conjugue.estudou_ate == 'SEM ESCOLARIZAÇÃO') {
                page3.drawRectangle({
                    x: 348, // Posição no eixo X
                    y: height - 283, // Posição no eixo Y
                    width: 20.7, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });

            } else {
                // page3.drawRectangle({
                //     x: 348, // Posição no eixo X
                //     y: height - 307, // Posição no eixo Y
                //     width: 20.7, // Largura do retângulo
                //     height: 13, // Altura do retângulo
                //     // Cor da borda (preto, nesse caso)
                //     color: rgb(0, 0, 0)
                // });
            }


            page3.drawText(dados_responsavel2.cpf_cnpj_fonte_pegadora, {
                x: 60, // Ajuste conforme necessário
                y: height - 397, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            const rawDate3 = dados_responsavel1.data_admissao; // Exemplo: "01012023"

// Formatar a data com espaços
const formattedDate3 = `${rawDate3.slice(0, 2)}  ${rawDate3.slice(2, 4)}  ${rawDate3.slice(4)}`;
            page3.drawText(formattedDate3, {
                x: 433, // Ajuste conforme necessário
                y: height - 391, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            page3.drawText('R$'+dados_responsavel2.valor_renda_bruta.toString(), {
                x: 60, // Ajuste conforme necessário
                y: height - 439, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            page3.drawText('R$'+ dados_responsavel2.valor_renda_liquida.toString(), {
                x: 244, // Ajuste conforme necessário
                y: height - 439, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            page3.drawText(dados_responsavel2.mes_referencia_renda, {
                x: 404, // Ajuste conforme necessário
                y: height - 439, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });

            const rawDate4 = dados_responsavel1.data_admissao; // Exemplo: "01012023"

// Formatar a data com espaços
const formattedDate4 = `${rawDate4.slice(0, 2)}  ${rawDate4.slice(2, 4)}  ${rawDate4.slice(4)}`;
            page3.drawText(formattedDate4, {
                x: 60, // Ajuste conforme necessário
                y: height - 498, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            page3.drawText('R$'+dados_responsavel2.valor_renda_declarada_liquida.toString(), {
                x: 224, // Ajuste conforme necessário
                y: height - 499, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            page3.drawText(dados_responsavel2.mes_referencia_renda_declarada, {
                x: 382, // Ajuste conforme necessário
                y: height - 499, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            
            if(dados_responsavel2.beneficio_prestacao =='SIM'){
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 563, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }else{
                page3.drawRectangle({
                    x: 127, // Posição no eixo X
                    y: height - 563, // Posição no eixo Y
                    width: 20.7, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }
            
            if(dados_responsavel2.programa_bolsa_familia =='SIM'){
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 613, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }else{
                page3.drawRectangle({
                    x: 127, // Posição no eixo X
                    y: height - 613, // Posição no eixo Y
                    width: 20.7, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }
            //menor 18
            if(dados_responsavel2.menor_18 =='MENOR EMANCIPADO'){
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 661, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }else if(dados_responsavel2.menor_18 =='MENOR ASSISTIDO'){
                page3.drawRectangle({
                    x: 57, // Posição no eixo X
                    y: height - 689, // Posição no eixo Y
                    width: 20, // Largura do retângulo
                    height: 13, // Altura do retângulo
                    // Cor da borda (preto, nesse caso)
                    color: rgb(0, 0, 0)
                });
            }
            page3.drawText(dados_responsavel2.nome_tutor, {
                x: 60, // Ajuste conforme necessário
                y: height - 771, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
            page3.drawText(dados_responsavel2.cpf_tutor, {
                x: 403, // Ajuste conforme necessário
                y: height - 771, // Ajuste conforme necessário
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
            });
//page 4
if(existe_conjugue !=false){
    page4.drawRectangle({
        x: 57, // Posição no eixo X
        y: height - 140, // Posição no eixo Y
        width: 20, // Largura do retângulo
        height: 13, // Altura do retângulo
        // Cor da borda (preto, nesse caso)
        color: rgb(0, 0, 0)
    });
}else{
    page4.drawRectangle({
        x: 128, // Posição no eixo X
        y: height - 140, // Posição no eixo Y
        width: 20, // Largura do retângulo
        height: 13, // Altura do retângulo
        // Cor da borda (preto, nesse caso)
        color: rgb(0, 0, 0)
    });
}

function quebrarTexto(texto, maxWidth, font, fontSize, page) {
    const linhas = [];
    let linhaAtual = '';

    for (const palavra of texto.split(' ')) {
        const larguraLinha = font.widthOfTextAtSize(linhaAtual + palavra + ' ', fontSize);
        if (larguraLinha > maxWidth) {
            linhas.push(linhaAtual.trim());
            linhaAtual = palavra + ' ';
        } else {
            linhaAtual += palavra + ' ';
        }
    }

    if (linhaAtual.trim()) {
        linhas.push(linhaAtual.trim());
    }

    return linhas;
}


    if (deficiencia && deficiencia.length > 0) {
        // Criar uma lista de nomes e CIDs
        const nomes = deficiencia.map(item => item.nome_completo).join(', ');
        const cids = deficiencia.map(item => item.cid).join(', ');

        // Configurações para quebra de linha
        const maxWidthNomes = 440; // Ajuste a largura máxima permitida para os nomes
        const maxWidthCIDs = 360; // Ajuste a largura máxima permitida para os CIDs
        const lineHeight = 12; // Altura entre as linhas
        let y = height - 199; // Posição inicial no eixo Y

        // Quebrar texto dos nomes e CIDs
        const linhasNomes = quebrarTexto(nomes, maxWidthNomes, font, 9, page4);
        const linhasCIDs = quebrarTexto(cids, maxWidthCIDs, font, 9, page4);

        // Desenhar as linhas de nomes
        for (const linha of linhasNomes) {
            page4.drawText(linha, {
                x: 60,
                y: y,
                size: 9,
                font: font,
                color: rgb(0, 0, 0),
            });
            y -= lineHeight; // Avança para a próxima linha
        }

        // Resetar a posição Y para os CIDs
        y = height - 199;

        // Desenhar as linhas de CIDs
        for (const linha of linhasCIDs) {
            page4.drawText(linha, {
                x: 385,
                y: y,
                size: 9,
                font: font,
                color: rgb(0, 0, 0),
            });
            y -= lineHeight; // Avança para a próxima linha
        }
    } 
        // Caso não haja dados
        
if(moradia.adequacao_imovel =='SIM'){
    page4.drawRectangle({
        x: 57, // Posição no eixo X
        y: height - 267, // Posição no eixo Y
        width: 20, // Largura do retângulo
        height: 13, // Altura do retângulo
        color: rgb(0, 0, 0)
    });
}else{
    page4.drawRectangle({
        x: 128, // Posição no eixo X
        y: height - 267, // Posição no eixo Y
        width: 20.7, // Largura do retângulo
        height: 13, // Altura do retângulo
        color: rgb(0, 0, 0)
    });
}

if(req.body.pmcmvFar1 == true){
    page4.drawRectangle({
        x: 57, // Posição no eixo X
        y: height - 478, // Posição no eixo Y
        width: 17, // Largura do retângulo
        height: 13, // Altura do retângulo
        color: rgb(0, 0, 0)
    }); 
}else{
    page4.drawRectangle({
        x: 57, // Posição no eixo X
        y: height - 505, // Posição no eixo Y
        width: 17, // Largura do retângulo
        height: 13, // Altura do retângulo
        color: rgb(0, 0, 0)
    });
}

if(req.body.pmcmvFds1 == true){
    page4.drawRectangle({
        x: 57, // Posição no eixo X
        y: height - 566, // Posição no eixo Y
        width: 17, // Largura do retângulo
        height: 13, // Altura do retângulo
        color: rgb(0, 0, 0)
    }); 
}else{
    page4.drawRectangle({
        x: 57, // Posição no eixo X
        y: height - 590, // Posição no eixo Y
        width: 17, // Largura do retângulo
        height: 13, // Altura do retângulo
        color: rgb(0, 0, 0)
    });
}
  
const pdfBytes = await pdfDoc.save(); // Certifique-se de que `pdfDoc` foi inicializado corretamente

// Caminho de saída
const outputPath = path.resolve(process.cwd(), 'termosgerados', 'mo_preenchido.pdf');

// Garantir que o diretório exista
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Salvar o PDF no sistema de arquivos
fs.writeFileSync(outputPath, pdfBytes);

// Configuração do AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AMAZON_KEY_ACESS, // Configure isso nas variáveis de ambiente
    secretAccessKey: process.env.SECRET_ACESS_KEY,
    region: process.env.AWS_REGION // Exemplo: 'us-east-2'
});

// Ler o conteúdo do arquivo para upload
const fileContent = fs.readFileSync(outputPath);

// Parâmetros do upload
const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // Nome do bucket
    Key: `termosgerados/mo_preenchido-${dados_responsavel1.numero_cadastro}.pdf`, // Caminho e nome do arquivo no bucket
    Body: fileContent,
    ContentType: 'application/pdf' // Tipo de conteúdo
};

// Fazer o upload para o S3
const uploadResult = await s3.upload(params).promise();
const s3Url = uploadResult.Location;
const dataCriacao = moment().format('DD/MM/YYYY');
const fileName = `mo_preenchido-${dados_responsavel1.numero_cadastro}.pdf`;



cadastro_arquivo.inserir(s3Url,dados_responsavel1.numero_cadastro,dados_responsavel1.nome_completo,fileName,dataCriacao)


// Opcional: Excluir o arquivo local após o upload
fs.unlinkSync(outputPath);

// Retornar a URL do arquivo no S3 e enviar o PDF gerado como resposta
return res.status(200).json({
    message: 'PDF salvo no S3 com sucesso!',
    s3Url: uploadResult.Location
});
         
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
            res.status(500).send('Erro ao gerar o PDF');
        }
    },
};
