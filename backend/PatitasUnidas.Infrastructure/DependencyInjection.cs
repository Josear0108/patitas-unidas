using Microsoft.Extensions.DependencyInjection;
using PatitasUnidas.Domain.Repositories;
using PatitasUnidas.Infrastructure.Repositories;

namespace PatitasUnidas.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        // Registrar FoundationRepository primero porque AnimalRepository lo necesita
        services.AddScoped<IFoundationRepository, InMemoryFoundationRepository>();
        services.AddScoped<IAnimalRepository, InMemoryAnimalRepository>();

        return services;
    }
}

