# Criação das Apis para Controle de Frotas

### O que é preciso ter instalado no computador para começar?

* [Visual Studio 2017](https://visualstudio.microsoft.com/downloads/) ou [Visual Studio Code](https://code.visualstudio.com/download)
* Ter o SDK do .NET 3.0 instalado na maquina, pode ser baixado por meio do link: [Download .NET Core 3.0](https://dotnet.microsoft.com/download)
* [PostMan](https://www.getpostman.com/downloads/) ou [Insomnia](https://insomnia.rest/) para gerar as requisições para a API

### O que preciso saber?

* O que é uma API REST
* Requisições HTTP (Basico)
* [Versionamento GIT Basic](https://www.youtube.com/results?search_query=git+tutorial+para+iniciantes)
* Usar o [PostMan](https://www.youtube.com/watch?v=H16GUC9Svyk) ou Insomnia

### Por onde começar?

Foi incluído nesse repositório um exemplo de API completa, para cada grupo de procedures (Inclusão, Alteração, Consulta e Exclusão) que foi criada anteriormente, vamos criar uma API. 

Exemplo a API de multas.

> Para todas API's é quase copiar e colar alterando para cada procedure.

No caso da tabela de Multas foram criadas as seguintes procedures: 
* SP_SELECIONAR_CMULTAS
* SP_INCLUIR_CMULTAS
* SP_EXCLUIR_CMULTAS
* SP_ALTERAR_CMULTAS

Esse grupo de procedures representam as 4 ações que foram criadas para o controle das multas, dessa forma, vamos criar uma API que irá gerenciar os dados para cada cadastro.

Dentro da API vamos criar um Controller, que irá gerenciar essas ações, que no formato HTTP serão os metodos: 
* GET - Consulta
* POST - Inclusão
* PUT - Alteração
* DELETE - Exclusão

Vou abordar como implementar cada metodo abaixo:

## Pontos na implementação:

### Estrutura de Pastas

Assim como a API de multas deverá ser mantido o mesmo modelo de nome da pasta e projeto.

Exemplo:

* api-multas
* api-veiculos

Para iniciar basta baixar o zip e copiar e colar a api-multas e renomear as pastas e arquivos para o nome da sua api, no final me envia o projeto compactado que eu subo no GIT, *se conseguir subir no GitHub melhor ainda.*

### Método **ExecutarProcedure**

Foi criado um metodo que irá lidar com a conexão com o banco de dados, para deixar as coisas mais simples para implementar, esse metodo espera 3 informações: 
```C#
await new BancodeDados().ExecutarProcedure<Multa>("SP_SELECIONAR_CMULTAS",
                    new System.Data.SqlClient.SqlParameter("@CMID", IdMulta));
 ```
Esse método **ExecutarProcedure** recebe três parâmetros:

1. Objeto a ser tratado com os dados da procedure. - Multas
2. Nome da procedure a ser executada - SP_SELECIONAR_CMULTAS
3. Paramêtros de entrada da procedure - new System.Data.SqlClient.SqlParameter("@CMID", IdMulta)

Ele efetua a conexão com o Banco de Dados, e  que foram criadas as procedures anteriormente e executa/retorna as informações.

Esse método efetua conexão com o Banco de Dados e efetua a execução dela, retornando as informações para a classe(Modelo de Dados).


### Modelo de Dados

Para cada tabela deverá ser criado um modelo de dados, parecido com o abaixo, onde é possivel efetuar o relacionamento entre as colunas do banco de dados e os campos do objeto, para facilitar o uso das API's é necessário que os nomes das propriedades sejam amigáveis.

Exemplo:

```C#
public class Multa
    {

        [Coluna("CMID")]
        public int IdMulta { get; set; }

        [Coluna("CMCODIGOMULTA")]
        public int CodigoMulta { get; set; }

        [Coluna("CMDTHRINFRACAO")]
        public DateTime DataHoraInfracao { get; set; }

        [Coluna("CMDTHRRECEBIMENTO")]
        public DateTime DataHoraRecebimentoInfracao { get; set; }

        [Coluna("CMLOCAL")]
        public string Local { get; set; }

        [Coluna("CMPONTOS")]
        public int Pontos { get; set; }

        [Coluna("CMVALOR")]
        public double Valor { get; set; }

        [Coluna("CMPLACA")]
        public string Placa { get; set; }
    }
```

Pontos importantes:
* No atributo coluna deve ser colocado o nome da coluna no banco de dados
* O nome da propriedade deve ser amigavel para facil entendimento
* A propriedade deverá ter um tipo compátivel com o da tabela no banco de dados, segue abaixo um de-para:

Tipos do SQL para C#

| Tipo Banco de Dados | Tipo C#  |
|---------------------|----------|
| VARCHAR             | string   |
| INT                 | int      | 
| DATETIME            | DateTime |
| FLOAT               | double   |


# Métodos a serem implementados

## GET - Consulta

Nesse vamos efetuar a chamada da procedure que foi criada para efetuar a consulta dos dados, no caso da API de Multas é a procedure SP_SELECIONAR_CMULTAS.

Esse método deverá receber os campos da chave da tabela para conseguir encontrar o registro

> Deverá ser mantido o modelo abaixo para manter o tratamento de erros correto.

```C#
        [HttpGet]
        public async Task<Multas> Get(int IdMulta)
        {
            var retorno = new Multas();

            try
            {

                retorno.ListaMultas = await new BancodeDados().ExecutarProcedure<Multa>(
                    "SP_SELECIONAR_CMULTAS",
                    new System.Data.SqlClient.SqlParameter("@CMID", IdMulta));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }
```

## POST - Inclusão

Nesse vamos efetuar a chamada da procedure que foi criada para efetuar a inclusão dos dados, no caso da API de Multas é a procedure SP_INCLUIR_CMULTAS.

Esse metodo recebe a classe como entrada, visto que essa tem todos os campos da tabela, sendo necessário efetuar o relacionamento dos campos da tabela com os paramêtros da procedure de inclusão.

> Deverá ser mantido o modelo abaixo para manter o tratamento de erros correto.

```C#
[HttpPost]
        public async Task<RetornoAPI> Post(Multa modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CMCODIGOMULTA", modelo.CodigoMulta));
                ParametrosEntrada.Add(new SqlParameter("@CMDTHRINFRACAO", modelo.DataHoraInfracao));
                ParametrosEntrada.Add(new SqlParameter("@CMDTHRRECEBIMENTO", modelo.DataHoraRecebimentoInfracao));
                ParametrosEntrada.Add(new SqlParameter("@CMLOCAL", modelo.Local));
                ParametrosEntrada.Add(new SqlParameter("@CMPONTOS", modelo.Pontos));
                ParametrosEntrada.Add(new SqlParameter("@CMVALOR", modelo.Valor));
                ParametrosEntrada.Add(new SqlParameter("@CMPLACA", modelo.Placa));

                await new BancodeDados().ExecutarProcedure<Multa>(
                    "SP_INCLUIR_CMULTAS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }
```

## DELETE - Exclusão

Nesse vamos efetuar a chamada da procedure que foi criada para efetuar a exclusão dos dados, no caso da API de Multas é a procedure SP_EXCLUIR_CMULTAS, note que o metodo deverá receber os campos da chave da tabela para conseguir encontrar o registro para excluir:

> Deverá ser mantido o modelo abaixo para manter o tratamento de erros correto.

```C#
        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdMulta)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CMID", IdMulta));


                await new BancodeDados().ExecutarProcedure<Multa>(
                    "SP_EXCLUIR_CMULTAS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }
```

## PUT - Alteração

Nesse vamos efetuar a chamada da procedure que foi criada para efetuar a consulta dos dados, no caso da API de Multas é a procedure SP_ALTERAR_CMULTAS.

Esse método, assim como o metodo de inclusão precisa receber todos campos da tabela, por isso o parametro de entrada é uma classe, a que foi criada anteriormente, nessa vamos ter disponivel todos os campos para conseguir efetuar a alteração dos dados.

> Deverá ser mantido o modelo abaixo para manter o tratamento de erros correto.

```C#
        [HttpPut]
        public async Task<RetornoAPI> Put(Multa modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@CMID", modelo.IdMulta));
                ParametrosEntrada.Add(new SqlParameter("@CMCODIGOMULTA", modelo.CodigoMulta));
                ParametrosEntrada.Add(new SqlParameter("@CMDTHRINFRACAO", modelo.DataHoraInfracao));
                ParametrosEntrada.Add(new SqlParameter("@CMDTHRRECEBIMENTO", modelo.DataHoraRecebimentoInfracao));
                ParametrosEntrada.Add(new SqlParameter("@CMLOCAL", modelo.Local));
                ParametrosEntrada.Add(new SqlParameter("@CMPONTOS", modelo.Pontos));
                ParametrosEntrada.Add(new SqlParameter("@CMVALOR", modelo.Valor));
                ParametrosEntrada.Add(new SqlParameter("@CMPLACA", modelo.Placa));

                await new BancodeDados().ExecutarProcedure<Multa>(
                    "SP_ALTERAR_CMULTAS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }
```


