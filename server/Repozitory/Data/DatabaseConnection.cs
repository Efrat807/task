using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repozitory.Data
{
    public class DatabaseConnection
    {
       
        private readonly string _connectionString;

        public DatabaseConnection(string connectionString)
        {
            _connectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }

        public void TestConnection()
        {
            using (var connection = GetConnection())
            {
                try
                {
                    connection.Open();
                    Console.WriteLine("Successfully connected to the database.");
                }
                catch (SqlException e)
                {
                    Console.WriteLine("Error connecting to the database: " + e.Message);
                }
            }
        }
    }
    
}
