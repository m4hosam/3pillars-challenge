
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;

[ApiController]
[Route("api/[controller]")]
public class AddressBookController : ControllerBase
{
    private readonly IAddressBookService _addressBookService;

    public AddressBookController(IAddressBookService addressBookService)
    {
        _addressBookService = addressBookService;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AddressBookEntry>>> GetEntries()
    {
        return Ok(await _addressBookService.GetAllEntriesAsync());
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<AddressBookEntry>> GetEntry(int id)
    {
        var entry = await _addressBookService.GetEntryByIdAsync(id);
        if (entry == null) return NotFound();
        return Ok(entry);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<AddressBookEntry>> CreateEntry([FromForm] AddressBookEntryDTO entryDto)
    {
        var entry = await _addressBookService.CreateEntryAsync(entryDto);
        if (entry == null) return BadRequest(new { error = "Entry creation failed: Invalid job ID or department ID" });
        return CreatedAtAction(nameof(GetEntry), new { id = entry.Id }, entry);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEntry(int id, [FromForm] AddressBookEntryDTOPartial entryDto)
    {
        var entry = await _addressBookService.UpdateEntryAsync(id, entryDto);
        if (entry == null) return NotFound();
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEntry(int id)
    {
        await _addressBookService.DeleteEntryAsync(id);
        return NoContent();
    }

    [Authorize]
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<AddressBookEntry>>> SearchEntries(
            [FromQuery] string searchTerm,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
    {
        return Ok(await _addressBookService.SearchEntriesAsync(searchTerm, startDate, endDate));
    }

    [Authorize]
    [HttpGet("export")]
    public async Task<IActionResult> ExportToExcel()
    {
        var request = HttpContext.Request;
        string hostUrl = $"{request.Scheme}://{request.Host.Value}";
        var excelData = await _addressBookService.ExportToExcelAsync(hostUrl);
        return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "AddressBook.xlsx");
    }
}