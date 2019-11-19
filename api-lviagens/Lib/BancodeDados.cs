using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Funcoes.BancodeDados
{


    public class Coluna : Attribute
    {
        public string NomeColuna;
        public Coluna(string NomeColuna)
        {
            this.NomeColuna = NomeColuna;
        }
    }




    public class BancodeDados
    {
        private static string ConnStr = @"Server=tcp:pim2019.ddns.net,1433;Initial Catalog=FrotaVeiculos;Persist Security Info=False;User ID=ususistema;Password=PIM@2019;MultipleActiveResultSets=False;TrustServerCertificate=False;Connection Timeout=30;";

        private SqlConnection _conn;

        private async Task Conectar()
        {
            _conn = new SqlConnection(ConnStr);
            await _conn.OpenAsync();
        }

        private T ConverteObjeto<T>(SqlDataReader reader)
        {
            var Tipo = typeof(T);
            var Obj = Activator.CreateInstance(Tipo);
            foreach (var prop in Tipo.GetProperties())
            {

                var Atributos = prop.GetCustomAttributes(false);
                var BuscaColuna = Atributos.FirstOrDefault(a => a.GetType() == typeof(Coluna));
                try
                {
                    if (BuscaColuna != null)
                    {
                        var InfoColuna = (Coluna)BuscaColuna;
                        prop.SetValue(Obj, Convert.ChangeType(reader.GetValue(InfoColuna.NomeColuna), prop.PropertyType));
                    }
                }
                catch (Exception E)
                {
                    throw new Exception($"Erro ao tratar {prop.Name} -> {E.Message}", E);
                }

            }



            return (T)Obj;

        }



        public async Task<List<T>> ExecutarProcedure<T>(string NomeProcedure, params SqlParameter[] paramProcedure)
        {
            var retorno = new List<T>();
            await Conectar();

            using (SqlCommand cmd = new SqlCommand(NomeProcedure, _conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                if (paramProcedure != null && paramProcedure.Length > 0)
                {
                    cmd.Parameters.AddRange(paramProcedure);
                }
                var Retorno = await cmd.ExecuteReaderAsync();

                if (Retorno.HasRows)
                    while (await Retorno.ReadAsync())
                        retorno.Add(ConverteObjeto<T>(Retorno));

            }

            return retorno;

        }

        public async Task<int> ExecutarProcedure(string NomeProcedure, params SqlParameter[] paramProcedure)
        {
            await Conectar();

            using (SqlCommand cmd = new SqlCommand(NomeProcedure, _conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                if (paramProcedure != null && paramProcedure.Length > 0)
                {
                    cmd.Parameters.AddRange(paramProcedure);
                }
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}

