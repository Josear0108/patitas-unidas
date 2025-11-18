using MediatR;
using PatitasUnidas.Application.Foundations.DTOs;

namespace PatitasUnidas.Application.Foundations.Queries.GetFoundations;

public record GetFoundationsQuery : IRequest<IEnumerable<FoundationDto>>;

