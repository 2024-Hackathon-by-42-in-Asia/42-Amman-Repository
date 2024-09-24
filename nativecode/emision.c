#include <stdio.h>
#include <string.h>

float calculate_emissions(const char* engine_type, float fuel_efficiency, float distance) {
    float fuel_consumed = 0.0;
    float emissions = 0.0;
    fuel_consumed = (fuel_efficiency * distance) / 100; 

    if (strcmp(engine_type, "petrol") == 0) {
        emissions = 2.31 * fuel_consumed;
    } else if (strcmp(engine_type, "diesel") == 0) {
        emissions = 2.68 * fuel_consumed;
    } else if (strcmp(engine_type, "electric") == 0) {
        emissions = 0.2 * (fuel_consumed / 1000);
    } else if (strcmp(engine_type, "hybrid") == 0) {
        float petrol_usage = fuel_consumed * 0.5;
        float electric_usage = fuel_consumed * 0.5;
        emissions = (2.31 * petrol_usage) + (0.2 * electric_usage / 1000);
    } else {
        printf("Invalid engine type.\n");
        return -1;
    }
	// return ;
    return emissions;
}
