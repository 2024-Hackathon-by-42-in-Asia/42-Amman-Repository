# 42 Amman | Foodpanda Shared Delivery Project

This project aims to analyze restaurant locations and their proximity to one another to optimize shared deliveries. By grouping restaurants based on their geographical location, the goal is to reduce the carbon footprint by improving delivery efficiency.

## Data Overview
The dataset contains detailed information about various restaurants, including their geographical coordinates, ratings, and other relevant attributes. You can download the dataset [here]([URL_TO_KAGGLE](https://www.kaggle.com/datasets/hashiromer/all-foodpanda-restaurants
)). 

The data also includes information from the Canadian government, illustrating the relationship between carbon emissions, fuel types, engine sizes, and other relevant factors we have.
You can download the dataset [here](https://www.kaggle.com/datasets/debajyotipodder/co2-emission-by-vehicles).

## Project Structure
- **Photos**: Visual representations of restaurants and key locations.
- **CSV Files**: Contain raw and processed data about the restaurants, their locations, and other important attributes.
- **Maps**: Visualizations of restaurant groupings based on proximity.

## Analysis and Grouping Criteria
Restaurants are grouped based on their location:
- Each group contains restaurants that are **less than 1 km** apart from each other.
- The goal is to identify clusters of restaurants that can serve as delivery hubs, optimizing delivery routes, reducing delivery times, and lowering costs.

## Usage
1. **Download the dataset**: Follow the link above to download the restaurant data from Kaggle.
2. **Explore the data**: The CSV files provide detailed restaurant data. Analyze the proximity and groupings using the provided maps.
3. **Visualize the clusters**: Use the included maps and photos to see the clustering of restaurants based on their locations.

## Key Objectives
- **Optimize Delivery Routes**: This project helps reduce CO2 emissions by grouping nearby restaurants to enable shared deliveries, thus minimizing unnecessary trips.
- **Analyze Restaurant Density**: Identify high-density areas that could serve as optimal delivery hubs, contributing to more efficient delivery planning.

## Tools and Technologies
- **Python** for data analysis and handling CSV files.
- **Geoapify API** for mapping and proximity calculations.
- **Matplotlib** and **Folium** for visualizing restaurant clusters on maps.
