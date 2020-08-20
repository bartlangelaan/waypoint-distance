declare module 'react-hook-geolocation' {
    export interface Options {
        enableHighAccuracy?: boolean;
        maximumAge?: number;
        timeout?: number;
    }
    function useGeolocation(options: Options): 
        {
            accuracy: null,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: null,
            longitude: null,
            speed: null,
            timestamp: null,
            error: PositionError | null
        } | 
        (
            {
                timestamp: Position['timestamp']
            } 
            & 
            Pick<Coordinates, 'accuracy' | 'altitude' | 'altitudeAccuracy' | 'heading' | 'latitude' | 'longitude' | 'speed'> 
            & 
            {error: null}
        )

    export default useGeolocation;
}
