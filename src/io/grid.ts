type Grid = number[][];

export function createUniformGrid(
    width: number,
    height: number,
    zoom: number
  ): Grid {
    // Clamp zoom to be between 1 and 10
    zoom = Math.max(1, Math.min(zoom, 10));
  
    // Calculate the size of each square based on zoom
    const squareSize = 10 * zoom;
  
    // Calculate the maximum number of columns and rows
    const maxColumns = Math.floor(width / squareSize);
    const maxRows = Math.floor(height / squareSize);
  
    // Adjust grid size to maintain square cells
    const minDimension = Math.min(maxColumns, maxRows);
  
    // Adjust columns and rows to keep the grid square
    const columns = minDimension;
    const rows = minDimension;
  
    // Initialize the grid
    const grid: Grid = [];
  
    for (let y = 0; y < rows; y++) {
      const row: number[] = [];
      for (let x = 0; x < columns; x++) {
        row.push(1); // You can replace '1' with any value representing a cell
      }
      grid.push(row);
    }
  
    return grid;
  }
  