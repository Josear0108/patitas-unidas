namespace PatitasUnidas.Application.Animals.DTOs;

using PatitasUnidas.Application.Foundations.DTOs;

public class AnimalDto
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

    public string? Breed { get; set; }
    public string? Gender { get; set; }
    public string? Size { get; set; }
    public string? Color { get; set; }
    public IReadOnlyCollection<string> Personality { get; init; } = Array.Empty<string>();
    public string? HealthStatus { get; set; }
    public bool? Vaccinated { get; set; }
    public bool? Sterilized { get; set; }
    public bool? Dewormed { get; set; }
    public bool? SpecialNeeds { get; set; }
    public IReadOnlyCollection<string> GoodWith { get; init; } = Array.Empty<string>();
    public IReadOnlyCollection<string> NotGoodWith { get; init; } = Array.Empty<string>();
    public IReadOnlyCollection<string> AdoptionRequirements { get; init; } = Array.Empty<string>();
    public string? Story { get; set; }
    public IReadOnlyCollection<string> Images { get; init; } = Array.Empty<string>();
    public DateTime? CreatedAt { get; set; }

    public FoundationDto? Foundation { get; set; }
}

