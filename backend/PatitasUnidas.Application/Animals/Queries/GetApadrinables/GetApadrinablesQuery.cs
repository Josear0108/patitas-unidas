using MediatR;
using PatitasUnidas.Application.Animals.DTOs;

namespace PatitasUnidas.Application.Animals.Queries.GetApadrinables;

public record GetApadrinablesQuery : IRequest<IEnumerable<AnimalDto>>;

