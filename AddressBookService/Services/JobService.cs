
using Microsoft.EntityFrameworkCore;

public class JobService : IJobService
{
    private readonly AddressBookContext _context;

    public JobService(AddressBookContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Job>> GetAllJobsAsync()
    {
        return await _context.Jobs.ToListAsync();
    }

    public async Task<Job> GetJobByIdAsync(int id)
    {
        return await _context.Jobs.FindAsync(id);
    }

    public async Task<Job> CreateJobAsync(JobDTO jobDto)
    {
        var job = new Job { Title = jobDto.Title };
        _context.Jobs.Add(job);
        await _context.SaveChangesAsync();
        return job;
    }

    public async Task<Job> UpdateJobAsync(int id, JobDTO jobDto)
    {
        var job = await _context.Jobs.FindAsync(id);
        if (job == null) return null;

        job.Title = jobDto.Title;
        await _context.SaveChangesAsync();
        return job;
    }

    public async Task DeleteJobAsync(int id)
    {
        var job = await _context.Jobs.FindAsync(id);
        if (job != null)
        {
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
        }
    }
}
