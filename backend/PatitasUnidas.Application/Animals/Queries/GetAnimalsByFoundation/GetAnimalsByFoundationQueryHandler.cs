using MediatR;
using PatitasUnidas.Application.Animals.DTOs;
using PatitasUnidas.Application.Common.Mappings;
using PatitasUnidas.Domain.Repositories;

namespace PatitasUnidas.Application.Animals.Queries.GetAnimalsByFoundation;

public class GetAnimalsByFoundationQueryHandler : IRequestHandler<GetAnimalsByFoundationQuery, IEnumerable<AnimalDto>>
{
    private readonly IAnimalRepository _animalRepository;

    public GetAnimalsByFoundationQueryHandler(IAnimalRepository animalRepository)
    {
        _animalRepository = animalRepository;
    }

    public async Task<IEnumerable<AnimalDto>> Handle(GetAnimalsByFoundationQuery request, CancellationToken cancellationToken)
    {
        var animals = await _animalRepository.GetByFoundationIdAsync(request.FoundationId, cancellationToken);
        return animals.Select(animal => animal.ToDto());
    }
}

