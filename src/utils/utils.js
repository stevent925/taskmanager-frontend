export function getPriorityColor(priority) {
  switch (priority) {
    case "HIGH":
      return "#ff4d4d";
    case "MEDIUM":
      return "#ffc107";
    case "LOW":
      return "#4caf50";
    default:
      return "#ccc";
  }
}
