using MediatR;
using PatitasUnidas.Application.Animals.DTOs;

namespace PatitasUnidas.Application.Animals.Queries.GetAnimals;

public record GetAnimalsQuery : IRequest<IEnumerable<AnimalDto>>;

