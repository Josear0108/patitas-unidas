using MediatR;
using Microsoft.AspNetCore.Mvc;
using PatitasUnidas.Application.Foundations.DTOs;
using PatitasUnidas.Application.Foundations.Queries.GetFoundationById;
using PatitasUnidas.Application.Foundations.Queries.GetFoundations;

namespace PatitasUnidas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoundationsController : ControllerBase
{
    private readonly IMediator _mediator;

    public FoundationsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Obtiene todas las fundaciones
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<FoundationDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<FoundationDto>>> GetFoundations(CancellationToken cancellationToken)
    {
        var query = new GetFoundationsQuery();
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Obtiene una fundación por su ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(FoundationDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<FoundationDto>> GetFoundationById(int id, CancellationToken cancellationToken)
    {
        var query = new GetFoundationByIdQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        
        if (result == null)
        {
            return NotFound();
        }
        
        return Ok(result);
    }
}

