import time
import json
import random
from datetime import datetime
from kafka import KafkaProducer

# Connect to Kafka from host machine using port 29092
KAFKA_BOOTSTRAP_SERVERS = "localhost:29092"
TOPIC = "events-topic"

EVENT_TYPES = [
    "click",
    "view",
    "purchase",
    "scroll",
    "like",
    "share",
]

USER_IDS = ["u1", "u2", "u3", "u4", "u5"]

producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
)

print("Producing events to Kafka... (Press CTRL+C to stop)")

try:
    while True:
        event = {
            "userId": random.choice(USER_IDS),
            "eventType": random.choice(EVENT_TYPES),
            "value": random.randint(1, 100),
            "timestamp": int(time.time() * 1000),  # current time in ms
        }
        producer.send(TOPIC, value=event)
        producer.flush()
        print("Produced:", event)
        time.sleep(0.5)  # send every 0.5 seconds
except KeyboardInterrupt:
    print("\nStopped.")
finally:
    producer.close()