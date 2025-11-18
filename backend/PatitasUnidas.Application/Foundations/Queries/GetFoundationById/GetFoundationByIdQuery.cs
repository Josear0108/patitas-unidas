using MediatR;
using PatitasUnidas.Application.Foundations.DTOs;

namespace PatitasUnidas.Application.Foundations.Queries.GetFoundationById;

public record GetFoundationByIdQuery(int Id) : IRequest<FoundationDto?>;

