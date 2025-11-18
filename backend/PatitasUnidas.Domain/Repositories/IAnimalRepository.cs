using PatitasUnidas.Domain.Entities;

namespace PatitasUnidas.Domain.Repositories;

public interface IAnimalRepository
{
    Task<IEnumerable<Animal>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Animal?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IEnumerable<Animal>> GetByFoundationIdAsync(int foundationId, CancellationToken cancellationToken = default);
    Task<IEnumerable<Animal>> GetApadrinablesAsync(CancellationToken cancellationToken = default);
    Task<Animal> AddAsync(Animal animal, CancellationToken cancellationToken = default);
    Task UpdateAsync(Animal animal, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
}

