public interface IAddressBookService
{
    Task<IEnumerable<AddressBookEntry>> GetAllEntriesAsync();
    Task<AddressBookEntry> GetEntryByIdAsync(int id);
    Task<AddressBookEntry> CreateEntryAsync(AddressBookEntryDTO entryDto);
    Task<AddressBookEntry> UpdateEntryAsync(int id, AddressBookEntryDTOPartial entryDto);
    Task DeleteEntryAsync(int id);
    Task<IEnumerable<AddressBookEntry>> SearchEntriesAsync(string searchTerm, DateTime? startDate, DateTime? endDate);
    Task<byte[]> ExportToExcelAsync(string hostUrl);
}