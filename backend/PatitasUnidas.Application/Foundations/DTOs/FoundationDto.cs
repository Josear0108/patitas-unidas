namespace PatitasUnidas.Application.Foundations.DTOs;

using PatitasUnidas.Application.Foundations.DTOs.ValueObjects;

public class FoundationDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Logo { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public IReadOnlyCollection<ContactDto> Contacts { get; init; } = Array.Empty<ContactDto>();
}

