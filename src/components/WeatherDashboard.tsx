import { useState, useEffect } from "react";
import { Search, Cloud, CloudRain, Sun, CloudSnow, Wind, Droplets, Eye, Gauge, Sunrise, Sunset, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Footer from "./Footer";

// ⚠️ IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your free OpenWeatherMap API key
// Get your key at: https://openweathermap.org/api
const API_KEY = "ea619ecb37933af690e98d780130c643";
const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{ main: string; description: string; icon: string }>;
  wind: { speed: number };
  visibility: number;
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: { temp_max: number; temp_min: number };
    weather: Array<{ main: string; icon: string }>;
  }>;
}

const WeatherDashboard = () => {
  const [city, setCity] = useState("London");
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);
  const [latency, setLatency] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState<"day" | "night">("day");
  const { toast } = useToast();

  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 6 && hour < 18 ? "day" : "night");
  }, []);

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchWeatherData = async (cityName: string) => {
    if (API_KEY === "YOUR_API_KEY_HERE") {
      toast({
        title: "⚠️ API Key Required",
        description: "Please add your OpenWeatherMap API key in WeatherDashboard.tsx",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const startTime = performance.now();

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${CURRENT_WEATHER_URL}?q=${cityName}&appid=${API_KEY}&units=metric`),
        fetch(`${FORECAST_URL}?q=${cityName}&appid=${API_KEY}&units=metric`),
      ]);

      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime));

      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error("City not found");
      }

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData);
      setApiConnected(true);
    } catch (error) {
      setApiConnected(false);
      toast({
        title: "☁️ Cloud Connectivity Error",
        description: "Failed to fetch weather data. Please check the city name or API connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-24 h-24 text-primary" />;
      case "clouds":
        return <Cloud className="w-24 h-24 text-muted-foreground" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="w-24 h-24 text-primary" />;
      case "snow":
        return <CloudSnow className="w-24 h-24 text-primary" />;
      default:
        return <Cloud className="w-24 h-24 text-muted-foreground" />;
    }
  };

  const getDailyForecast = () => {
    if (!forecast) return [];
    
    const dailyData = new Map();
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData.has(date)) {
        dailyData.set(date, {
          date,
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
        });
      }
    });
    
    return Array.from(dailyData.values()).slice(0, 5);
  };

  return (
    <div className={`min-h-screen ${timeOfDay === 'day' ? 'bg-gradient-day' : 'bg-gradient-night'} p-4 md:p-8 transition-all duration-1000`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="glass-panel p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cloud className="w-8 h-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Nimbus Cloud WeatherHub
            </h1>
          </div>
        </header>

        {/* Search Bar */}
        <div className="glass-panel p-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <Input
              type="text"
              placeholder="Enter city name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
            />
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/80 text-primary-foreground">
              <Search className="w-5 h-5" />
            </Button>
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hero Weather Card */}
          <div className="lg:col-span-2 glass-panel glass-panel-hover p-8">
            {weather ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold text-foreground">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <p className="text-muted-foreground capitalize">{weather.weather[0].description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    {getWeatherIcon(weather.weather[0].main)}
                  </div>
                  <div className="text-right">
                    <div className="text-7xl font-bold text-foreground">
                      {Math.round(weather.main.temp)}°
                    </div>
                    <div className="text-xl text-muted-foreground">
                      Feels like {Math.round(weather.main.feels_like)}°
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-6 h-6 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Humidity</div>
                      <div className="text-xl font-semibold">{weather.main.humidity}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wind className="w-6 h-6 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Wind Speed</div>
                      <div className="text-xl font-semibold">{Math.round(weather.wind.speed * 3.6)} km/h</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                {isLoading ? "Loading weather data..." : "Enter a city to see weather"}
              </div>
            )}
          </div>

          {/* Cloud Connectivity Monitor */}
          <div className="glass-panel glass-panel-hover p-6 space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Activity className="w-5 h-5 text-primary" />
              API Connectivity Status
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cloud Upstream</span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full status-pulse ${apiConnected ? 'bg-status-connected' : 'bg-status-error'}`} />
                  <span className={apiConnected ? 'text-status-connected' : 'text-status-error'}>
                    {apiConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Latency</span>
                <span className="text-primary font-mono">~{latency}ms</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Endpoint</span>
                <span className="text-xs text-muted-foreground">OpenWeather</span>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Real-time data stream from cloud infrastructure
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        {forecast && (
          <div className="glass-panel p-6">
            <h3 className="text-xl font-bold mb-4 text-foreground">5-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {getDailyForecast().map((day, index) => (
                <div key={index} className="glass-panel glass-panel-hover p-4 text-center space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  {getWeatherIcon(day.condition)}
                  <div className="space-y-1">
                    <div className="text-lg font-semibold">{Math.round(day.temp_max)}°</div>
                    <div className="text-sm text-muted-foreground">{Math.round(day.temp_min)}°</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Environmental Metrics Grid */}
        {weather && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel glass-panel-hover p-6 space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sun className="w-5 h-5 text-primary" />
                <span className="text-sm">UV Index</span>
              </div>
              <div className="text-3xl font-bold">5</div>
              <div className="text-xs text-muted-foreground">Moderate</div>
            </div>

            <div className="glass-panel glass-panel-hover p-6 space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="w-5 h-5 text-primary" />
                <span className="text-sm">Pressure</span>
              </div>
              <div className="text-3xl font-bold">{weather.main.pressure}</div>
              <div className="text-xs text-muted-foreground">hPa</div>
            </div>

            <div className="glass-panel glass-panel-hover p-6 space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-5 h-5 text-primary" />
                <span className="text-sm">Visibility</span>
              </div>
              <div className="text-3xl font-bold">{(weather.visibility / 1000).toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">km</div>
            </div>

            <div className="glass-panel glass-panel-hover p-6 space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sunrise className="w-5 h-5 text-primary" />
                <span className="text-sm">Sun Times</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Sunrise className="w-4 h-4" />
                  <span>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Sunset className="w-4 h-4" />
                  <span>{new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer with signature */}
        <Footer />
      </div>
    </div>
  );
};

export default WeatherDashboard;
