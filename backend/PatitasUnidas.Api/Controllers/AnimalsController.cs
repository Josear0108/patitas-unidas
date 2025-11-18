using MediatR;
using Microsoft.AspNetCore.Mvc;
using PatitasUnidas.Application.Animals.DTOs;
using PatitasUnidas.Application.Animals.Queries.GetAnimalById;
using PatitasUnidas.Application.Animals.Queries.GetAnimals;
using PatitasUnidas.Application.Animals.Queries.GetAnimalsByFoundation;
using PatitasUnidas.Application.Animals.Queries.GetApadrinables;

namespace PatitasUnidas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnimalsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AnimalsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Obtiene todos los animales disponibles para adopción
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<AnimalDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<AnimalDto>>> GetAnimals(CancellationToken cancellationToken)
    {
        var query = new GetAnimalsQuery();
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Obtiene un animal por su ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(AnimalDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AnimalDto>> GetAnimalById(int id, CancellationToken cancellationToken)
    {
        var query = new GetAnimalByIdQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        
        if (result == null)
        {
            return NotFound();
        }
        
        return Ok(result);
    }

    /// <summary>
    /// Obtiene todos los animales de una fundación específica
    /// </summary>
    [HttpGet("foundation/{foundationId}")]
    [ProducesResponseType(typeof(IEnumerable<AnimalDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<AnimalDto>>> GetAnimalsByFoundation(int foundationId, CancellationToken cancellationToken)
    {
        var query = new GetAnimalsByFoundationQuery(foundationId);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Obtiene todos los animales disponibles para apadrinamiento
    /// </summary>
    [HttpGet("apadrinables")]
    [ProducesResponseType(typeof(IEnumerable<AnimalDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<AnimalDto>>> GetApadrinables(CancellationToken cancellationToken)
    {
        var query = new GetApadrinablesQuery();
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }
}

