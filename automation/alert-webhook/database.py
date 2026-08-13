import sqlite3
import os
import uuid


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DB_NAME = os.path.join(BASE_DIR, "incidents.db")


print(f"Database path: {DB_NAME}")


def get_connection():
    """
    Creates a connection to SQLite database
    """

    conn = sqlite3.connect(DB_NAME)

    conn.row_factory = sqlite3.Row

    return conn



def create_tables():
    """
    Creates incidents table if it does not exist
    """

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute("""
    CREATE TABLE IF NOT EXISTS incidents (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        incident_id TEXT UNIQUE,

        alert_name TEXT,

        severity TEXT,

        status TEXT,

        created_at TEXT,

        resolved_at TEXT,

        acknowledged INTEGER DEFAULT 0

    )
    """)


    conn.commit()

    conn.close()



def create_incident(
        alert_name,
        severity,
        created_at
):
    """
    Store a new firing alert as an incident
    """

    conn = get_connection()

    cursor = conn.cursor()


    incident_id = (
        "INC-"
        + str(uuid.uuid4())[:8].upper()
    )


    cursor.execute("""
    INSERT INTO incidents
    (
        incident_id,
        alert_name,
        severity,
        status,
        created_at
    )

    VALUES (?, ?, ?, ?, ?)

    """,
    (
        incident_id,
        alert_name,
        severity,
        "firing",
        created_at
    ))


    conn.commit()

    conn.close()


    return incident_id



def resolve_incident(
        alert_name,
        resolved_at
):
    """
    Mark an active incident as resolved
    """

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute("""
    UPDATE incidents

    SET status = 'resolved',
        resolved_at = ?

    WHERE alert_name = ?
    AND status = 'firing'

    """,
    (
        resolved_at,
        alert_name
    ))


    conn.commit()

    conn.close()



def acknowledge_incident(
        alert_name
):
    """
    Mark incident as acknowledged
    """

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute("""
    UPDATE incidents

    SET acknowledged = 1

    WHERE alert_name = ?

    """,
    (
        alert_name,
    ))


    conn.commit()

    conn.close()



def get_incidents():
    """
    Return all incidents
    """

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute("""
    SELECT *
    FROM incidents
    ORDER BY id DESC
    """)


    incidents = cursor.fetchall()


    conn.close()


    return incidents

