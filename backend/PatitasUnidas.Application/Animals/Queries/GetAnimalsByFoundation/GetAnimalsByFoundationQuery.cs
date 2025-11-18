using MediatR;
using PatitasUnidas.Application.Animals.DTOs;

namespace PatitasUnidas.Application.Animals.Queries.GetAnimalsByFoundation;

public record GetAnimalsByFoundationQuery(int FoundationId) : IRequest<IEnumerable<AnimalDto>>;

