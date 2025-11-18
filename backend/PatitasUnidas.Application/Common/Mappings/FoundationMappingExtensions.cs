using PatitasUnidas.Application.Foundations.DTOs;
using PatitasUnidas.Application.Foundations.DTOs.ValueObjects;
using PatitasUnidas.Domain.Entities;

namespace PatitasUnidas.Application.Common.Mappings;

public static class FoundationMappingExtensions
{
    public static FoundationDto ToDto(this Foundation foundation)
    {
        return new FoundationDto
        {
            Id = foundation.Id,
            Name = foundation.Name,
            Logo = foundation.Logo,
            City = foundation.City,
            Description = foundation.Description,
            Email = foundation.Email,
            Phone = foundation.Phone,
            Contacts = foundation.Contacts
                .Select(contact => new ContactDto
                {
                    SocialMedia = contact.SocialMedia,
                    Url = contact.Url
                })
                .ToArray()
        };
    }
}

