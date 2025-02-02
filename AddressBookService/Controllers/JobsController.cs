using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
    {
        return Ok(await _jobService.GetAllJobsAsync());
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Job>> GetJob(int id)
    {
        var job = await _jobService.GetJobByIdAsync(id);
        if (job == null) return NotFound();
        return Ok(job);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Job>> CreateJob(JobDTO jobDto)
    {
        var job = await _jobService.CreateJobAsync(jobDto);
        return CreatedAtAction(nameof(GetJob), new { id = job.Id }, job);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateJob(int id, JobDTO jobDto)
    {
        var job = await _jobService.UpdateJobAsync(id, jobDto);
        if (job == null) return NotFound();
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJob(int id)
    {
        await _jobService.DeleteJobAsync(id);
        return NoContent();
    }
}