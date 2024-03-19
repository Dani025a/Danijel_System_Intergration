using System;
using System.IO;
using Newtonsoft.Json;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;
using CsvHelper;
using System.Globalization;
using CsvHelper.Configuration;
using System.Xml.Linq;

class Program
{
static void Main(string[] args)
{
    string baseDirectory = @"C:\Users\Lenovo\Danijel_System_Intergration\01_Data_Files\";

    string yamlPath = Path.Combine(baseDirectory, "me.yaml");
    string jsonPath = Path.Combine(baseDirectory, "me.json");
    string xmlPath = Path.Combine(baseDirectory, "me.xml");
    string csvPath = Path.Combine(baseDirectory, "me.csv");

    ParseYaml(yamlPath);
    ParseJson(jsonPath);
    ParseXml(xmlPath);
    ParseCsv(csvPath);
}

    static void ParseYaml(string filePath)
    {
        var deserializer = new DeserializerBuilder()
            .WithNamingConvention(UnderscoredNamingConvention.Instance)
            .Build();

        var yamlText = File.ReadAllText(filePath);
        var data = deserializer.Deserialize<dynamic>(yamlText);
        Console.WriteLine("YAML:");
        Console.WriteLine(data);
    }

    static void ParseJson(string filePath)
    {
        var jsonText = File.ReadAllText(filePath);
        var data = JsonConvert.DeserializeObject<dynamic>(jsonText);
        Console.WriteLine("JSON:");
        Console.WriteLine(JsonConvert.SerializeObject(data, Formatting.Indented));
    }

    static void ParseXml(string filePath)
    {
        var xmlText = XDocument.Load(filePath);
        Console.WriteLine("XML:");
        Console.WriteLine(xmlText);
    }

    static void ParseCsv(string filePath)
    {
        using (var reader = new StreamReader(filePath))
        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
        {
            var records = csv.GetRecords<dynamic>();
            Console.WriteLine("CSV:");
            foreach (var record in records)
            {
                Console.WriteLine(record);
            }
        }
    }
}
