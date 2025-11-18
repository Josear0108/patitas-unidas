using MediatR;
using PatitasUnidas.Application.Common.Mappings;
using PatitasUnidas.Application.Foundations.DTOs;
using PatitasUnidas.Domain.Repositories;

namespace PatitasUnidas.Application.Foundations.Queries.GetFoundations;

public class GetFoundationsQueryHandler : IRequestHandler<GetFoundationsQuery, IEnumerable<FoundationDto>>
{
    private readonly IFoundationRepository _foundationRepository;

    public GetFoundationsQueryHandler(IFoundationRepository foundationRepository)
    {
        _foundationRepository = foundationRepository;
    }

    public async Task<IEnumerable<FoundationDto>> Handle(GetFoundationsQuery request, CancellationToken cancellationToken)
    {
        var foundations = await _foundationRepository.GetAllAsync(cancellationToken);
        return foundations.Select(foundation => foundation.ToDto());
    }
}

