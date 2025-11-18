namespace PatitasUnidas.Domain.Entities;

public class Animal
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Age { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string? State { get; set; }
    public string? Tag { get; set; }
    public int? FoundationId { get; set; }
    public Foundation? Foundation { get; set; }
    
    // Campos adicionales para AnimalData
    public string? Breed { get; set; }
    public string? Gender { get; set; }
    public string? Size { get; set; }
    public string? Color { get; set; }
    public List<string> Personality { get; set; } = new();
    public string? HealthStatus { get; set; }
    public bool? Vaccinated { get; set; }
    public bool? Sterilized { get; set; }
    public bool? Dewormed { get; set; }
    public bool? SpecialNeeds { get; set; }
    public List<string> GoodWith { get; set; } = new();
    public List<string> NotGoodWith { get; set; } = new();
    public List<string> AdoptionRequirements { get; set; } = new();
    public string? Story { get; set; }
    public List<string> Images { get; set; } = new();
    public DateTime? CreatedAt { get; set; }
}

