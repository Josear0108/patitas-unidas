namespace PatitasUnidas.Domain.Entities;

public class Contact
{
    public int Id { get; set; }
    public string SocialMedia { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public int FoundationId { get; set; }
    public Foundation? Foundation { get; set; }
}

