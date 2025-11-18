using PatitasUnidas.Domain.Entities;
using PatitasUnidas.Domain.Repositories;

namespace PatitasUnidas.Infrastructure.Repositories;

public class InMemoryFoundationRepository : IFoundationRepository
{
    private readonly List<Foundation> _foundations = new();

    public InMemoryFoundationRepository()
    {
        SeedData();
    }

    public Task<IEnumerable<Foundation>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IEnumerable<Foundation>>(_foundations);
    }

    public Task<Foundation?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var foundation = _foundations.FirstOrDefault(f => f.Id == id);
        return Task.FromResult(foundation);
    }

    public Task<Foundation> AddAsync(Foundation foundation, CancellationToken cancellationToken = default)
    {
        var maxId = _foundations.Any() ? _foundations.Max(f => f.Id) : 0;
        foundation.Id = maxId + 1;
        _foundations.Add(foundation);
        return Task.FromResult(foundation);
    }

    public Task UpdateAsync(Foundation foundation, CancellationToken cancellationToken = default)
    {
        var existingFoundation = _foundations.FirstOrDefault(f => f.Id == foundation.Id);
        if (existingFoundation != null)
        {
            var index = _foundations.IndexOf(existingFoundation);
            _foundations[index] = foundation;
        }
        return Task.CompletedTask;
    }

    public Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var foundation = _foundations.FirstOrDefault(f => f.Id == id);
        if (foundation != null)
        {
            _foundations.Remove(foundation);
        }
        return Task.CompletedTask;
    }

    private void SeedData()
    {
        _foundations.AddRange(new[]
        {
            new Foundation
            {
                Id = 1,
                Name = "Huellitas de Amor",
                Description = "Rescatamos y damos en adopción animales en situación de calle en Bogotá.",
                City = "Bogotá",
                Logo = "/patitas-unidas/assets/fundacion_1.png",
                Email = "huellitas@correo.com",
                Phone = "573214406924",
                Contacts = new List<Contact>
                {
                    new Contact { Id = 1, FoundationId = 1, SocialMedia = "instagram", Url = "https://instagram.com/patitasunidas_co" },
                    new Contact { Id = 2, FoundationId = 1, SocialMedia = "whatsapp", Url = "https://wa.me/573214406924" }
                }
            },
            new Foundation
            {
                Id = 2,
                Name = "Patitas Felices",
                Description = "Apoyamos campañas de esterilización y adopción responsable en Medellín.",
                City = "Medellín",
                Logo = "/patitas-unidas/assets/fundacion_2.png",
                Email = "felices@correo.com",
                Phone = "573214406924",
                Contacts = new List<Contact>
                {
                    new Contact { Id = 3, FoundationId = 2, SocialMedia = "instagram", Url = "https://instagram.com/patitasunidas_co" },
                    new Contact { Id = 4, FoundationId = 2, SocialMedia = "whatsapp", Url = "https://wa.me/573214406924" },
                    new Contact { Id = 5, FoundationId = 2, SocialMedia = "facebook", Url = "https://facebook.com/patitasunidas_co" }
                }
            },
            new Foundation
            {
                Id = 3,
                Name = "Amigos Peludos",
                Description = "Ofrecemos hogar de paso y atención veterinaria en Cali.",
                City = "Cali",
                Logo = "/patitas-unidas/assets/fundacion_3.png",
                Email = "peludos@correo.com",
                Phone = "573214406924",
                Contacts = new List<Contact>
                {
                    new Contact { Id = 6, FoundationId = 3, SocialMedia = "instagram", Url = "https://instagram.com/patitasunidas_co" },
                    new Contact { Id = 7, FoundationId = 3, SocialMedia = "whatsapp", Url = "https://wa.me/573214406924" }
                }
            },
            new Foundation
            {
                Id = 4,
                Name = "Amigos Peludos 4",
                Description = "Ofrecemos hogar de paso y atención veterinaria en Cali.",
                City = "Cali",
                Logo = "/patitas-unidas/assets/fundacion_3.png",
                Email = "peludos@correo.com",
                Phone = "573214406924",
                Contacts = new List<Contact>
                {
                    new Contact { Id = 8, FoundationId = 4, SocialMedia = "instagram", Url = "https://instagram.com/patitasunidas_co" },
                    new Contact { Id = 9, FoundationId = 4, SocialMedia = "whatsapp", Url = "https://wa.me/573214406924" }
                }
            },
            new Foundation
            {
                Id = 5,
                Name = "Amigos Peludos 5",
                Description = "Ofrecemos hogar de paso y atención veterinaria en Cali.",
                City = "Cali",
                Logo = "/patitas-unidas/assets/fundacion_3.png",
                Email = "peludos@correo.com",
                Phone = "573214406924",
                Contacts = new List<Contact>
                {
                    new Contact { Id = 10, FoundationId = 5, SocialMedia = "instagram", Url = "https://instagram.com/patitasunidas_co" },
                    new Contact { Id = 11, FoundationId = 5, SocialMedia = "whatsapp", Url = "https://wa.me/573214406924" }
                }
            },
            new Foundation
            {
                Id = 6,
                Name = "Amigos Peludos 6",
                Description = "Ofrecemos hogar de paso y atención veterinaria en Cali.",
                City = "Cali",
                Logo = "/patitas-unidas/assets/fundacion_3.png",
                Email = "peludos@correo.com",
                Phone = "573214406924",
                Contacts = new List<Contact>
                {
                    new Contact { Id = 12, FoundationId = 6, SocialMedia = "instagram", Url = "https://instagram.com/patitasunidas_co" },
                    new Contact { Id = 13, FoundationId = 6, SocialMedia = "whatsapp", Url = "https://wa.me/573214406924" }
                }
            }
        });
    }
}

