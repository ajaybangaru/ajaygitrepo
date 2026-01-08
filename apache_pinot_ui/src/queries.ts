export const QUERIES = [
  {
    id: 0,
    title: "Average Value per Event Type",
    sql: `SELECT eventType, AVG(value) as avg_value FROM events GROUP BY eventType`,
    type: "line"
  },
  {
    id: 1,
    title: "Events by Type",
    sql: `SELECT eventType, COUNT(*) as count FROM events GROUP BY eventType`,
    type: "bar"
  },
  {
    id: 2,
    title: "Events by User",
    sql: `SELECT userId, COUNT(*) as count FROM events GROUP BY userId`,
    type: "bar"
  },
  {
    id: 3,
    title: "Top Active Users",
    sql: `SELECT userId, COUNT(*) as event_count FROM events GROUP BY userId ORDER BY event_count DESC LIMIT 10`,
    type: "table"
  },
  {
    id: 4,
    title: "Total Events Count",
    sql: `SELECT COUNT(*) AS count FROM events`,
    type: "stat"
  },
  {
    id: 5,
    title: "Latest User Event Values",
    sql: `SELECT userId, eventType, value FROM events ORDER BY "timestamp" DESC LIMIT 10`,
    type: "table"
  },
  {
    id: 6,
    title: "User Event Summary",
    sql: `SELECT userId, eventType, COUNT(*) as count, AVG(value) as avg_value FROM events GROUP BY userId, eventType ORDER BY count DESC LIMIT 10`,
    type: "table"
  }
];
