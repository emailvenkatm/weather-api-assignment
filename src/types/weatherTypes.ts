// Define a type for the weather data
export interface WeatherData {
    weatherCondition: string;
    temperature: number;
    temperatureClassification: 'hot' | 'cold' | 'moderate';
    alerts: Array<WeatherAlert>;
  }
  
  // Define a type for a weather alert (if any exist)
  export interface WeatherAlert {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
  }
  