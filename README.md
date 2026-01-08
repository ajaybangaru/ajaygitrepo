# Apache Pinot 2.0 Real-Time Analytics

A complete real-time analytics system featuring **Apache Pinot**, **Kafka**, and a modern **React** frontend. This repository demonstrates streaming data ingestion, real-time query processing, and data visualization.

## System Architecture

- **Apache Pinot**: Real-time distributed OLAP datastore.
- **Kafka**: Message broker for streaming event data.
- **React Frontend**: Modern UI built with Vite, Tailwind CSS, and Recharts for querying and visualization.
- **Python Producer**: Mock data generator for simulating user events.

## Repository Structure

- `apache_pinot_ui/`: React frontend application.
- `KafkaProducer.py`: Python script to stream test events to Kafka.
- `docker-compose.yml`: Orchestrates Zookeeper, Kafka, and Pinot cluster services.
- `commands.txt`: Reference guide for setup and common SQL queries.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) (for the UI)
- [Python 3](https://www.python.org/) (for the data producer)

### 1. Start the Infrastructure

Launch the Pinot cluster, Kafka, and Zookeeper:

```bash
docker compose up -d
```

### 2. Configure Pinot

Create the Kafka topic and register the schema/table in Pinot:

```bash
# Create Kafka topic
docker exec -it kafka kafka-topics --create --topic events-topic --bootstrap-server kafka:9092 --replication-factor 1 --partitions 1

# Register Table and Schema
docker exec -it pinot-controller mkdir -p /config
docker cp config/events.schema.json pinot-controller:/config/
docker cp config/events.table.json pinot-controller:/config/
docker exec -it pinot-controller /opt/pinot/bin/pinot-admin.sh AddTable \
    -tableConfigFile /config/events.table.json \
    -schemaFile /config/events.schema.json \
    -exec
```

### 3. Start the Data Producer

Install dependencies and run the producer to start streaming events:

```bash
pip install kafka-python
python3 KafkaProducer.py
```

### 4. Run the UI

Navigate to the UI directory and start the development server:

```bash
cd apache_pinot_ui
npm install
npm run dev
```

The UI will be available at `http://localhost:5173`.

## Sample Queries

You can run these queries in the React UI or the Pinot Query Console (`http://localhost:9000`):

```sql
-- Recent events
SELECT * FROM events ORDER BY "timestamp" DESC LIMIT 10

-- Event count by type
SELECT eventType, COUNT(*) as count FROM events GROUP BY eventType

-- Average value by event type
SELECT eventType, AVG(value) as avg_value FROM events GROUP BY eventType
```

## Service Endpoints

- **Pinot Controller**: `http://localhost:9000`
- **Pinot Broker (Query)**: `http://localhost:8099`
- **Kafka**: `localhost:29092` (Host access)
