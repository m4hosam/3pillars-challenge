public interface IJobService
{
    Task<IEnumerable<Job>> GetAllJobsAsync();
    Task<Job> GetJobByIdAsync(int id);
    Task<Job> CreateJobAsync(JobDTO jobDto);
    Task<Job> UpdateJobAsync(int id, JobDTO jobDto);
    Task DeleteJobAsync(int id);
}