using PatitasUnidas.Application.Animals.DTOs;
using PatitasUnidas.Domain.Entities;

namespace PatitasUnidas.Application.Common.Mappings;

public static class AnimalMappingExtensions
{
    public static AnimalDto ToDto(this Animal animal)
    {
        return new AnimalDto
        {
            Id = animal.Id,
            Name = animal.Name,
            Type = animal.Type,
            Age = animal.Age,
            Description = animal.Description,
            Image = animal.Image,
            State = animal.State,
            Tag = animal.Tag,
            FoundationId = animal.FoundationId,
            Breed = animal.Breed,
            Gender = animal.Gender,
            Size = animal.Size,
            Color = animal.Color,
            Personality = animal.Personality.ToArray(),
            HealthStatus = animal.HealthStatus,
            Vaccinated = animal.Vaccinated,
            Sterilized = animal.Sterilized,
            Dewormed = animal.Dewormed,
            SpecialNeeds = animal.SpecialNeeds,
            GoodWith = animal.GoodWith.ToArray(),
            NotGoodWith = animal.NotGoodWith.ToArray(),
            AdoptionRequirements = animal.AdoptionRequirements.ToArray(),
            Story = animal.Story,
            Images = animal.Images.ToArray(),
            CreatedAt = animal.CreatedAt,
            Foundation = animal.Foundation is null ? null : animal.Foundation.ToDto()
        };
    }
}

