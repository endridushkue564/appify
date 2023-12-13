/*
Filename: complexCode.js

Description: This complex code implements a genetic algorithm to solve the traveling salesperson problem (TSP). It uses a combination of heuristics, crossover, and mutation to find an optimal solution for a given set of cities.
**/

// Define a class representing a city
class City {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

// Define a class representing a tour (a collection of cities)
class Tour {
  constructor() {
    this.cities = [];
    this.distance = 0;
  }

  // Calculate the total distance of the tour
  calculateDistance() {
    let totalDistance = 0;
    for (let i = 0; i < this.cities.length - 1; i++) {
      const cityA = this.cities[i];
      const cityB = this.cities[i + 1];
      totalDistance += Math.sqrt(
        Math.pow(cityB.x - cityA.x, 2) + Math.pow(cityB.y - cityA.y, 2)
      );
    }
    this.distance = totalDistance;
  }

  // Generate a random tour
  generateRandomTour(cities) {
    this.cities = cities;
    this.cities = this.shuffleArray(this.cities);
    this.calculateDistance();
  }

  // Perform crossover between two tours
  crossover(otherTour) {
    const childTour = new Tour();
    const startPos = Math.floor(Math.random() * this.cities.length - 1) + 1;
    const endPos = Math.floor(Math.random() * this.cities.length - startPos) + startPos;

    // Copy the selected portion from this tour to the child tour
    for (let i = startPos; i <= endPos; i++) {
      childTour.cities[i] = this.cities[i];
    }

    // Copy the remaining cities from the other tour to the child tour
    for (let i = 0; i < this.cities.length; i++) {
      if (!childTour.cities.includes(otherTour.cities[i])) {
        for (let j = 0; j < this.cities.length; j++) {
          if (!childTour.cities[j]) {
            childTour.cities[j] = otherTour.cities[i];
            break;
          }
        }
      }
    }
    childTour.calculateDistance();
    return childTour;
  }

  // Perform mutation on a tour
  mutate() {
    const i = Math.floor(Math.random() * this.cities.length - 1) + 1;
    const j = Math.floor(Math.random() * this.cities.length - 1) + 1;
    [this.cities[i], this.cities[j]] = [this.cities[j], this.cities[i]];
    this.calculateDistance();
  }

  // Helper function to shuffle an array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

// Define the main genetic algorithm class
class GeneticAlgorithm {
  constructor(populationSize, mutationRate, elitism) {
    this.population = [];
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.elitism = elitism;
  }

  // Initialize the population with random tours
  initializePopulation(cities) {
    for (let i = 0; i < this.populationSize; i++) {
      const tour = new Tour();
      tour.generateRandomTour(cities);
      this.population.push(tour);
    }
  }

  // Evolve the population using selection, crossover, and mutation
  evolvePopulation() {
    const newPopulation = [];

    if (this.elitism) {
      const bestTour = this.getFittestTour();
      newPopulation.push(bestTour);
    }

    while (newPopulation.length < this.populationSize) {
      const parentA = this.tournamentSelection();
      const parentB = this.tournamentSelection();

      const childTour = parentA.crossover(parentB);

      if (Math.random() < this.mutationRate) {
        childTour.mutate();
      }

      newPopulation.push(childTour);
    }

    this.population = newPopulation;
  }

  // Perform tournament selection to choose a parent tour
  tournamentSelection() {
    const tournamentSize = Math.floor(this.populationSize / 10);
    const tournamentPopulation = [];

    for (let i = 0; i < tournamentSize; i++) {
      tournamentPopulation.push(
        this.population[Math.floor(Math.random() * this.populationSize)]
      );
    }

    return this.getFittestTour(tournamentPopulation);
  }

  // Get the fittest tour from the given population
  getFittestTour(population = this.population) {
    let fittestTour = population[0];
    for (let i = 1; i < population.length; i++) {
      if (population[i].distance < fittestTour.distance) {
        fittestTour = population[i];
      }
    }
    return fittestTour;
  }

  // Execute the genetic algorithm to find an optimal solution
  execute(cities, generations) {
    this.initializePopulation(cities);
    let generation = 0;

    while (generation < generations) {
      this.evolvePopulation();
      generation++;
    }

    const fittestTour = this.getFittestTour();
    console.log(`Optimal tour distance: ${fittestTour.distance}`);
    console.log(`Optimal tour: ${fittestTour.cities.map(city => city.name).join(' -> ')}`);
  }
}

// Define an array of cities
const cities = [
  new City('London', 51.509865, -0.118092),
  new City('New York', 40.712776, -74.005974),
  new City('Tokyo', 35.689487, 139.691711),
  new City('Sydney', -33.865143, 151.209900),
  new City('Paris', 48.856613, 2.352222),
  new City('Rio de Janeiro', -22.906847, -43.172897),
  new City('Berlin', 52.520008, 13.404954),
];

// Create a new instance of the genetic algorithm and execute it
const geneticAlgorithm = new GeneticAlgorithm(100, 0.02, true);
geneticAlgorithm.execute(cities, 1000);