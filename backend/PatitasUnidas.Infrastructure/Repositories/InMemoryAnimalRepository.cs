using PatitasUnidas.Domain.Entities;
using PatitasUnidas.Domain.Repositories;

namespace PatitasUnidas.Infrastructure.Repositories;

public class InMemoryAnimalRepository : IAnimalRepository
{
    private readonly List<Animal> _animals = new();
    private readonly IFoundationRepository _foundationRepository;

    public InMemoryAnimalRepository(IFoundationRepository foundationRepository)
    {
        _foundationRepository = foundationRepository;
        SeedData();
    }

    public async Task<IEnumerable<Animal>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var animals = _animals.ToList();
        await LoadFoundationsAsync(animals, cancellationToken);
        return animals;
    }

    public async Task<Animal?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var animal = _animals.FirstOrDefault(a => a.Id == id);
        if (animal != null && animal.FoundationId.HasValue)
        {
            animal.Foundation = await _foundationRepository.GetByIdAsync(animal.FoundationId.Value, cancellationToken);
        }
        return animal;
    }

    public async Task<IEnumerable<Animal>> GetByFoundationIdAsync(int foundationId, CancellationToken cancellationToken = default)
    {
        var animals = _animals.Where(a => a.FoundationId == foundationId).ToList();
        await LoadFoundationsAsync(animals, cancellationToken);
        return animals;
    }

    public async Task<IEnumerable<Animal>> GetApadrinablesAsync(CancellationToken cancellationToken = default)
    {
        var apadrinables = _animals.Where(a => 
            a.State == "Necesita ayuda" || 
            a.SpecialNeeds == true ||
            (a.Tag != null && (a.Tag.Contains("Especial") || a.Tag.Contains("Tratamiento") || a.Tag.Contains("Medicamentos") || a.Tag.Contains("Fisioterapia"))))
            .ToList();
        await LoadFoundationsAsync(apadrinables, cancellationToken);
        return apadrinables;
    }

    private async Task LoadFoundationsAsync(List<Animal> animals, CancellationToken cancellationToken)
    {
        var foundationIds = animals
            .Where(a => a.FoundationId.HasValue)
            .Select(a => a.FoundationId!.Value)
            .Distinct()
            .ToList();

        var foundations = await _foundationRepository.GetAllAsync(cancellationToken);
        var foundationDict = foundations.ToDictionary(f => f.Id);

        foreach (var animal in animals)
        {
            if (animal.FoundationId.HasValue && foundationDict.TryGetValue(animal.FoundationId.Value, out var foundation))
            {
                animal.Foundation = foundation;
            }
        }
    }

    public Task<Animal> AddAsync(Animal animal, CancellationToken cancellationToken = default)
    {
        var maxId = _animals.Any() ? _animals.Max(a => a.Id) : 0;
        animal.Id = maxId + 1;
        _animals.Add(animal);
        return Task.FromResult(animal);
    }

    public Task UpdateAsync(Animal animal, CancellationToken cancellationToken = default)
    {
        var existingAnimal = _animals.FirstOrDefault(a => a.Id == animal.Id);
        if (existingAnimal != null)
        {
            var index = _animals.IndexOf(existingAnimal);
            _animals[index] = animal;
        }
        return Task.CompletedTask;
    }

    public Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var animal = _animals.FirstOrDefault(a => a.Id == id);
        if (animal != null)
        {
            _animals.Remove(animal);
        }
        return Task.CompletedTask;
    }

    private void SeedData()
    {
        // Animales básicos
        _animals.AddRange(new[]
        {
            new Animal
            {
                Id = 1,
                Name = "Maximiliano",
                Type = "Perro",
                State = "Urgente",
                Tag = "Sociable",
                Age = "Adulto",
                Description = "Tranquila y mimosa, busca un hogar donde pueda recibir mucho amor.",
                Image = "/patitas-unidas/assets/patita_1.jpg",
                FoundationId = 1,
                Breed = "Mestizo",
                Gender = "Macho",
                Size = "Mediano",
                Color = "Marrón y blanco",
                Personality = new List<string> { "Cariñoso", "Sociable", "Tranquilo", "Leal" },
                HealthStatus = "Bueno",
                Vaccinated = true,
                Sterilized = true,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Perros", "Niños", "Adultos" },
                NotGoodWith = new List<string> { "Gatos" },
                AdoptionRequirements = new List<string>
                {
                    "Hogar con espacio adecuado",
                    "Compromiso de seguimiento veterinario",
                    "Visita previa al hogar"
                },
                Story = "Maximiliano fue encontrado abandonado en un parque cuando apenas tenía 2 años. Estaba desnutrido y asustado. Un rescatista lo llevó a su casa, donde recibió atención veterinaria y mucho amor. Ahora está completamente recuperado y listo para encontrar un hogar definitivo donde pueda dar todo su amor.",
                Images = new List<string> { "/patitas-unidas/assets/patita_1.jpg" },
                CreatedAt = DateTime.Parse("2023-05-15")
            },
            new Animal
            {
                Id = 10,
                Name = "Antonia",
                Type = "Gato",
                State = "Urgente",
                Tag = "Juguetón",
                Age = "Adulto",
                Description = "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
                Image = "/patitas-unidas/assets/patita_10.jpg",
                FoundationId = 2,
                Breed = "Siamés mezclado",
                Gender = "Hembra",
                Size = "Pequeño",
                Color = "Gris y blanco",
                Personality = new List<string> { "Juguetona", "Curiosa", "Activa", "Independiente" },
                HealthStatus = "Excelente",
                Vaccinated = true,
                Sterilized = true,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Gatos", "Adultos" },
                NotGoodWith = new List<string> { "Perros grandes", "Niños pequeños" },
                AdoptionRequirements = new List<string>
                {
                    "Hogar tranquilo",
                    "Experiencia con gatos",
                    "Compromiso de mantenerla como gato de interior"
                },
                Story = "Antonia fue rescatada de la calle junto con sus hermanos cuando apenas tenían unas semanas de vida. Es la más juguetona de la camada y ha crecido siendo una gata muy sociable con otros felinos. Busca un hogar donde pueda tener espacio para jugar y explorar.",
                Images = new List<string> { "/patitas-unidas/assets/patita_10.jpg" },
                CreatedAt = DateTime.Parse("2023-08-10")
            },
            new Animal
            {
                Id = 2,
                Name = "Sasha",
                Type = "Perro",
                State = "Nuevo",
                Tag = "Juguetón",
                Age = "Cachorro",
                Description = "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
                Image = "/patitas-unidas/assets/patita_2.jpg",
                FoundationId = 1,
                Breed = "Labrador mezclado",
                Gender = "Hembra",
                Size = "Mediano (en crecimiento)",
                Color = "Dorado",
                Personality = new List<string> { "Juguetona", "Enérgica", "Cariñosa", "Curiosa" },
                HealthStatus = "Excelente",
                Vaccinated = true,
                Sterilized = false,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Perros", "Gatos", "Niños", "Adultos" },
                NotGoodWith = new List<string>(),
                AdoptionRequirements = new List<string>
                {
                    "Familia activa",
                    "Espacio para jugar",
                    "Compromiso de esterilización cuando tenga la edad adecuada",
                    "Tiempo para entrenamiento básico"
                },
                Story = "Sasha fue encontrada junto a sus hermanos en una caja abandonada cerca de un río. Afortunadamente, un buen samaritano los rescató y los llevó a nuestra fundación. Es la más activa de la camada y siempre está lista para jugar y aprender cosas nuevas.",
                Images = new List<string> { "/patitas-unidas/assets/patita_2.jpg" },
                CreatedAt = DateTime.Parse("2023-09-05")
            },
            new Animal
            {
                Id = 3,
                Name = "Drax",
                Type = "Perro",
                State = "Urgente",
                Tag = "Tranquilo",
                Age = "Cachorro",
                Description = "Tranquila y mimosa, busca un hogar donde pueda recibir mucho amor.",
                Image = "/patitas-unidas/assets/patita_3.jpg",
                FoundationId = 3,
                Breed = "Pitbull mezclado",
                Gender = "Macho",
                Size = "Mediano (en crecimiento)",
                Color = "Atigrado",
                Personality = new List<string> { "Tranquilo", "Cariñoso", "Leal", "Inteligente" },
                HealthStatus = "Bueno",
                Vaccinated = true,
                Sterilized = false,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Perros", "Adultos" },
                NotGoodWith = new List<string> { "Gatos" },
                AdoptionRequirements = new List<string>
                {
                    "Experiencia con la raza",
                    "Hogar sin otros animales pequeños",
                    "Compromiso de entrenamiento y socialización",
                    "Compromiso de esterilización"
                },
                Story = "Drax fue rescatado de una situación de maltrato cuando tenía apenas 2 meses. A pesar de su difícil comienzo, es un cachorro extremadamente dulce y tranquilo que adora a las personas. Necesita un hogar paciente que le ayude a superar sus miedos y le enseñe que el mundo puede ser un lugar seguro.",
                Images = new List<string> { "/patitas-unidas/assets/patita_3.jpg" },
                CreatedAt = DateTime.Parse("2023-07-20")
            },
            new Animal
            {
                Id = 4,
                Name = "Tobhias",
                Type = "Perro",
                State = "Urgente",
                Tag = "Tranquilo",
                Age = "Adulto",
                Description = "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
                Image = "/patitas-unidas/assets/patita_4.jpg",
                FoundationId = 1,
                Breed = "Pastor Alemán mezclado",
                Gender = "Macho",
                Size = "Grande",
                Color = "Negro y marrón",
                Personality = new List<string> { "Tranquilo", "Protector", "Inteligente", "Leal" },
                HealthStatus = "Bueno",
                Vaccinated = true,
                Sterilized = true,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Perros", "Niños mayores", "Adultos" },
                NotGoodWith = new List<string> { "Gatos", "Animales pequeños" },
                AdoptionRequirements = new List<string>
                {
                    "Hogar con espacio amplio",
                    "Experiencia con perros grandes",
                    "Familia activa",
                    "Tiempo para paseos diarios"
                },
                Story = "Tobhias fue entregado a nuestra fundación cuando su familia anterior tuvo que mudarse a un apartamento donde no permitían mascotas. Es un perro muy bien educado y tranquilo que ha vivido con una familia durante 3 años. Es excelente con niños mayores y muy protector con su familia.",
                Images = new List<string> { "/patitas-unidas/assets/patita_4.jpg" },
                CreatedAt = DateTime.Parse("2023-06-12")
            },
            new Animal
            {
                Id = 5,
                Name = "Blanca nieves",
                Type = "Gato",
                State = "Nuevo",
                Tag = "Independiente",
                Age = "Adulto",
                Description = "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
                Image = "/patitas-unidas/assets/patita_5.jpg",
                FoundationId = 2,
                Breed = "Angora mezclado",
                Gender = "Hembra",
                Size = "Mediano",
                Color = "Blanco",
                Personality = new List<string> { "Independiente", "Elegante", "Tranquila", "Selectiva" },
                HealthStatus = "Excelente",
                Vaccinated = true,
                Sterilized = true,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Adultos", "Hogares tranquilos" },
                NotGoodWith = new List<string> { "Perros", "Niños pequeños", "Ambientes ruidosos" },
                AdoptionRequirements = new List<string>
                {
                    "Hogar tranquilo",
                    "Experiencia con gatos",
                    "Sin niños pequeños",
                    "Sin otros animales"
                },
                Story = "Blanca Nieves fue rescatada de la calle cuando era adulta. Es una gata muy elegante y limpia que disfruta de la tranquilidad. Prefiere observar desde la distancia antes de acercarse, pero una vez que confía en ti, es muy cariñosa a su manera. Busca un hogar tranquilo donde pueda ser la reina de la casa.",
                Images = new List<string> { "/patitas-unidas/assets/patita_5.jpg" },
                CreatedAt = DateTime.Parse("2023-09-18")
            },
            new Animal
            {
                Id = 7,
                Name = "Nina",
                Type = "Gato",
                State = "Tranquilo",
                Age = "Cachorro",
                Description = "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
                Image = "/patitas-unidas/assets/patita_7.jpg",
                FoundationId = 3,
                Breed = "Doméstico de pelo corto",
                Gender = "Hembra",
                Size = "Pequeño",
                Color = "Atigrado gris",
                Personality = new List<string> { "Tranquila", "Juguetona", "Curiosa", "Cariñosa" },
                HealthStatus = "Excelente",
                Vaccinated = true,
                Sterilized = false,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Gatos", "Perros tranquilos", "Niños", "Adultos" },
                NotGoodWith = new List<string>(),
                AdoptionRequirements = new List<string>
                {
                    "Compromiso de esterilización cuando tenga la edad adecuada",
                    "Hogar seguro para gatos",
                    "Tiempo para jugar y socializar"
                },
                Story = "Nina fue encontrada junto a sus hermanos en un terreno baldío. Es la más tranquila de la camada, pero no por ello menos juguetona. Le encanta explorar y descubrir nuevos lugares, siempre con mucha cautela. Es muy sociable con otros gatos y se adapta fácilmente a nuevos ambientes.",
                Images = new List<string> { "/patitas-unidas/assets/patita_7.jpg" },
                CreatedAt = DateTime.Parse("2023-08-30")
            },
            new Animal
            {
                Id = 8,
                Name = "Blue",
                Type = "Gato",
                State = "Juguetón",
                Age = "Adulto",
                Description = "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
                Image = "/patitas-unidas/assets/patita_8.jpg",
                FoundationId = 2,
                Breed = "Ruso Azul mezclado",
                Gender = "Macho",
                Size = "Mediano",
                Color = "Gris azulado",
                Personality = new List<string> { "Juguetón", "Activo", "Inteligente", "Curioso" },
                HealthStatus = "Excelente",
                Vaccinated = true,
                Sterilized = true,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Gatos", "Adultos", "Niños mayores" },
                NotGoodWith = new List<string> { "Perros" },
                AdoptionRequirements = new List<string>
                {
                    "Hogar con espacio para jugar",
                    "Juguetes interactivos",
                    "Tiempo para jugar diariamente",
                    "Experiencia con gatos activos"
                },
                Story = "Blue fue rescatado de la calle cuando tenía aproximadamente un año. Es extremadamente juguetón y activo, siempre buscando nuevas aventuras. Le encanta trepar y explorar cada rincón de la casa. Necesita un hogar que pueda proporcionarle suficiente estimulación mental y física para mantenerlo feliz.",
                Images = new List<string> { "/patitas-unidas/assets/patita_8.jpg" },
                CreatedAt = DateTime.Parse("2023-07-05")
            },
            new Animal
            {
                Id = 9,
                Name = "Pelusa",
                Type = "Perro",
                State = "Urgente",
                Tag = "Juguetón",
                Age = "Adulto",
                Description = "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
                Image = "/patitas-unidas/assets/patita_9.jpg",
                FoundationId = 1,
                Breed = "Poodle mezclado",
                Gender = "Macho",
                Size = "Pequeño",
                Color = "Blanco",
                Personality = new List<string> { "Juguetón", "Cariñoso", "Sociable", "Enérgico" },
                HealthStatus = "Bueno",
                Vaccinated = true,
                Sterilized = true,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Perros", "Gatos", "Niños", "Adultos" },
                NotGoodWith = new List<string>(),
                AdoptionRequirements = new List<string>
                {
                    "Tiempo para paseos diarios",
                    "Cepillado regular",
                    "Familia activa",
                    "Hogar donde no esté solo por largos periodos"
                },
                Story = "Pelusa fue entregado a nuestra fundación cuando su dueño anterior falleció. Es un perro muy sociable que ha vivido con otros perros y gatos. Le encanta jugar y recibir atención. Está acostumbrado a la vida en familia y se adapta fácilmente a nuevos entornos. Busca un hogar donde pueda seguir siendo parte de la familia.",
                Images = new List<string> { "/patitas-unidas/assets/patita_9.jpg" },
                CreatedAt = DateTime.Parse("2023-06-28")
            },
            new Animal
            {
                Id = 6,
                Name = "Francheska",
                Type = "Gato",
                State = "Urgente",
                Tag = "Independiente",
                Age = "Cachorro",
                Description = "Juguetón y cariñoso, le encanta correr y jugar con pelotas.",
                Image = "/patitas-unidas/assets/patita_6.jpg",
                FoundationId = 3,
                Breed = "Doméstico de pelo largo",
                Gender = "Hembra",
                Size = "Pequeño",
                Color = "Tricolor",
                Personality = new List<string> { "Independiente", "Juguetona", "Observadora", "Inteligente" },
                HealthStatus = "Bueno",
                Vaccinated = true,
                Sterilized = false,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Gatos", "Adultos tranquilos" },
                NotGoodWith = new List<string> { "Perros grandes", "Niños pequeños" },
                AdoptionRequirements = new List<string>
                {
                    "Hogar tranquilo",
                    "Compromiso de esterilización",
                    "Experiencia con gatos",
                    "Paciencia para socialización"
                },
                Story = "Francheska fue rescatada de la calle cuando tenía apenas unas semanas. A pesar de ser muy pequeña, muestra una personalidad independiente y observadora. Le gusta jugar, pero también disfruta de sus momentos de soledad. Necesita un hogar paciente que respete su espacio y le dé tiempo para adaptarse.",
                Images = new List<string> { "/patitas-unidas/assets/patita_6.jpg" },
                CreatedAt = DateTime.Parse("2023-09-02")
            },
            new Animal
            {
                Id = 122,
                Name = "Tyson",
                Type = "Perro",
                State = "No adopción",
                Tag = "Lindo",
                Age = "Adulto",
                Description = "Perro lindo y cariñoso, le encanta correr y jugar con pelotas.",
                Image = "/patitas-unidas/assets/tyson.jpg",
                FoundationId = 2,
                Breed = "Bulldog Francés",
                Gender = "Macho",
                Size = "Pequeño",
                Color = "Atigrado",
                Personality = new List<string> { "Lindo", "Cariñoso", "Juguetón", "Tranquilo" },
                HealthStatus = "Excelente",
                Vaccinated = true,
                Sterilized = true,
                Dewormed = true,
                SpecialNeeds = false,
                GoodWith = new List<string> { "Perros", "Gatos", "Niños", "Adultos" },
                NotGoodWith = new List<string>(),
                AdoptionRequirements = new List<string>
                {
                    "No disponible para adopción - Mascota de la fundación",
                    "Puedes visitarlo en nuestras instalaciones"
                },
                Story = "Tyson es la mascota oficial de nuestra fundación. Fue rescatado hace 3 años de una situación de maltrato y, debido a su increíble personalidad y capacidad para socializar con otros animales, decidimos que sería nuestro embajador. Ayuda a los nuevos rescatados a adaptarse y es la estrella de nuestros eventos de adopción. No está disponible para adopción, pero puedes visitarlo cuando quieras.",
                Images = new List<string> { "/patitas-unidas/assets/tyson.jpg" },
                CreatedAt = DateTime.Parse("2020-05-10")
            }
        });

        // Animales para apadrinamiento
        _animals.AddRange(new[]
        {
            new Animal
            {
                Id = 101,
                Name = "Luna",
                Type = "Gato",
                Age = "Adulto",
                Description = "Requiere cirugía y cuidados post-operatorios.",
                Image = "/assets/patita_apadrina_1.jpg",
                State = "Necesita ayuda",
                Tag = "Especial",
                FoundationId = 1,
                Breed = "Doméstico de pelo corto",
                Gender = "Hembra",
                Size = "Mediano",
                Color = "Negro con blanco",
                Personality = new List<string> { "Tranquila", "Cariñosa", "Resiliente" },
                HealthStatus = "Requiere atención",
                Vaccinated = true,
                Sterilized = true,
                Dewormed = true,
                SpecialNeeds = true,
                GoodWith = new List<string> { "Gatos", "Adultos tranquilos" },
                NotGoodWith = new List<string> { "Perros", "Ambientes ruidosos" },
                AdoptionRequirements = new List<string>
                {
                    "No disponible para adopción - Solo apadrinamiento",
                    "Posibilidad de visitas periódicas"
                },
                Story = "Luna fue rescatada después de un accidente que le causó una fractura en la cadera. Necesita una cirugía costosa y rehabilitación posterior. Es una gata muy dulce que, a pesar del dolor, siempre recibe a todos con ronroneos. Tu apadrinamiento ayudará a cubrir los gastos de su cirugía y recuperación.",
                Images = new List<string> { "/assets/patita_apadrina_1.jpg" },
                CreatedAt = DateTime.Parse("2023-08-15")
            },
            new Animal
            {
                Id = 102,
                Name = "Max",
                Type = "Perro",
                Age = "Cachorro",
                Description = "Necesita tratamiento médico y alimentación especial.",
                Image = "/assets/patita_apadrina_2.jpg",
                State = "Necesita ayuda",
                Tag = "Tratamiento",
                FoundationId = 2,
                Breed = "Mestizo",
                Gender = "Macho",
                Size = "Pequeño (en crecimiento)",
                Color = "Marrón",
                Personality = new List<string> { "Juguetón", "Valiente", "Cariñoso" },
                HealthStatus = "En tratamiento",
                Vaccinated = true,
                Sterilized = false,
                Dewormed = true,
                SpecialNeeds = true,
                GoodWith = new List<string> { "Perros", "Gatos", "Niños", "Adultos" },
                NotGoodWith = new List<string>(),
                AdoptionRequirements = new List<string>
                {
                    "No disponible para adopción inmediata - Solo apadrinamiento",
                    "Posibilidad de adopción futura cuando se recupere"
                },
                Story = "Max fue encontrado muy desnutrido y con una infección severa. Actualmente está en tratamiento y necesita medicación diaria y una alimentación especial para recuperarse completamente. A pesar de su condición, es un cachorro muy alegre y juguetón. Tu apadrinamiento ayudará a cubrir sus gastos médicos y alimentación especial.",
                Images = new List<string> { "/assets/patita_apadrina_2.jpg" },
                CreatedAt = DateTime.Parse("2023-09-05")
            },
            new Animal
            {
                Id = 103,
                Name = "Milo",
                Type = "Gato",
                Age = "Adulto",
                Description = "Requiere medicación diaria para su recuperación.",
                Image = "/assets/patita_apadrina_3.jpg",
                State = "Necesita ayuda",
                Tag = "Medicamentos",
                FoundationId = 3,
                Breed = "Doméstico de pelo largo",
                Gender = "Macho",
                Size = "Mediano",
                Color = "Naranja",
                Personality = new List<string> { "Tranquilo", "Cariñoso", "Paciente" },
                HealthStatus = "Crónico estable",
                Vaccinated = true,
                Sterilized = true,
                Dewormed = true,
                SpecialNeeds = true,
                GoodWith = new List<string> { "Gatos", "Adultos", "Ambientes tranquilos" },
                NotGoodWith = new List<string> { "Perros", "Niños pequeños" },
                AdoptionRequirements = new List<string>
                {
                    "No disponible para adopción - Solo apadrinamiento",
                    "Compromiso de medicación de por vida"
                },
                Story = "Milo fue diagnosticado con una enfermedad renal crónica que requiere medicación diaria y una dieta especial. A pesar de su condición, es un gato muy dulce y tranquilo que disfruta de la compañía humana. Tu apadrinamiento ayudará a cubrir sus medicamentos mensuales y alimento especial para mantener su calidad de vida.",
                Images = new List<string> { "/assets/patita_apadrina_3.jpg" },
                CreatedAt = DateTime.Parse("2023-07-10")
            },
            new Animal
            {
                Id = 104,
                Name = "Nina",
                Type = "Perro",
                Age = "Cachorro",
                Description = "Recuperándose de una fractura, necesita fisioterapia.",
                Image = "/assets/patita_apadrina_4.jpg",
                State = "Necesita ayuda",
                Tag = "Fisioterapia",
                FoundationId = 1,
                Breed = "Border Collie mezclado",
                Gender = "Hembra",
                Size = "Mediano (en crecimiento)",
                Color = "Blanco y negro",
                Personality = new List<string> { "Valiente", "Inteligente", "Determinada" },
                HealthStatus = "En recuperación",
                Vaccinated = true,
                Sterilized = false,
                Dewormed = true,
                SpecialNeeds = true,
                GoodWith = new List<string> { "Perros", "Gatos", "Niños", "Adultos" },
                NotGoodWith = new List<string>(),
                AdoptionRequirements = new List<string>
                {
                    "No disponible para adopción inmediata - Solo apadrinamiento",
                    "Posibilidad de adopción futura cuando se recupere completamente"
                },
                Story = "Nina sufrió un accidente que le causó una fractura en una de sus patas traseras. Ha sido operada con éxito, pero necesita sesiones de fisioterapia para recuperar completamente la movilidad. Es una cachorra muy inteligente y determinada que está poniendo todo de su parte para recuperarse. Tu apadrinamiento ayudará a cubrir sus sesiones de fisioterapia y medicamentos.",
                Images = new List<string> { "/assets/patita_apadrina_4.jpg" },
                CreatedAt = DateTime.Parse("2023-08-25")
            }
        });
    }
}

