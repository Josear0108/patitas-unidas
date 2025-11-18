using MediatR;
using PatitasUnidas.Application.Animals.DTOs;
using PatitasUnidas.Application.Common.Mappings;
using PatitasUnidas.Domain.Repositories;

namespace PatitasUnidas.Application.Animals.Queries.GetAnimalById;

public class GetAnimalByIdQueryHandler : IRequestHandler<GetAnimalByIdQuery, AnimalDto?>
{
    private readonly IAnimalRepository _animalRepository;

    public GetAnimalByIdQueryHandler(IAnimalRepository animalRepository)
    {
        _animalRepository = animalRepository;
    }

    public async Task<AnimalDto?> Handle(GetAnimalByIdQuery request, CancellationToken cancellationToken)
    {
        var animal = await _animalRepository.GetByIdAsync(request.Id, cancellationToken);
        return animal?.ToDto();
    }
}

