FROM  mcr.microsoft.com/dotnet/aspnet:6.0 as base 
WORKDIR /app

FROM  mcr.microsoft.com/dotnet/sdk:8.0 as build 
WORKDIR /src
COPY ["HotelReservation.sln", "./"]
COPY ["HotelReservation.API/HotelReservation.API.csproj", "HotelReservation.API/"]
COPY ["HotelReservation.Application/HotelReservation.Application.csproj", "HotelReservation.Application/"]
COPY ["HotelReservation.Domain/HotelReservation.Domain.csproj", "HotelReservation.Domain/"]
COPY ["HotelReservation.Persistence/HotelReservation.Persistence.csproj", "HotelReservation.Persistence/"]
RUN dotnet restore "HotelReservation.API/HotelReservation.API.csproj"

COPY . .
WORKDIR "/src/HotelReservation.API"
RUN dotnet build "HotelReservation.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HotelReservation.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT [ "dotnet", "HotelReservation.API.dll" ]