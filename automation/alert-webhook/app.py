from flask import Flask, request, jsonify
from flask_cors import CORS


from database import (
    create_tables,
    create_incident,
    resolve_incident,
    get_incidents
)

from datetime import datetime, timezone

app = Flask(__name__)

CORS(app)  # Enable CORS for all routes


create_tables()


@app.post("/alerts")

def receive_alert():


    data = request.json


    for alert in data.get("alerts", []):


        status = alert.get("status")


        labels = alert.get("labels", {})


        alert_name = labels.get(
            "alertname"
        )

        severity = labels.get(
            "severity"
        )


        now = datetime.now(
            timezone.utc
        ).isoformat()



        print("\n====================")


        if status == "firing":


            print(
                "🚨 INCIDENT OPENED"
            )


            create_incident(
                alert_name,
                severity,
                datetime.now(timezone.utc).isoformat()
            )



        elif status == "resolved":


            print(
                "✅ INCIDENT RESOLVED"
            )


            resolve_incident(
                alert_name,
                datetime.now(timezone.utc).isoformat()
            )



        print(
            "Alert:",
            alert_name
        )


        print(
            "Severity:",
            severity
        )


        print(
            "Status:",
            status
        )


        print("====================\n")



    return jsonify(
        {
            "status":"received"
        }
    )


@app.get("/incidents")
def incidents():

    data = []

    for incident in get_incidents():
        data.append(dict(incident))

    return jsonify(data)



if __name__ == "__main__":


    app.run(
        host="0.0.0.0",
        port=5001
    )