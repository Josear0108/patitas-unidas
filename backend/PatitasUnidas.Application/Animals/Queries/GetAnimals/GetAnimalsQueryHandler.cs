using MediatR;
using PatitasUnidas.Application.Animals.DTOs;
using PatitasUnidas.Application.Common.Mappings;
using PatitasUnidas.Domain.Repositories;

namespace PatitasUnidas.Application.Animals.Queries.GetAnimals;

public class GetAnimalsQueryHandler : IRequestHandler<GetAnimalsQuery, IEnumerable<AnimalDto>>
{
    private readonly IAnimalRepository _animalRepository;

    public GetAnimalsQueryHandler(IAnimalRepository animalRepository)
    {
        _animalRepository = animalRepository;
    }

    public async Task<IEnumerable<AnimalDto>> Handle(GetAnimalsQuery request, CancellationToken cancellationToken)
    {
        var animals = await _animalRepository.GetAllAsync(cancellationToken);
        return animals.Select(animal => animal.ToDto());
    }
}

