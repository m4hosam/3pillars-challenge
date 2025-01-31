# Use SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Create directory for file uploads
RUN mkdir -p /app/uploads && \
    chown -R 1000:1000 /app/uploads

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5270
ENV ASPNETCORE_ENVIRONMENT=Production

# Use non-root user for better security
USER 1000

EXPOSE 5270
ENTRYPOINT ["dotnet", "AddressBookService.dll"]