let benchmarkType: string;
/**
 * Get the type of the benchmark dataset, now Tanaka and Eric 
*/
export function getBenchmarkType() {
    return benchmarkType;
}
/**
 * Set the type of the benchmark dataset, now Tanaka and Eric 
*/
export function setBenchmarkType(type: string) {
    benchmarkType = type;
}

/**
 * The type of the benchmark dataset, now Tanaka and Eric 
*/
export const BENCHMARK_OPTIONS: string[] = ["Tanaka", "Eric"];