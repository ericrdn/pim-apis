GO
PRINT CONVERT(VARCHAR(20), GETDATE(), 109) + ' - INICIO CRIACAO DAS PROCEDURES'
GO
USE [FrotaVeiculos]
GO
/****** Object:  StoredProcedure [dbo].[AAA]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AAA] AS SELECT 1
GO
/****** Object:  StoredProcedure [dbo].[ATUALIZAR_USUARIO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ATUALIZAR_USUARIO] ( @EMAIL VARCHAR(100), @NOME VARCHAR(20) )

AS BEGIN

UPDATE USUARIOS SET NOME = @NOME WHERE EMAIL = @EMAIL
END
GO
/****** Object:  StoredProcedure [dbo].[CONSULTAR_USUARIO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CONSULTAR_USUARIO] ( @EMAIL VARCHAR(100) )

AS BEGIN

SELECT * FROM USUARIOS WHERE EMAIL = @EMAIL
END
GO
/****** Object:  StoredProcedure [dbo].[INCLUIR_USUARIO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[INCLUIR_USUARIO] ( @NOME VARCHAR(20), @EMAIL VARCHAR(100) )

AS BEGIN

INSERT INTO USUARIOS (NOME, EMAIL) VALUES (@NOME, @EMAIL)

END
GO
/****** Object:  StoredProcedure [dbo].[MUDA_STATUS_CHAVE_ESTRANGEIRA]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[MUDA_STATUS_CHAVE_ESTRANGEIRA]  @enable_constraints bit = 0

AS 

BEGIN
 
	--Don't change anything below this line.
	DECLARE @schema_name SYSNAME
	DECLARE @table_name  SYSNAME
 
	DECLARE table_cursor CURSOR FOR
	SELECT
		schemas.name,
		tables.name
	FROM
		sys.tables
		INNER JOIN sys.schemas ON tables.schema_id = schemas.schema_id
 
	OPEN table_cursor
	FETCH NEXT FROM table_cursor INTO @schema_name, @table_name
 
	DECLARE @cmd varchar(200) 
	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @cmd = 'ALTER TABLE ' + QUOTENAME(@schema_name) + '.' + QUOTENAME(@table_name) + ' '
		SET @cmd = @cmd + (CASE WHEN @enable_constraints = 1 THEN 'CHECK' ELSE 'NOCHECK' END) + ' CONSTRAINT ALL'
 
		PRINT @cmd
		EXEC( @cmd )
 
		FETCH NEXT FROM table_cursor INTO @schema_name, @table_name
	END
 
	CLOSE table_cursor
	DEALLOCATE table_cursor

END
GO
/****** Object:  StoredProcedure [dbo].[RETORNA_DADOS_HOME]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RETORNA_DADOS_HOME] 
AS BEGIN
   SELECT 
      VEICULOS_OPERACAO =  ISNULL( ( SELECT COUNT(*) FROM CVEICULOS WHERE CVANO = 1 ), 0),
	  VEICULOS_MANUTENCAO_MES = ISNULL( ( SELECT COUNT(*) FROM CVEICULOS WHERE CVANO = 2), 0),
	  VALOR_MULTA_MES =  ISNULL(( SELECT SUM(CMVALOR) FROM CMULTAS ), 0),
	  VALOR_MANUTENCAO =ISNULL( ( SELECT SUM(CMVALOR) FROM CMANUTENCAO ), 0),
	  VALOR_PECAS = ISNULL((SELECT SUM(TPVALORPECA) FROM CESTOQUEPECAS INNER JOIN TPECAS ON (CMIDPECA = TPID)), 0),
	  VALOR_ESTACIONAMENTO = ISNULL(( SELECT SUM(CRVALOR) FROM CREEMBOLSOS WHERE CRTIPO = 1), 0),
	  VALOR_COMBUSTIVEL = ISNULL( ( SELECT SUM(CRVALOR) FROM CREEMBOLSOS WHERE CRTIPO = 2), 0)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERA_CEMAILS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERA_CEMAILS]
(

@CEID INT,
@CECNPJCPF VARCHAR (18),
@CEEMAIL VARCHAR (200),
@CETIPO INT,
@CEACEITARECEBER INT )

AS BEGIN

UPDATE
CEMAILS
SET

CECNPJCPF = @CECNPJCPF,
CEEMAIL = @CEEMAIL,
CETIPO = @CETIPO,
CEACEITARECEBER= @CEACEITARECEBER

WHERE
CEID = @CEID

END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERA_CENDERECO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERA_CENDERECO]  
(   
  
@CEID INT,  
@CERUA VARCHAR (200),  
@CENUMERO VARCHAR (20),  
@CECOMPLEMENTO VARCHAR (20),  
@CEBAIRRO VARCHAR (50),  
@CECIDADE VARCHAR (50),  
@CEUF VARCHAR (50),  
@CEPAIS VARCHAR (50),  
@CELOCALIZACAOGOOGLE VARCHAR (50)  
)  
  
AS BEGIN  
  
UPDATE  
CENDERECO  
  
SET  
  
CERUA = @CERUA ,  
CENUMERO = @CENUMERO ,  
CECOMPLEMENTO = @CECOMPLEMENTO,  
CEBAIRRO = @CEBAIRRO,  
CECIDADE = @CECIDADE,  
CEUF = @CEUF,  
CEPAIS = @CEPAIS,  
CELOCALIZACAOGOOGLE = @CELOCALIZACAOGOOGLE  
  
  
WHERE  
CEID = @CEID  
  
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERA_CESTOQUEPECAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERA_CESTOQUEPECAS]  
(  
  
@CMID INT,  
@CMIDPECA INT,  
@CMPLACAVEICULO VARCHAR (7),  
@CMDESCRICAO VARCHAR (1000),  
@CMIDMANUTENCAO INT  
)  
AS BEGIN  
  
UPDATE  
CESTOQUEPECAS  
SET  
  
CMIDPECA = @CMIDPECA,  
CMPLACAVEICULO = @CMPLACAVEICULO,  
CMDESCRICAO = @CMDESCRICAO,  
CMIDMANUTENCAO = @CMIDMANUTENCAO  
  
WHERE  
CMID = @CMID  
  
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERA_CMANUTENCAO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERA_CMANUTENCAO] 
( 
    @CMID INT,
	@CMPLACAVEICULO VARCHAR (7),
	@CMDESCRICAO VARCHAR (1000),
	@CMTIPOMANUTENCAO VARCHAR(50),
    @CMPECAUSADA VARCHAR(50),
    @CMVALOR FLOAT) 
AS BEGIN
	UPDATE 
	   CMANUTENCAO 
	SET 
		CMPLACAVEICULO	   = @CMPLACAVEICULO,
		CMDESCRICAO		   = @CMDESCRICAO,
		CMTIPOMANUTENCAO   = @CMTIPOMANUTENCAO,
		CMPECAUSADA	       = @CMPECAUSADA,
		CMVALOR            = @CMVALOR
		
	WHERE 
		CMID			   = @CMID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERA_CUSUARIOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERA_CUSUARIOS] 
( 
	@CUID INT,
	@CUNOME VARCHAR(200), 
	@CUCNPJCPF VARCHAR(18), 
	@CUCNH VARCHAR(20), 
	@CURG VARCHAR(11), 
	@CUTPUSUARIO INT, 
	@CUIDENDERECO VARCHAR(800), 
	@CUCARTEIRATRABALHO VARCHAR(20),
	@CUDATAVALIDADECNH DATETIME,
	@CUDATAULTIMOEXAMEMEDICO DATETIME
	
	) 
AS BEGIN
	UPDATE 
	   CUSUARIOS 
	SET 
		CUNOME			   = @CUNOME,
		CUCNPJCPF		   = @CUCNPJCPF,
		CUCNH			   = @CUCNH,
		CURG			   = @CURG,
		CUTPUSUARIO		   = @CUTPUSUARIO,
		CUIDENDERECO	           = @CUIDENDERECO,
		CUCARTEIRATRABALHO         = @CUCARTEIRATRABALHO,
		CUDATAVALIDADECNH          = @CUDATAVALIDADECNH,
	        CUDATAULTIMOEXAMEMEDICO    = @CUDATAULTIMOEXAMEMEDICO
		
	WHERE 
		CUID			   = @CUID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERA_CVEICULOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERA_CVEICULOS] 
( 
	@CVCGC_PROPIETARIO VARCHAR(18), 
	@CVPLACA VARCHAR(7), 
	@CVCHASSI VARCHAR(17), 
	@CVMODELO VARCHAR(20), 
	@CVMARCAR VARCHAR(30), 
	@CVCOR VARCHAR(10), 
	@CVANO INT,
	@CVTIPOVEICULO INT,
	@CVQUILOMETRAGEM INT,
	@CVVALIDADESEGURO DATETIME,
	@CVNOMESEGURADORA VARCHAR(50),
	@CVNUMEROAPOLICE INT
	) 
AS BEGIN
	UPDATE 
	   CVEICULOS 
	SET 
		CVCGC_PROPIETARIO  = @CVCGC_PROPIETARIO,
		CVPLACA		   = @CVPLACA,
		CVCHASSI           = @CVCHASSI,
		CVMODELO	   = @CVMODELO,
		CVMARCAR	   = @CVMARCAR,
		CVCOR        	   = @CVCOR,
		CVANO              = @CVANO,
		CVTIPOVEICULO      = @CVTIPOVEICULO,
		CVQUILOMETRAGEM    = @CVQUILOMETRAGEM,    
	        CVVALIDADESEGURO   = @CVVALIDADESEGURO,
	        CVNOMESEGURADORA   = @CVNOMESEGURADORA,
                CVNUMEROAPOLICE    = @CVNUMEROAPOLICE
	WHERE 
		CVPLACA			   = @CVPLACA
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERA_LLOCACAO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERA_LLOCACAO]
( 
    @LLID INT,
	@LLUSUARIOCAD INT, 
	@LLIDCLIENTE INT, 
	@LLPLACAVEICULO VARCHAR(7), 
	@LLDTHRCAD DATETIME, 
	@LLDTHRINICIO DATETIME, 
	@LLDTHRFINAL DATETIME, 
	@LLIDSEGUROCONTRATADO INT,
	@LLVALORDIALOCACAO FLOAT ) 
AS BEGIN
	UPDATE 
	   LLOCACAO 
	SET 
		LLUSUARIOCAD         = @LLUSUARIOCAD,
		LLIDCLIENTE          = @LLIDCLIENTE,
		LLPLACAVEICULO	     = @LLPLACAVEICULO,
		LLDTHRCAD		     = @LLDTHRCAD,
		LLDTHRINICIO	     = @LLDTHRINICIO,
		LLDTHRFINAL    	     = @LLDTHRFINAL,
		LLIDSEGUROCONTRATADO = @LLIDSEGUROCONTRATADO,
		LLVALORDIALOCACAO    = @LLVALORDIALOCACAO
	WHERE 
		LLID			   = @LLID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERA_LVIAGENS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERA_LVIAGENS]
( 
    @LVID INT,
	@LVDTHRCAD DATETIME, 
	@LVDTHRINICIO DATETIME, 
	@LVDTHRFINAL DATETIME, 
	@LVPLACAVEICULO VARCHAR(7), 
	@LVIDENDERECOORIGEM INT, 
	@LVIDENDERECODESTINO INT, 
	@LVPREVISAOKM INT ) 
AS BEGIN
	UPDATE 
	   LVIAGENS 
	SET 
		LVDTHRCAD           = @LVDTHRCAD,
		LVDTHRINICIO        = @LVDTHRINICIO,
		LVDTHRFINAL		    = @LVDTHRFINAL,
		LVPLACAVEICULO	    = @LVPLACAVEICULO,
		LVIDENDERECOORIGEM  = @LVIDENDERECOORIGEM,
		LVIDENDERECODESTINO = @LVIDENDERECODESTINO,
		LVPREVISAOKM        = @LVPREVISAOKM
	WHERE 
		LVID			   = @LVID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERA_TPECAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERA_TPECAS] 
( 
    @TPID INT,
	@TPDESCRICAO VARCHAR (50),
	@TPDATAUSO DATETIME,
	@TPVALORPECA FLOAT
	
	) 
AS BEGIN
	UPDATE 
	   TPECAS 
	SET 
		TPDESCRICAO	   = @TPDESCRICAO,
		TPDATAUSO		   = @TPDATAUSO,
		TPVALORPECA		   = @TPVALORPECA
		
	WHERE 
		TPID			   = @TPID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_CCLIENTES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	 CREATE PROCEDURE [dbo].[SP_ALTERAR_CCLIENTES](
	 @COID INT,
	 @COCPF VARCHAR(18),
	 @CONOMECLI VARCHAR(200)
	 )
	 AS
	     UPDATE CCLIENTES SET COCPF = @COCPF, CONOMECLI = @CONOMECLI WHERE COID = @COID
	 
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_CMANUTENCAO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERAR_CMANUTENCAO] 
( 
    @CMID INT,
	@CMPLACAVEICULO VARCHAR (7),
	@CMDESCRICAO VARCHAR (1000),
	@CMTIPOMANUTENCAO VARCHAR(50),
    @CMPECAUSADA VARCHAR(50),
    @CMVALOR FLOAT) 
AS BEGIN
	UPDATE 
	   CMANUTENCAO 
	SET 
		CMPLACAVEICULO	   = @CMPLACAVEICULO,
		CMDESCRICAO		   = @CMDESCRICAO,
		CMTIPOMANUTENCAO   = @CMTIPOMANUTENCAO,
		CMPECAUSADA	       = @CMPECAUSADA,
		CMVALOR            = @CMVALOR
		
	WHERE 
		CMID			   = @CMID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_CMULTAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_ALTERAR_CMULTAS] (
	@CMCODIGOMULTA INT,
	@CMDTHRINFRACAO DATETIME,
	@CMDTHRRECEBIMENTO DATETIME,
	@CMLOCAL VARCHAR (200),
	@CMPONTOS INT,
	@CMVALOR FLOAT,
	@CMPLACA VARCHAR (7),
	@CMID INT
)
AS 
	UPDATE 
		CMULTAS 
	SET 
		CMCODIGOMULTA = @CMCODIGOMULTA,  CMDTHRINFRACAO = @CMDTHRINFRACAO, CMDTHRRECEBIMENTO = @CMDTHRRECEBIMENTO, 
		CMLOCAL = @CMLOCAL, CMPONTOS = @CMPONTOS, CMVALOR = @CMVALOR, CMPLACA = @CMPLACA WHERE CMID = @CMID
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_COCUPANTES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERAR_COCUPANTES](
	@COID INT,
	@COIDVIAGEM INT
	
)
AS 
	UPDATE COCUPANTES SET COIDVIAGEM = @COIDVIAGEM WHERE COID = @COID
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_CPROPIETARIOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERAR_CPROPIETARIOS](
	@CPID INT,
	@CPCGC VARCHAR(18),
	@CPNOME VARCHAR(200)
)
AS 
	UPDATE CPROPIETARIOS SET CPCGC = @CPCGC, CPNOME = @CPNOME  WHERE CPID = @CPID
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_CREEMBOLSOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERAR_CREEMBOLSOS] (
         
		 @CRID INT,
		 @CRTIPO INT,
		 @CRPLACAVEICULO VARCHAR (7),
		 @CRIDENDERECO VARCHAR(800),
		 @CRVALOR FLOAT,
		 @CRDTHRCAD DATETIME,
		 @CRDTHRINI DATETIME,
		 @CRDTHRFIM DATETIME
		 )
	AS

	   UPDATE CREEMBOLSOS 
SET
   CRTIPO = @CRTIPO,
   CRPLACAVEICULO = @CRPLACAVEICULO,
   CRIDENDERECO = @CRIDENDERECO, 
   CRVALOR = @CRVALOR,
   CRDTHRCAD = @CRDTHRCAD,
   CRDTHRINI = @CRDTHRINI,
   CRDTHRFIM = @CRDTHRFIM



WHERE
   CRID = @CRID
	 
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_CSEGURO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERAR_CSEGURO] (  
           
   @CCID INT,  
   @CCPLACAVEICULO VARCHAR (7),  
   @CCSEGURADORA VARCHAR (200),  
   @CCCONTRATOLOCACAO VARCHAR (20),  
   @CCDTINIVIGENCIA DATETIME,  
   @CCDTFIMVIGENCIA DATETIME,  
   @CCVALORSEGURO FLOAT  
   )  
 AS BEGIN 
  
    UPDATE CSEGURO   
SET  
   CCPLACAVEICULO = @CCPLACAVEICULO,  
   CCSEGURADORA = @CCSEGURADORA,   
   CCCONTRATOLOCACAO= @CCCONTRATOLOCACAO,  
   CCDTINIVIGENCIA = @CCDTINIVIGENCIA,  
   CCDTFIMVIGENCIA = @CCDTFIMVIGENCIA,  
   CCVALORSEGURO = @CCVALORSEGURO  
  
  
  
WHERE  
   CCID = @CCID

   END
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_CSINISTRO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERAR_CSINISTRO] (
         
		 @CSID INT,
		 @CSPLACAVEICULO VARCHAR (7),
		 @CSIDSEGURO INT,
		 @CSDESCRICAO VARCHAR (1000)
		 
		 )
	AS

	   UPDATE CSINISTRO 
SET
   
   CSPLACAVEICULO = @CSPLACAVEICULO,
   CSIDSEGURO = @CSIDSEGURO,
   CSDESCRICAO = @CSDESCRICAO
   
WHERE
   CSID = @CSID
	 
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_CTELEFONES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERAR_CTELEFONES] (
         
		 @CTID INT,
		 @CTCNPJCPF VARCHAR (18),
		 @CTDD INT,
		 @CTNUMERO INT,
		 @CTTIPO INT,
		 @CTOPERADORA INT
		 
		 )
	AS

	   UPDATE CTELEFONES 
SET
   
   CTCNPJCPF = @CTCNPJCPF,
   CTDD = @CTDD,
   CTNUMERO = @CTNUMERO,
   CTTIPO = @CTTIPO,
   CTOPERADORA = @CTOPERADORA

WHERE
   CTID = @CTID
	 
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_TREEMBOLSOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERAR_TREEMBOLSOS](
	@TRID INT,
	@TRDESCRICAO VARCHAR(50)
)
AS 
	UPDATE TREEMBOLSOS SET TRDESCRICAO = @TRDESCRICAO WHERE TRID = @TRID
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_TUSUARIO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERAR_TUSUARIO](
	@TUID INT,
	@TUDESCRICAO VARCHAR(20),
	@TUCAMPOSOBRIGATORIOS VARCHAR(50)
)
AS 
	UPDATE TUSUARIO SET TUDESCRICAO = @TUDESCRICAO, TUCAMPOSOBRIGATORIOS = @TUCAMPOSOBRIGATORIOS  WHERE TUID = @TUID
GO
/****** Object:  StoredProcedure [dbo].[SP_ALTERAR_TVEICULOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ALTERAR_TVEICULOS](
	@TVDESCRICAOTIPO VARCHAR (50),
	@TVID INT
)
AS 
	UPDATE TVEICULOS SET TVDESCRICAOTIPO =@TVDESCRICAOTIPO WHERE TVID = @TVID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CCEMAILS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
		 CREATE PROCEDURE [dbo].[SP_EXCLUIR_CCEMAILS](
		 @CEID INT
		 )
		 AS
		 DELETE CEMAILS WHERE CEID = @CEID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CCLIENTES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	CREATE PROCEDURE [dbo].[SP_EXCLUIR_CCLIENTES](
	@COID INT
	)
	AS
		 DELETE CCLIENTES WHERE COID = @COID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CENDERECO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CENDERECO] 
( 
	@CEID INT
) 
AS BEGIN
	DELETE
	FROM 
		CENDERECO
	WHERE 
		CEID			   = @CEID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CESTOQUEPECAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CESTOQUEPECAS] 
( 
	@CMID INT
) 
AS BEGIN
	DELETE
	FROM 
		CESTOQUEPECAS
	WHERE 
		CMID			   = @CMID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CMANUTENCAO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CMANUTENCAO]
( 
	@CMID INT
) 
AS BEGIN
	DELETE
	FROM 
		CMANUTENCAO
	WHERE 
		CMID			   = @CMID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CMULTAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CMULTAS](
	@CMID INT
)
AS 
	DELETE FROM CMULTAS WHERE CMID = @CMID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_COCUPANTES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_COCUPANTES](
	@COID INT
)
AS 
	DELETE COCUPANTES WHERE COID = @COID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CPROPIETARIOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CPROPIETARIOS](
	@CPID INT
)
AS 
	DELETE CPROPIETARIOS WHERE CPID = @CPID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CREEMBOLSOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CREEMBOLSOS] (
	@CRID INT
)
AS 
	DELETE FROM CREEMBOLSOS WHERE CRID = @CRID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CSEGURO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CSEGURO] (
	@CCID INT
)
AS 
	DELETE FROM CSEGURO WHERE CCID = @CCID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CSINISTRO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CSINISTRO] (
	@CSID INT
)
AS 
	DELETE FROM CSINISTRO WHERE CSID = @CSID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CTELEFONES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CTELEFONES] (
	@CTID INT
)
AS 
	DELETE FROM CTELEFONES WHERE CTID = @CTID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CUSUARIOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CUSUARIOS] 
( 
	@CUID INT
) 
AS BEGIN
	DELETE
	FROM 
		CUSUARIOS
	WHERE 
		CUID			   = @CUID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_CVEICULOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_CVEICULOS]
( 
	@CVPLACA VARCHAR(7)
) 
AS BEGIN
	DELETE
	FROM 
		CVEICULOS
	WHERE 
		CVPLACA			   = @CVPLACA
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_LLOCACAO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_LLOCACAO]
( 
	@LLID INT
) 
AS BEGIN
	DELETE
	FROM 
		LLOCACAO
	WHERE 
		LLID			   = @LLID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_LVIAGENS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_LVIAGENS]
( 
	@LVID INT
) 
AS BEGIN
	DELETE
	FROM 
		LVIAGENS
	WHERE 
		LVID			   = @LVID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_TPECAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_TPECAS]
( 
	@TPID INT
) 
AS BEGIN
	DELETE
	FROM 
		TPECAS
	WHERE 
		TPID			   = @TPID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_TREEMBOLSOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_TREEMBOLSOS](
	@TRID INT
)
AS 
	DELETE FROM TREEMBOLSOS WHERE TRID = @TRID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_TUSUARIO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_TUSUARIO](
	@TUID INT
)
AS 
	DELETE FROM TUSUARIO WHERE TUID = @TUID
GO
/****** Object:  StoredProcedure [dbo].[SP_EXCLUIR_TVEICULOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EXCLUIR_TVEICULOS](
	@TVID INT
)
AS 
	DELETE TVEICULOS WHERE TVID = @TVID
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CCLIENTES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CCLIENTES]
(
        @COCPF VARCHAR (18),
         @CONOMECLI VARCHAR (200)
     )
     AS
	 BEGIN
     INSERT INTO CCLIENTES (COCPF, CONOMECLI) VALUES (@COCPF, @CONOMECLI)
	 END
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CEMAILS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_INCLUIR_CEMAILS]
(
@CECNPJCPF VARCHAR (18),
@CEEMAIL VARCHAR (200),
@CETIPO INT,
@CEACEITARECEBER INT )

AS BEGIN
INSERT INTO CEMAILS (CECNPJCPF, CEEMAIL, CETIPO, CEACEITARECEBER)
VALUES (@CECNPJCPF, @CEEMAIL, @CETIPO, @CEACEITARECEBER)

END
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CENDERECO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CENDERECO]  
(  
@CERUA VARCHAR (200),  
@CENUMERO VARCHAR (20),  
@CECOMPLEMENTO VARCHAR (20),  
@CEBAIRRO VARCHAR (50),  
@CECIDADE VARCHAR (50),  
@CEUF VARCHAR (50),  
@CEPAIS VARCHAR (50),  
@CELOCALIZACAOGOOGLE VARCHAR (50)  
)  
  
  
AS BEGIN  
INSERT INTO CENDERECO (CERUA, CENUMERO, CECOMPLEMENTO, CEBAIRRO, CECIDADE, CEUF, CEPAIS, CELOCALIZACAOGOOGLE)   
  
VALUES (@CERUA, @CENUMERO, @CECOMPLEMENTO, @CEBAIRRO , @CECIDADE, @CEUF,  
@CEPAIS, @CELOCALIZACAOGOOGLE)  
  
END  
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CESTOQUEPECAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CESTOQUEPECAS]  
(    
@CMIDPECA INT,  
@CMPLACAVEICULO VARCHAR (7),  
@CMDESCRICAO VARCHAR (1000),  
@CMIDMANUTENCAO INT  
  
)  
AS BEGIN  
INSERT INTO CESTOQUEPECAS (CMIDPECA, CMPLACAVEICULO, CMDESCRICAO, CMIDMANUTENCAO)  
VALUES (@CMIDPECA, @CMPLACAVEICULO, @CMDESCRICAO, @CMIDMANUTENCAO)  
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CMANUTENCAO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CMANUTENCAO] 
( 
	@CMPLACAVEICULO VARCHAR (7),
	@CMDESCRICAO VARCHAR (1000),
	@CMTIPOMANUTENCAO VARCHAR(50),
    @CMPECAUSADA VARCHAR(50),
    @CMVALOR FLOAT
	)
	
AS BEGIN
   INSERT INTO CMANUTENCAO ( CMPLACAVEICULO, CMDESCRICAO, CMTIPOMANUTENCAO, CMPECAUSADA, CMVALOR ) 
   VALUES (@CMPLACAVEICULO, @CMDESCRICAO, @CMTIPOMANUTENCAO, @CMPECAUSADA, @CMVALOR)

   UPDATE CVEICULOS SET CVANO = 2 WHERE CVPLACA = @CMPLACAVEICULO
END
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CMULTAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_INCLUIR_CMULTAS] (
	@CMCODIGOMULTA INT,
	@CMDTHRINFRACAO DATETIME,
	@CMDTHRRECEBIMENTO DATETIME,
	@CMLOCAL VARCHAR (200),
	@CMPONTOS INT,
	@CMVALOR FLOAT,
	@CMPLACA VARCHAR (7)
)
AS
	INSERT INTO
		CMULTAS (CMCODIGOMULTA, CMDTHRINFRACAO, CMDTHRRECEBIMENTO, CMLOCAL, CMPONTOS, CMVALOR, CMPLACA)
	 VALUES 
		(@CMCODIGOMULTA, @CMDTHRINFRACAO, @CMDTHRRECEBIMENTO, @CMLOCAL, @CMPONTOS, @CMVALOR, @CMPLACA)
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_COCUPANTES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_COCUPANTES](
	@COIDVIAGEM INT
)
AS
INSERT INTO COCUPANTES (COIDVIAGEM) VALUES (@COIDVIAGEM)
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CPROPIETARIOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CPROPIETARIOS] (
	@CPCGC VARCHAR (18),
	@CPNOME VARCHAR (200)
)
AS
	INSERT INTO CPROPIETARIOS (CPCGC, CPNOME) VALUES (@CPCGC, @CPNOME)
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CREEMBOLSOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CREEMBOLSOS] (
         
		
		 @CRTIPO INT,
		 @CRPLACAVEICULO VARCHAR (7),
		 @CRIDENDERECO VARCHAR(800),
		 @CRVALOR FLOAT,
		 @CRDTHRCAD DATETIME,
		 @CRDTHRINI DATETIME,
		 @CRDTHRFIM DATETIME
		 )
	AS

	  INSERT INTO 
	  
	  CREEMBOLSOS ( CRTIPO, CRPLACAVEICULO, CRIDENDERECO, CRVALOR, CRDTHRCAD, CRDTHRINI, CRDTHRFIM)
	   
	   VALUES 

	   ( @CRTIPO, @CRPLACAVEICULO, @CRIDENDERECO, @CRVALOR, @CRDTHRCAD, @CRDTHRINI, @CRDTHRFIM)

GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CSEGURO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CSEGURO] (
         
	
		 @CCPLACAVEICULO VARCHAR (7),
		 @CCSEGURADORA VARCHAR (200),
		 @CCCONTRATOLOCACAO VARCHAR (20),
		 @CCDTINIVIGENCIA DATETIME,
		 @CCDTFIMVIGENCIA DATETIME,
		 @CCVALORSEGURO FLOAT
		 )
	AS BEGIN

	  INSERT INTO 
	  
	  CSEGURO( CCPLACAVEICULO,CCSEGURADORA, CCCONTRATOLOCACAO, CCDTINIVIGENCIA, CCDTFIMVIGENCIA, CCVALORSEGURO)
	   
	   VALUES 

	   ( @CCPLACAVEICULO, @CCSEGURADORA, @CCCONTRATOLOCACAO, @CCDTINIVIGENCIA, @CCDTFIMVIGENCIA, @CCVALORSEGURO)

	   END
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CSINISTRO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CSINISTRO] (  
          
   @CSPLACAVEICULO VARCHAR (7),  
   @CSIDSEGURO INT,  
   @CSDESCRICAO VARCHAR 
     
   )  
 AS   
  
   INSERT INTO   
     
   CSINISTRO ( CSPLACAVEICULO, CSIDSEGURO, CSDESCRICAO)  
      
    VALUES   
  
    (@CSPLACAVEICULO, @CSIDSEGURO, @CSDESCRICAO)  
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CTELEFONES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CTELEFONES] (
        
		 @CTCNPJCPF VARCHAR (18),
		 @CTDD INT,
		 @CTNUMERO INT,
		 @CTTIPO INT,
		 @CTOPERADORA INT
	
		 )
	AS 

	  INSERT INTO 
	  
	  CTELEFONES (CTCNPJCPF, CTDD, CTNUMERO, CTTIPO, CTOPERADORA)
	   
	   VALUES 

	   (@CTCNPJCPF, @CTDD, @CTNUMERO, @CTTIPO, @CTOPERADORA)
	   
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CUSUARIOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CUSUARIOS] 
( 
	@CUNOME VARCHAR(200), 
	@CUCNPJCPF VARCHAR(18), 
	@CUCNH VARCHAR(20), 
	@CURG VARCHAR(11), 
	@CUTPUSUARIO INT, 
	@CUIDENDERECO VARCHAR(800), 
	@CUCARTEIRATRABALHO VARCHAR(20),
	@CUDATAVALIDADECNH DATETIME,
	@CUDATAULTIMOEXAMEMEDICO DATETIME
	)
	
AS BEGIN
   INSERT INTO CUSUARIOS ( CUNOME, CUCNPJCPF, CUCNH, CURG, CUTPUSUARIO, CUIDENDERECO, CUCARTEIRATRABALHO, CUDATAVALIDADECNH, CUDATAULTIMOEXAMEMEDICO ) 
   VALUES (@CUNOME, @CUCNPJCPF, @CUCNH, @CURG, @CUTPUSUARIO, @CUIDENDERECO, @CUCARTEIRATRABALHO, @CUDATAVALIDADECNH, @CUDATAULTIMOEXAMEMEDICO)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_CVEICULOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_CVEICULOS] 
( 
	@CVCGC_PROPIETARIO VARCHAR(18), 
	@CVPLACA VARCHAR(7), 
	@CVCHASSI VARCHAR(17), 
	@CVMODELO VARCHAR(20), 
	@CVMARCAR VARCHAR(30), 
	@CVCOR VARCHAR(10), 
	@CVANO INT,
	@CVTIPOVEICULO INT,
	@CVQUILOMETRAGEM INT,
	@CVVALIDADESEGURO DATETIME,
	@CVNOMESEGURADORA VARCHAR(50),
	@CVNUMEROAPOLICE INT
) 
AS BEGIN
   INSERT INTO CVEICULOS ( CVCGC_PROPIETARIO, CVPLACA, CVCHASSI, CVMODELO, CVMARCAR, CVCOR, CVANO, CVTIPOVEICULO, CVQUILOMETRAGEM, CVVALIDADESEGURO, CVNOMESEGURADORA, CVNUMEROAPOLICE) 
   VALUES (@CVCGC_PROPIETARIO, @CVPLACA, @CVCHASSI, @CVMODELO, @CVMARCAR, @CVCOR, @CVANO, @CVTIPOVEICULO, @CVQUILOMETRAGEM, @CVVALIDADESEGURO, @CVNOMESEGURADORA, @CVNUMEROAPOLICE)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_LLOCACAO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_LLOCACAO] 
( 
	@LLUSUARIOCAD INT, 
	@LLIDCLIENTE INT, 
	@LLPLACAVEICULO VARCHAR(7), 
	@LLDTHRCAD DATETIME, 
	@LLDTHRINICIO DATETIME, 
	@LLDTHRFINAL DATETIME, 
	@LLIDSEGUROCONTRATADO INT,
	@LLVALORDIALOCACAO FLOAT ) 
AS BEGIN
   INSERT INTO LLOCACAO (LLUSUARIOCAD, LLIDCLIENTE, LLPLACAVEICULO, LLDTHRCAD, LLDTHRINICIO, LLDTHRFINAL, LLIDSEGUROCONTRATADO, LLVALORDIALOCACAO) 
   VALUES (@LLUSUARIOCAD, @LLIDCLIENTE, @LLPLACAVEICULO, @LLDTHRCAD, @LLDTHRINICIO, @LLDTHRFINAL, @LLIDSEGUROCONTRATADO, @LLVALORDIALOCACAO)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_LVIAGENS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_LVIAGENS] 
( 
	@LVDTHRCAD DATETIME, 
	@LVDTHRINICIO DATETIME, 
	@LVDTHRFINAL DATETIME, 
	@LVPLACAVEICULO VARCHAR(7), 
	@LVIDENDERECOORIGEM INT, 
	@LVIDENDERECODESTINO INT, 
	@LVPREVISAOKM INT ) 
AS BEGIN
   INSERT INTO LVIAGENS (LVDTHRCAD, LVDTHRINICIO, LVDTHRFINAL, LVPLACAVEICULO, LVIDENDERECOORIGEM, LVIDENDERECODESTINO, LVPREVISAOKM) 
   VALUES (@LVDTHRCAD, @LVDTHRINICIO, @LVDTHRFINAL, @LVPLACAVEICULO, @LVIDENDERECOORIGEM, @LVIDENDERECODESTINO, @LVPREVISAOKM)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_TPECAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_TPECAS] 
( 
	@TPDESCRICAO VARCHAR (50),
	@TPDATAUSO DATETIME,
	@TPVALORPECA FLOAT
	)
	
AS BEGIN
   INSERT INTO TPECAS ( TPDESCRICAO, TPDATAUSO, TPVALORPECA ) 
   VALUES (@TPDESCRICAO, @TPDATAUSO, @TPVALORPECA)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_TREEMBOLSOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_TREEMBOLSOS](
	@TRDESCRICAO VARCHAR(50)
)
AS
	INSERT INTO TREEMBOLSOS (TRDESCRICAO) VALUES (@TRDESCRICAO)
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_TUSUARIO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_TUSUARIO](
	@TUDESCRICAO VARCHAR(20),
	@TUCAMPOSOBRIGATORIOS VARCHAR(50)
)
AS
	INSERT INTO Tusuario (TUDESCRICAO, TUCAMPOSOBRIGATORIOS) VALUES (@TUDESCRICAO, @TUCAMPOSOBRIGATORIOS)
GO
/****** Object:  StoredProcedure [dbo].[SP_INCLUIR_TVEICULOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INCLUIR_TVEICULOS] (
	@TVDESCRICAOTIPO VARCHAR (50)
)
AS
	INSERT INTO TVEICULOS (TVDESCRICAOTIPO) VALUES (@TVDESCRICAOTIPO)
GO
/****** Object:  StoredProcedure [dbo].[SP_RETORNAUSUARIOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_RETORNAUSUARIOS]
AS BEGIN

	SELECT * FROM USUARIOS

END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONA_CEMAILS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONA_CEMAILS]
(
@CEID INT
)
AS 

IF @CEID = 0 OR @CEID IS NULL
	BEGIN

	SELECT * FROM CEMAILS
	
	END

ELSE
	BEGIN

	SELECT * FROM CEMAILS WHERE CEID = @CEID
	
	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONA_CENDERECO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONA_CENDERECO]    
(    
@CEID INT    
)    
AS 

IF @CEID = 0 OR @CEID IS NULL
	BEGIN    

	SELECT * FROM CENDERECO 
	
	END

ELSE
	BEGIN    

	SELECT * FROM CENDERECO WHERE CEID = @CEID    
	
	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONA_CESTOQUEPECAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONA_CESTOQUEPECAS]    
(    
@CMID INT    
)    
AS 

IF @CMID = 0 OR @CMID IS NULL
	BEGIN 
	   
	SELECT * FROM CESTOQUEPECAS  
	
	END  

ELSE
	BEGIN 
	   
	SELECT * FROM CESTOQUEPECAS WHERE CMID = @CMID    
	
	END  
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONA_CMANUTENCAO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONA_CMANUTENCAO] 
( 
	@CMID INT
) 
AS BEGIN
	SELECT 
		* 
	FROM 
		CMANUTENCAO
	WHERE 
		 @CMID = 0 OR CMID			   = @CMID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONA_CUSUARIOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONA_CUSUARIOS] 
( 
	@CUID INT = 0
) 
AS BEGIN
	SELECT 
		* 
	FROM 
		CUSUARIOS
	WHERE 
		@CUID = 0 OR CUID			   = @CUID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONA_CVEICULOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONA_CVEICULOS] 
( 
	@CVPLACA VARCHAR(7) = NULL
) 
AS BEGIN
	SELECT 
		* 
	FROM 
		CVEICULOS
	WHERE 
		ISNULL(@CVPLACA, '') = '' OR (CVPLACA			   = @CVPLACA)
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONA_LLOCACAO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONA_LLOCACAO]
( 
	@LLID INT
) 
AS 

IF @LLID = 0 OR @LLID IS NULL
	BEGIN

	SELECT * FROM LLOCACAO
 
	END

ELSE
	BEGIN

	SELECT * FROM LLOCACAO WHERE LLID = @LLID
 
	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONA_LVIAGENS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONA_LVIAGENS]
( 
	@LVID INT
) 
AS 

IF @LVID = 0 OR @LVID IS NULL
	BEGIN

	SELECT * FROM LVIAGENS
 
	END

ELSE
	BEGIN

	SELECT * FROM LVIAGENS WHERE LVID = @LVID
 
	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONA_TPECAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONA_TPECAS]
( 
	@TPID INT = 0
) 
AS BEGIN
	SELECT 
		* 
	FROM 
		TPECAS
	WHERE 
		 @TPID = 0 OR TPID			   = @TPID
 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONA_VEICULOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONA_VEICULOS]
(
@CECNPJCPF VARCHAR (18)
)
AS BEGIN
DELETE
FROM 
CEMAILS
WHERE
CECNPJCPF = @CECNPJCPF
END




GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_CCLIENTES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	 CREATE PROCEDURE [dbo].[SP_SELECIONAR_CCLIENTES](
	 @COID INT
	 )
	 AS

	 IF @COID = 0 OR @COID IS NULL
		BEGIN
	    
		SELECT * FROM CCLIENTES

		END

	 ELSE
		BEGIN
	    
		SELECT * FROM CCLIENTES WHERE COID = @COID

		END
		 
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_CMULTAS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONAR_CMULTAS](
	@CMID INT
)
AS

IF @CMID = 0 OR @CMID IS NULL
	BEGIN

	SELECT * FROM CMULTAS
	
	END

ELSE
	BEGIN

	SELECT * FROM CMULTAS WHERE CMID = @CMID
	
	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_COCUPANTES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONAR_COCUPANTES](
	@COID INT
)
AS 

IF @COID = 0 OR @COID IS NULL
	BEGIN

	SELECT * FROM COCUPANTES

	END

ELSE
	BEGIN

	SELECT * FROM COCUPANTES WHERE COID = @COID

	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_CPROPIETARIOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONAR_CPROPIETARIOS](
	@CPID INT
)
AS 

IF @CPID = 0 OR @CPID IS NULL
	BEGIN

	SELECT * FROM CPROPIETARIOS

	END

ELSE
	BEGIN

	SELECT * FROM CPROPIETARIOS WHERE CPID = @CPID

	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_CREEMBOLSOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONAR_CREEMBOLSOS](
	@CRID INT
)
AS

IF @CRID = 0 OR @CRID IS NULL
	BEGIN

	SELECT * FROM CREEMBOLSOS

	END

ELSE
	BEGIN

	SELECT * FROM CREEMBOLSOS WHERE CRID = @CRID

	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_CSEGURO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONAR_CSEGURO](
	@CCID INT
)
AS

IF @CCID = 0 OR @CCID IS NULL
	BEGIN

	SELECT * FROM CSEGURO

	END

ELSE
	BEGIN

	SELECT * FROM CSEGURO WHERE CCID = @CCID

	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_CSINISTRO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONAR_CSINISTRO](
	@CSID INT
)
AS

IF @CSID = 0 OR @CSID IS NULL
	BEGIN

	SELECT * FROM CSINISTRO

	END

ELSE
	BEGIN

	SELECT * FROM CSINISTRO WHERE CSID = @CSID

	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_CTELEFONES]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONAR_CTELEFONES] (
	@CTID INT
)
AS

IF @CTID = 0 OR @CTID IS NULL
	BEGIN

	SELECT * FROM CTELEFONES

	END

ELSE
	BEGIN

	SELECT * FROM CTELEFONES WHERE CTID = @CTID

	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_TREEMBOLSOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONAR_TREEMBOLSOS](
	@TRID INT
)
AS 

IF @TRID = 0 OR @TRID IS NULL
	BEGIN

	SELECT * FROM TREEMBOLSOS

	END

ELSE
	BEGIN

	SELECT * FROM TREEMBOLSOS WHERE TRID = @TRID

	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_TUSUARIO]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONAR_TUSUARIO](
	@TUID INT
)
AS 

IF @TUID = 0 OR @TUID IS NULL
	BEGIN

	SELECT * FROM TUSUARIO

	END

ELSE
	BEGIN

	SELECT * FROM TUSUARIO WHERE TUID = @TUID

	END
GO
/****** Object:  StoredProcedure [dbo].[SP_SELECIONAR_TVEICULOS]    Script Date: 10/12/2019 22:46:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SELECIONAR_TVEICULOS](
	@TVID INT
)
AS

IF @TVID = 0 OR @TVID IS NULL
	BEGIN
	 
	SELECT * FROM TVEICULOS

	END

ELSE
	BEGIN
	 
	SELECT * FROM TVEICULOS WHERE TVID = @TVID

	END
GO
PRINT CONVERT(VARCHAR(20), GETDATE(), 109) + ' - FIM CRIACAO DAS PROCEDURES'
GO
