import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [incidents, setIncidents] = useState([]);

  const fetchIncidents = async () => {
    console.log("FETCHING INCIDENTS...");
    try {
      const response = await fetch("http://localhost:5001/incidents");
      const data = await response.json();

      console.log("INCIDENT DATA FROM API:", data);

      setIncidents(data);
    } catch (error) {
      console.error("Failed to fetch incidents:", error);
    }
  };


  useEffect(() => {

    fetchIncidents();

    const interval = setInterval(() => {
      fetchIncidents();
    }, 10000);


    return () => clearInterval(interval);

  }, []);


  const totalIncidents = incidents.length;

  const activeIncidents = incidents.filter(
    (incident) => incident.status === "firing"
  ).length;


  const criticalIncidents = incidents.filter(
    (incident) => incident.severity === "critical"
  ).length;


  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === "resolved"
  ).length;



  return (
    <div className="dashboard">

      <header>
        <h1>Nexus SRE Dashboard</h1>
        <p>Incident Management Platform</p>
      </header>


      <section className="cards">

        <div className="card">
          <h3>Total Incidents</h3>
          <strong>{totalIncidents}</strong>
        </div>


        <div className="card">
          <h3>Active</h3>
          <strong>{activeIncidents}</strong>
        </div>


        <div className="card">
          <h3>Critical</h3>
          <strong>{criticalIncidents}</strong>
        </div>


        <div className="card">
          <h3>Resolved</h3>
          <strong>{resolvedIncidents}</strong>
        </div>

      </section>



      <section className="incidents">

        <h2>Incidents</h2>


        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Alert</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>


          <tbody>

          {incidents.map((incident) => (

            <tr key={incident.id}>

              <td>
                {incident.incident_id}
              </td>


              <td>
                {incident.alert_name}
              </td>


              <td>
                {incident.severity}
              </td>


              <td>

                {incident.status === "firing" ? (
                  <span className="firing">
                    🔴 Firing
                  </span>
                ) : (
                  <span className="resolved">
                    🟢 Resolved
                  </span>
                )}

              </td>


              <td>
                {incident.created_at}
              </td>


            </tr>

          ))}


          </tbody>

        </table>


      </section>


    </div>
  );
}


export default App;