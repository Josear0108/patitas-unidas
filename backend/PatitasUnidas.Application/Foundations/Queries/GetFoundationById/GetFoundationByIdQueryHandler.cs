using MediatR;
using PatitasUnidas.Application.Common.Mappings;
using PatitasUnidas.Application.Foundations.DTOs;
using PatitasUnidas.Domain.Repositories;

namespace PatitasUnidas.Application.Foundations.Queries.GetFoundationById;

public class GetFoundationByIdQueryHandler : IRequestHandler<GetFoundationByIdQuery, FoundationDto?>
{
    private readonly IFoundationRepository _foundationRepository;

    public GetFoundationByIdQueryHandler(IFoundationRepository foundationRepository)
    {
        _foundationRepository = foundationRepository;
    }

    public async Task<FoundationDto?> Handle(GetFoundationByIdQuery request, CancellationToken cancellationToken)
    {
        var foundation = await _foundationRepository.GetByIdAsync(request.Id, cancellationToken);
        return foundation?.ToDto();
    }
}

