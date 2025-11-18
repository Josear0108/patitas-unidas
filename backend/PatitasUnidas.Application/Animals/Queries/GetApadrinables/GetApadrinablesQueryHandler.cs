using MediatR;
using PatitasUnidas.Application.Animals.DTOs;
using PatitasUnidas.Application.Common.Mappings;
using PatitasUnidas.Domain.Repositories;

namespace PatitasUnidas.Application.Animals.Queries.GetApadrinables;

public class GetApadrinablesQueryHandler : IRequestHandler<GetApadrinablesQuery, IEnumerable<AnimalDto>>
{
    private readonly IAnimalRepository _animalRepository;

    public GetApadrinablesQueryHandler(IAnimalRepository animalRepository)
    {
        _animalRepository = animalRepository;
    }

    public async Task<IEnumerable<AnimalDto>> Handle(GetApadrinablesQuery request, CancellationToken cancellationToken)
    {
        var animals = await _animalRepository.GetApadrinablesAsync(cancellationToken);
        return animals.Select(animal => animal.ToDto());
    }
}

