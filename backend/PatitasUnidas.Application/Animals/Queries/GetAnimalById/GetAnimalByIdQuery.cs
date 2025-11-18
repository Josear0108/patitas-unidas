using MediatR;
using PatitasUnidas.Application.Animals.DTOs;

namespace PatitasUnidas.Application.Animals.Queries.GetAnimalById;

public record GetAnimalByIdQuery(int Id) : IRequest<AnimalDto?>;

