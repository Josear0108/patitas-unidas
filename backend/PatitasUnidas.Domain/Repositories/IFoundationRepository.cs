using PatitasUnidas.Domain.Entities;

namespace PatitasUnidas.Domain.Repositories;

public interface IFoundationRepository
{
    Task<IEnumerable<Foundation>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Foundation?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Foundation> AddAsync(Foundation foundation, CancellationToken cancellationToken = default);
    Task UpdateAsync(Foundation foundation, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
}

